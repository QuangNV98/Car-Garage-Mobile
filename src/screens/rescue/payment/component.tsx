import {RootState} from '@src/boot/rootReducers';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {myProfileAddPaymentScreen} from './addPayment';
import {IProps, IState} from './propState';
import {removeCardAction} from './redux/actions';
import styles from './styles';

export default function PaymentComponent(props: IProps) {
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    account: state.account,
    removeCardAction: (card_id: string) => dispatch(removeCardAction(card_id)),
  }));

  const [state, setState] = useState<IState>({
    isEdit: false,
  });

  const _goBack = () => Navigation.pop(props.componentId);

  const _addPaymentScreen = () => myProfileAddPaymentScreen(props.componentId);

  const _onEdit = () => {
    setState((state) => ({
      ...state,
      isEdit: !state.isEdit,
    }));
  };

  const _removeCard = (card_id: string) => () => {
    Alert.alert('Warning', 'Do you want to remove credit card?', [
      {
        text: 'Yes',
        onPress: () => {
          props.removeCardAction(card_id);
        },
      },
      {text: 'No', style: 'cancel'},
    ]);
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Payment',
          style: styles.headerCenter,
        }}
        rightComponent={
          <TouchableOpacity onPress={_onEdit}>
            <Text style={{color: colors.eastBay}}>{state.isEdit ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={common.flex_1}>
        <View style={[common.container, common.pt0]}>
          {props.account.creditCard.length > 0
            ? props.account.creditCard.map((item, index: number) => (
                <ListItem
                  key={index}
                  leftIcon={{name: 'ios-card', type: 'ionicon', size: ms(20), color: colors.darkGray}}
                  rightIcon={
                    state.isEdit ? {name: 'ios-remove-circle', type: 'ionicon', size: 30, color: colors.red} : null
                  }
                  title={'...'.concat(
                    item.four_digit_card.slice(item.four_digit_card.length - 4, item.four_digit_card.length),
                  )}
                  bottomDivider={true}
                  containerStyle={styles.listItemContainer}
                  titleStyle={styles.listItemText}
                  onPress={_removeCard(item.card_id)}
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
          />
        </View>
      </ScrollView>
    </>
  );
}
