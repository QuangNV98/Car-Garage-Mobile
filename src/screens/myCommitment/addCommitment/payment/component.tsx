import {RootState} from '@src/boot/rootReducers';
import system from '@src/constant/system';
import ButtonComponent from '@src/containers/components/button';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {appleHealthKit} from '@src/utils';
import React, {useState} from 'react';
import {Alert, ScrollView, View, Text, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addCommitmentAction, paymentAction} from '../redux/actions';
import {myAddCommitmentPaymentScreen} from './addPayment';
import {IProps, IState} from './propState';
import styles from './styles';
import HeaderAddCommitmentComponent from '../header';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';

export default function CommitmentPaymentComponent(props: IProps) {
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    account: state.account,
    addCommitment: state.screens.myCommitments.addCommitment,
    isLoading: state.common.isLoading,
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
    paymentAction: (card_id: string, four_digit_card: string) => dispatch(paymentAction(card_id, four_digit_card)),
    addCommitmentAction: (componentId: string) => dispatch(addCommitmentAction(componentId)),
  }));

  const [state, setState] = useState<IState>({
    isCheck: true,
    card_id: props.account.creditCard[props.account.creditCard.length - 1].card_id,
    four_digit_card: props.account.creditCard[props.account.creditCard.length - 1].four_digit_card,
  });

  const checkPayment = (card_id: string, four_digit_card: string) => () => {
    setState((state: IState) => ({...state, isCheck: !state.isCheck, card_id, four_digit_card}));
  };

  const _goBack = () => Navigation.pop(props.componentId);

  const _addPaymentScreen = () => myAddCommitmentPaymentScreen(props.componentId);

  const _continue = async () => {
    if (state.card_id === null || state.four_digit_card === null) {
      Alert.alert('Error', 'Payment card must be selected!');
    } else {
      if (props.addCommitment.goal !== system.GOAL.CHOOSE_LOCATION) {
        let readPremission = '';
        switch (props.addCommitment.goal) {
          case 1:
            readPremission = appleHealthKit.PREMISSION_READ.BURN_CALORIES;
            break;
          case 2:
            readPremission = appleHealthKit.PREMISSION_READ.RUNNING;
            break;
          case 3:
            readPremission = appleHealthKit.PREMISSION_READ.BIKING;
            break;
          case 4:
            readPremission = appleHealthKit.PREMISSION_READ.STEP_COUNT;
            break;
          default:
            readPremission = '';
            break;
        }
        await appleHealthKit.setPremission([readPremission]);
      }
      props.paymentAction(state.card_id, state.four_digit_card);
      props.addCommitmentAction(props.componentId);
    }
  };

  return (
    <>
      <HeaderAddCommitmentComponent hasBackButton={true} nameButton="Back" _goBack={_goBack} step={5} />
      <ScrollView style={common.flex_1}>
        <View style={common.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Choose payment</Text>
            <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
          </View>
          <Text style={[styles.title, {marginTop: ms(-20)}]}>method</Text>
          {props.account.creditCard.length > 0
            ? props.account.creditCard.map((item, index: number) => (
                <ListItem
                  key={index}
                  leftIcon={{name: 'ios-card', type: 'ionicon', size: ms(20), color: colors.darkGray}}
                  rightIcon={
                    item.card_id === state.card_id
                      ? {name: 'ios-checkmark', type: 'ionicon', size: ms(30), color: colors.silverTree}
                      : null
                  }
                  title={'...'.concat(
                    item.four_digit_card.slice(item.four_digit_card.length - 4, item.four_digit_card.length),
                  )}
                  bottomDivider={true}
                  containerStyle={styles.listItemContainer}
                  titleStyle={styles.listItemText}
                  onPress={checkPayment(item.card_id, item.four_digit_card)}
                />
              ))
            : null}
          <ListItem
            leftIcon={{name: 'ios-add', type: 'ionicon', size: 30}}
            title="Add Payment Method"
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={styles.listItemText}
            onPress={_addPaymentScreen}
            disabled={props.isLoading}
          />
        </View>
      </ScrollView>
      <View style={styles.wrapBtn}>
        {/* <ButtonComponent text="Back" clear={true} onPress={_goBack} disabled={props.isLoading} /> */}
        <ButtonComponent onPress={_continue} text="Finalize" disabled={props.isLoading} />
      </View>
    </>
  );
}
