import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import system from '@src/constant/system';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {addCommitmentBillingScreen} from '@src/screens/myCommitment/addCommitment/billingInformation/navigation';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {myCommitmentPaymentScreen} from '@src/screens/myCommitment/addCommitment/payment';
import {addCommitmentAction, stakeAppAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {colors, common} from '@src/styles';
import {appleHealthKit} from '@src/utils';
import React from 'react';
import {Alert, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox, Icon, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import InviteFriendModalComponent from './inviteFriend';
import InviteFromListFriendModalComponent from './inviteFriendFromList';
import {IProps, IState} from './propState';
import {inviteFriendAction} from './redux/actions';
import styles from './styles';
import moment from 'moment-timezone';

class ContractComponent extends React.Component<IProps> {
  amount_fine: TextInput;

  state: IState = {
    modalInviteStatus: false,
    modalListStatus: false,
    amount_fine: '',
    stake_to: system.STAKE.STAKE_TO_FRIEND,
    email_friend: '',
    email_status: '',
    name_friend: '',
    timezone: moment.tz.guess(),
  };

  _showHideModalList = () => {
    if (this.state.modalListStatus === true) {
      this.setState({modalListStatus: false});
    } else {
      this.props.inviteFriendAction();
      this.setState({modalListStatus: true});
    }
  };

  _showHideModalInviteFriend = () => {
    if (this.state.modalInviteStatus === true) {
      this.setState({modalInviteStatus: false});
    } else {
      this.setState({modalInviteStatus: true});
    }
  };

  numberWithCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  _onChangeAmountFine = (state: string) => (evt: any) => {
    evt = evt.replace(/,/g, '');
    evt = this.numberWithCommas(evt);
    this.setState({[state]: evt});
  };

  _onCheckboxChange = (value: string) => () =>
    this.setState({stake_to: value}, () => {
      if (this.state.stake_to === System.STAKE.NO_STAKE) {
        this.setState({
          amount_fine: '',
          email_friend: '',
          name_friend: '',
        });
      }
    });

  _selectEmail = (email_friend: string, name_friend: string, email_status: string) => {
    this.setState({email_friend, name_friend, email_status, modalStatus: false});
  };

  _validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;
    if (this.state.amount_fine === '' && this.state.stake_to === system.STAKE.STAKE_TO_FRIEND) {
      isValid = 'Please enter the stake amount!';
      controlFocus = this.amount_fine;
    }
    if (
      parseInt(this.state.amount_fine.replace(/,/g, '')) < 5 &&
      this.state.stake_to === system.STAKE.STAKE_TO_FRIEND
    ) {
      isValid = 'Please enter the stake amount being higher than 5!';
      controlFocus = this.amount_fine;
    }
    if (this.state.stake_to === system.STAKE.STAKE_TO_FRIEND && this.state.email_friend === '') {
      isValid = "Please enter your friend's email!";
      controlFocus = null;
    }

    if (this.state.stake_to === system.STAKE.STAKE_TO_FRIEND && this.state.name_friend === '') {
      isValid = "Please enter your friend's name!";
      controlFocus = null;
    }
    return {isValid, controlFocus};
  };

  _removeEmail = () =>
    this.setState({
      email_friend: '',
      email_status: '',
    });

  _continue = () => {
    const {isValid, controlFocus} = this._validate();
    if (!isValid) {
      const amount_fine = parseFloat(this.state.amount_fine.replace(/,/g, ''));
      this.props.stakeAppAction(
        amount_fine,
        this.state.stake_to,
        this.state.email_friend,
        this.state.name_friend,
        this.state.timezone,
      );
      if (this.props.account_credit_card.length > 0) {
        myCommitmentPaymentScreen(this.props.componentId);
      } else {
        addCommitmentBillingScreen(this.props.componentId);
      }
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  _finalizeCommitment = async () => {
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
    this.props.stakeAppAction(
      null,
      this.state.stake_to,
      this.state.email_friend,
      this.state.name_friend,
      this.state.timezone,
    );
    this.props.addCommitmentAction(this.props.componentId);
  };

  render() {
    console.log(moment.tz.guess());
    return (
      <>
        <HeaderAddCommitmentComponent
          nameButton="Back"
          _goBack={this._goBack}
          disabled={this.props.isLoading}
          step={5}
          componentId={this.props.componentId}
          hasBackButton={true}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.flex_1}>
          <View style={common.container}>
            <View style={[common.flexColumn, common.mt30]}>
              <Text style={styles.title}>Set up Pledge</Text>
              <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={styles.title}>contract</Text>
            <Text style={styles.textDefault}>How much do you want to put on the line?</Text>
            {this.state.stake_to === system.STAKE.NO_STAKE ? null : (
              <View style={[common.mx20]}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <InputComponent
                    leftIcon="attach-money"
                    leftIconType="material"
                    containerStyle={styles.w_180}
                    ref={(input) => (this.amount_fine = input)}
                    keyboardType="number-pad"
                    value={this.state.amount_fine === '' ? null : this.state.amount_fine}
                    maxLength={11}
                    onChangeText={this._onChangeAmountFine('amount_fine')}
                  />
                </View>
              </View>
            )}
            <View>
              <CheckBox
                title="Stake against a friend (or enemy)"
                checked={this.state.stake_to === system.STAKE.STAKE_TO_FRIEND}
                checkedColor={colors.silverTree}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.conditionText}
                onPress={this._onCheckboxChange(system.STAKE.STAKE_TO_FRIEND)}
              />
            </View>
            {this.state.stake_to === system.STAKE.STAKE_TO_FRIEND && this.state.email_friend === '' ? (
              <>
                <TouchableOpacity onPress={this._showHideModalInviteFriend} style={common.pd5}>
                  <Text style={styles.customText}>Invite Friend</Text>
                </TouchableOpacity>
                {this.props.account_has_friend ? (
                  <TouchableOpacity onPress={this._showHideModalList} style={common.pd5}>
                    <Text style={styles.customText}>Invite From List</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : null}
            {this.state.stake_to === system.STAKE.STAKE_TO_FRIEND && this.state.email_friend !== '' ? (
              <View style={styles.listFriend}>
                <Text style={styles.text}>
                  {this.state.name_friend ? this.state.name_friend : this.state.email_friend}{' '}
                  {this.state.email_status === 'IN_ACTIVE' ? '(pending)' : null}
                </Text>
                <TouchableOpacity onPress={this._removeEmail} style={common.pd5}>
                  <Icon type="ionicon" name="ios-close" color={colors.darkMain} />
                </TouchableOpacity>
              </View>
            ) : null}
            <View>
              <CheckBox
                title="No stake"
                checked={this.state.stake_to === system.STAKE.NO_STAKE}
                checkedColor={colors.silverTree}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.conditionText}
                onPress={this._onCheckboxChange(system.STAKE.NO_STAKE)}
              />
            </View>
            <View style={this.state.stake_to === system.STAKE.NO_STAKE ? styles.wrapBtnNoStake : styles.wrapBtn}>
              {/* <ButtonComponent text="Back" clear={true} onPress={this._goBack} /> */}
              <ButtonComponent
                btnFull={false}
                onPress={this.state.stake_to === system.STAKE.NO_STAKE ? this._finalizeCommitment : this._continue}
                text={this.state.stake_to === system.STAKE.NO_STAKE ? 'Finalize' : 'Submit'}
                disabled={this.props.isLoading}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <InviteFromListFriendModalComponent
          modalStatus={this.state.modalListStatus}
          hideModal={this._showHideModalList}
          selectEmail={this._selectEmail}
        />
        <InviteFriendModalComponent
          modalStatus={this.state.modalInviteStatus}
          hideModal={this._showHideModalInviteFriend}
          selectEmail={this._selectEmail}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    addCommitment: state.screens.myCommitments.addCommitment,
    account_credit_card: state.account.creditCard,
    account_has_friend: state.account.has_friend,
    isLoading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({inviteFriendAction, stakeAppAction, addCommitmentAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContractComponent);
