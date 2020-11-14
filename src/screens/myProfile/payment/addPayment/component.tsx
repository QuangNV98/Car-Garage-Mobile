import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import config from '@src/constant/config';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import valid from 'card-validator';
import React, {useRef, useState, useEffect} from 'react';
import {Alert, TouchableOpacity, View, Text, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {addCardAction} from '../redux/actions';
import {IProps, IState} from './propState';
import styles from './styles';
import base64 from 'react-native-base64';
import {CheckBox} from 'react-native-elements';

export default function AddPaymentComponent(props: IProps) {
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    account: state.account,
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
    addCardAction: (card_id: string, four_digit_card: string) => dispatch(addCardAction(card_id, four_digit_card)),
  }));

  const card_number = useRef(null);
  const card_valid_from = useRef(null);
  const card_cvc = useRef(null);
  const zip_code = useRef(null);

  const [state, setState] = useState<IState>({
    card_number: '',
    card_valid_from: '',
    card_cvc: '',
    zip_code: '',
    loading: false,
    // isChecked: null,
  });

  // useEffect(() => {
  //   if (state.isChecked === false) {
  //     Alert.alert('Notification', 'Check here to indicate that you have read and agree to the terms of Use');
  //   }
  // }, [state.isChecked]);

  // const checkTerms = () => {
  //   setState((state) => ({
  //     ...state,
  //     isChecked: !state.isChecked,
  //   }));
  // };

  const _goBack = () => Navigation.pop(props.componentId);

  const _onChangeText = (stateVar: string) => (evt: any) => {
    if (stateVar === 'card_valid_from') {
      if (evt.length === 3 && !evt.includes('/')) {
        const evt1 = evt.slice(0, 2);
        const evt2 = evt.slice(2, 3);
        evt = evt1 + '/' + evt2;
      }
      setState((state) => ({
        ...state,
        card_valid_from: evt,
      }));
    } else {
      setState((state) => ({
        ...state,
        [stateVar]: evt,
      }));
    }
  };

  const _validate = () => {
    let isValid = '';
    let controlFocus = null;
    if (!state.card_cvc) {
      isValid = 'Please enter card cvv';
      controlFocus = card_cvc.current;
    }
    if (!state.card_valid_from) {
      isValid = 'Please enter expiration date!';
      controlFocus = card_valid_from.current;
    }
    if (!state.card_number) {
      isValid = 'Please enter card number';
      controlFocus = card_number.current;
    }
    if (!state.zip_code) {
      isValid = 'Please enter zip code';
      controlFocus = zip_code.current;
    }
    return {isValid, controlFocus};
  };

  useEffect(() => {
    if (state.loading) {
      callApiPayment();
    }
  }, [state.loading]);

  const callApiPayment = async () => {
    try {
      const validCard = valid.number(state.card_number);
      if (validCard.isValid) {
        if (!['visa', 'mastercard', 'discover', 'american-express'].includes(validCard.card.type)) {
          Alert.alert('Error', 'Credit cards are one of the type: Visa, Mastercard, Discover and American Express', [
            {text: 'OK'},
          ]);
          return;
        }
        const expire_month = state.card_valid_from.split('/')[0].toString();
        const expire_year =
          new Date().getFullYear().toString().slice(0, 2) + state.card_valid_from.split('/').pop().toString();
        /** call paypal api get credit-card */
        const token = base64.encode(`${config.PAYPAL_CLIENTID}:${config.PAYPAL_SECRET}`);
        const res = await fetch(`https://api.sandbox.paypal.com/v1/oauth2/token`, {
          headers: {
            Authorization: `Basic ${token}`,
            Accept: 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'post',
          body: 'grant_type=client_credentials',
        });
        if (res.status === System.RESPONSE_STATUS.SUCESS) {
          const oauth2 = await res.json();
          const accessToken = `${oauth2.token_type} ${oauth2.access_token}`;
          /** call api paypal create credit card */
          const resCard = await fetch(`https://api.sandbox.paypal.com/v1/vault/credit-cards/`, {
            headers: {
              Authorization: accessToken,
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
              number: state.card_number,
              type: validCard.card.type === 'american-express' ? 'amex' : validCard.card.type,
              expire_month,
              expire_year,
              first_name: props.account.first_name,
              last_name: props.account.last_name,
              external_customer_id: props.account.id,
            }),
          });
          if (resCard.status === System.RESPONSE_STATUS.CREATED) {
            const cardInfor = await resCard.json();
            props.addCardAction(cardInfor.id, cardInfor.number);
            _goBack();
          } else {
            Alert.alert('Error', 'Add credit card fail', [{text: 'OK'}]);
            setState((state) => ({
              ...state,
              loading: false,
            }));
          }
        } else {
          Alert.alert('Error', 'Add credit card fail', [{text: 'OK'}]);
          setState((state) => ({
            ...state,
            loading: false,
          }));
        }
      } else {
        Alert.alert('Error', 'Credit card number is not valid', [
          {
            text: 'OK',
            onPress: () => {
              card_number.current.focus();
              setState((state) => ({
                ...state,
                loading: false,
              }));
            },
          },
        ]);
      }
    } catch (error) {
      setState((state) => ({
        ...state,
        loading: false,
      }));
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    } finally {
      props.offLoadingAction();
    }
  };

  const _save = async () => {
    const {isValid, controlFocus} = _validate();
    if (!isValid) {
      props.onLoadingAction();
      setState((state) => ({
        ...state,
        loading: true,
      }));
    } else
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => {
            controlFocus.focus();
            setState((state) => ({
              ...state,
              loading: false,
            }));
          },
        },
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
          text: 'New Payment Method',
          style: styles.headerCenter,
        }}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.flex_1}>
        <View style={common.container}>
          {/* <View style={styles.viewTitle}>
            <Text style={styles.title}>Choose payment</Text>
            <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
          </View>
          <Text style={[styles.title, {marginTop: ms(-20)}]}>method</Text> */}

          <InputComponent
            label="Card Number"
            ref={card_number}
            placeholder="CARD NUMBER"
            keyboardType="number-pad"
            onChangeText={_onChangeText('card_number')}
            value={state.card_number}
            inputStyle={styles.inputStyle}
            maxLength={16}
          />
          <View style={common.flexRow}>
            <InputComponent
              containerStyle={[common.flex_1, common.mr10]}
              label="CVV"
              ref={card_cvc}
              placeholder="CVV"
              keyboardType="number-pad"
              onChangeText={_onChangeText('card_cvc')}
              value={state.card_cvc}
              inputStyle={styles.inputStyle}
              maxLength={4}
            />
            <InputComponent
              containerStyle={[common.flex_1, common.mr10]}
              label="MM/YY"
              ref={card_valid_from}
              placeholder="MM/YY"
              keyboardType="number-pad"
              onChangeText={_onChangeText('card_valid_from')}
              value={state.card_valid_from}
              inputStyle={styles.inputStyle}
              maxLength={5}
            />
          </View>
          <InputComponent
            label="ZIP/Postal Code"
            ref={zip_code}
            placeholder="Your Code"
            keyboardType="number-pad"
            onChangeText={_onChangeText('zip_code')}
            value={state.zip_code}
            inputStyle={[styles.inputStyle, common.textLeft]}
          />
          {/* <View style={styles.wrapCheckbox}>
            <CheckBox
              title="I accept the"
              checked={state.isChecked}
              checkedColor={colors.silverTree}
              containerStyle={[styles.checkboxContainer, common.mr0]}
              textStyle={styles.conditionText}
              onPress={checkTerms}
            />
            <TouchableOpacity style={common.pd5}>
              <Text style={styles.link}>Terms of Use</Text>
            </TouchableOpacity>
          </View> */}
          <ButtonComponent
            disabled={state.loading}
            onPress={_save}
            text="Save"
            btnFull={true}
            styleContainer={common.mt20}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
