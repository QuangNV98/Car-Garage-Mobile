import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import config from '@src/constant/config';
import system from '@src/constant/system';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {addCommitmentAction, paymentAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {colors, common} from '@src/styles';
import {appleHealthKit} from '@src/utils';
import valid from 'card-validator';
import React from 'react';
import {Alert, Image, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import HeaderAddCommitmentComponent from '../header';
import {addCardAction} from '@src/screens/myProfile/payment/redux/actions';
import {IProps, IState} from './propState';
import styles from './styles';
import base64 from 'react-native-base64';

class BillingInformationComponent extends React.Component<IProps> {
  card_number: TextInput;
  card_valid_from: TextInput;
  card_cvc: TextInput;
  zip_code: TextInput;

  state: IState = {
    card_number: '',
    card_valid_from: '',
    card_cvc: '',
    zip_code: '',
    isPaymentSuccess: false,
    // isChecked: false,
  };

  _onChangeText = (state: string) => (evt: any) => {
    if (state === 'card_valid_from') {
      if (evt.length === 3) {
        if (evt.includes('/')) {
          this.setState({
            card_valid_from: evt,
          });
        } else {
          const evt1 = evt.slice(0, 2);
          const evt2 = evt.slice(2, 3);
          evt = evt1 + '/' + evt2;
          this.setState({
            card_valid_from: evt,
          });
        }
      } else {
        this.setState({
          card_valid_from: evt,
        });
      }
    } else {
      this.setState({[state]: evt});
    }
  };

  _validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;
    let controlFocusMask: TextInput = null;
    if (!this.state.card_cvc) {
      isValid = 'Please enter all fields';
      controlFocus = this.card_cvc;
    }
    if (!this.state.card_valid_from) {
      isValid = 'Please enter all fields';
      controlFocusMask = this.card_valid_from;
    }
    if (!this.state.card_number) {
      isValid = 'Please enter all fields';
      controlFocus = this.card_number;
    }
    if (!this.state.zip_code) {
      isValid = 'Please enter all fields';
      controlFocus = this.zip_code;
    }
    return {isValid, controlFocus, controlFocusMask};
  };

  _save = async () => {
    this.props.onLoadingAction();
    try {
      const {isValid, controlFocus} = this._validate();
      if (!isValid) {
        if (this.props.addCommitment.goal !== system.GOAL.CHOOSE_LOCATION) {
          let readPremission = '';
          switch (this.props.addCommitment.goal) {
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
        const validCard = valid.number(this.state.card_number);
        if (validCard.isValid) {
          const expire_month = this.state.card_valid_from.split('/')[0].toString();
          const expire_year =
            new Date().getFullYear().toString().slice(0, 2) + this.state.card_valid_from.split('/').pop().toString();
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
                number: this.state.card_number,
                type: validCard.card.type,
                expire_month,
                expire_year,
                first_name: this.props.account.first_name,
                last_name: this.props.account.last_name,
                external_customer_id: this.props.account.id,
              }),
            });
            if (resCard.status === System.RESPONSE_STATUS.CREATED) {
              const cardInfor = await resCard.json();
              this.props.onLoadingAction();
              this.props.addCardAction(cardInfor.id, cardInfor.number);
              this.props.paymentAction(cardInfor.id, cardInfor.number);
              this.props.addCommitmentAction(this.props.componentId);
              this.props.offLoadingAction();
            } else Alert.alert('Error', 'Add credit card fail', [{text: 'OK'}]);
          } else Alert.alert('Error', 'Add credit card fail', [{text: 'OK'}]);
        } else
          Alert.alert('Error', 'Credit card number is not valid', [
            {text: 'OK', onPress: () => this.card_number.focus()},
          ]);
      } else Alert.alert('Error', isValid, [{text: 'OK', onPress: () => controlFocus.focus()}]);
    } catch (error) {
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    } finally {
      this.props.offLoadingAction();
    }
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  // checkTerms = () => {
  //   this.setState(
  //     {
  //       isChecked: !this.state.isChecked,
  //     },
  //     () => {
  //       if (this.state.isChecked === false) {
  //         Alert.alert('Notification', 'Check here to indicate that you have read and agree to the terms of Use');
  //       }
  //     },
  //   );
  // };

  render() {
    return (
      <>
        <HeaderAddCommitmentComponent
          hasBackButton={true}
          nameButton="Back"
          _goBack={this._goBack}
          step={5}
          componentId={this.props.componentId}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Choose payment</Text>
              <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
              <Text style={[styles.title]}>method</Text>
            </View>
            <View style={common.m_hori_10}>
              <InputComponent
                label="Card Number"
                ref={(input) => (this.card_number = input)}
                placeholder="CARD NUMBER"
                keyboardType="number-pad"
                onChangeText={this._onChangeText('card_number')}
                value={this.state.card_number}
                inputStyle={styles.inputStyle}
              />
              <View style={common.flexRow}>
                <InputComponent
                  containerStyle={[common.flex_1, common.mr10]}
                  label="CVV"
                  ref={(input) => (this.card_cvc = input)}
                  placeholder="CVV"
                  keyboardType="number-pad"
                  onChangeText={this._onChangeText('card_cvc')}
                  value={this.state.card_cvc}
                  inputStyle={styles.inputStyle}
                />
                <InputComponent
                  containerStyle={[common.flex_1, common.mr10]}
                  label="MM/YY"
                  ref={(input) => (this.card_valid_from = input)}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  onChangeText={this._onChangeText('card_valid_from')}
                  value={this.state.card_valid_from}
                  inputStyle={styles.inputStyle}
                  maxLength={5}
                />
              </View>
              <InputComponent
                label="ZIP/Postal Code"
                ref={(input) => (this.zip_code = input)}
                placeholder="Your Code"
                keyboardType="number-pad"
                onChangeText={this._onChangeText('zip_code')}
                value={this.state.zip_code}
                inputStyle={[styles.inputStyle, common.textLeft]}
              />
              {/* <View style={styles.wrapCheckbox}>
                <CheckBox
                  title="I accept the"
                  checked={this.state.isChecked}
                  checkedColor={colors.silverTree}
                  containerStyle={[styles.checkboxContainer, common.mr0]}
                  textStyle={styles.conditionText}
                  onPress={this.checkTerms}
                />
                <TouchableOpacity style={common.pd5}>
                  <Text style={styles.link}>Terms of Use</Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.wrapBtn}>
              <ButtonComponent onPress={this._save} disabled={this.props.isLoading} text="Finalize" />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal isVisible={this.state.isPaymentSuccess}>
          <View style={[common.modalContainer]}>
            <View style={styles.wrapImg}>
              <Image style={styles.img} source={require('@src/assets/images/Group262.png')} />
            </View>
            <View>
              <View style={common.flexColumn}>
                <Text style={styles.modalTitle}>Payment Success!</Text>
                <Image style={styles.modalTitleImage} source={require('@src/assets/images/Rectangle_26.png')} />
              </View>
              <Text style={styles.textSuccess}>
                Now lets connect to your apple health app so that your contracts syncs seemlessly.
              </Text>
              <View style={styles.wrapSwitch}>
                <Text style={styles.labelSwitch}>Allow to write and read data</Text>
                <Switch ios_backgroundColor={colors.silverTree} disabled={true} value={true} />
              </View>
              <ButtonComponent text="Connect with apple health" btnFull={true} />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    addCommitment: state.screens.myCommitments.addCommitment,
    account: state.account,
    isLoading: state.common.isLoading,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({addCommitmentAction, onLoadingAction, offLoadingAction, addCardAction, paymentAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingInformationComponent);
