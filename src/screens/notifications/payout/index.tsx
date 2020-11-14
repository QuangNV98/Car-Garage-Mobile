import React from 'react';
import {connect} from 'react-redux';
import {common, colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {Text, TouchableOpacity, View, TextInput, Alert, Image} from 'react-native';
import Modal from 'react-native-modal';
import {Header, Icon} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {IProps, IState} from './propState';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validation} from '@src/utils';
import TitleComponent from '@src/containers/components/title';
import {payoutBet} from '../services';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {bindActionCreators, Dispatch} from 'redux';
import moment from 'moment';
import {rootNotificationScreen} from '../navigation';
import Dash from 'react-native-dash';
import FastImage from 'react-native-fast-image';
import {addCommitmentFinishScreen} from '@src/screens/myCommitment/addCommitment/finishOnBoarding/navigation';

class PayoutComponent extends React.Component<IProps> {
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;

  state: IState = {
    email: '',
    firstName: '',
    lastName: '',
    modalStatus: false,
    modalBillStatus: false,
    data: null,
  };

  _showModal = () => {
    this.setState({
      modalStatus: true,
    });
  };
  _closeModal = () => {
    this.setState({
      modalStatus: false,
    });
  };

  _showBillModal = () => {
    this.setState({
      modalBillStatus: true,
    });
  };
  _closeBillModal = () => {
    this.setState(
      {
        modalBillStatus: false,
      },
      () => {
        rootNotificationScreen();
      },
    );
  };

  validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateEmail(this.state.email)) {
      isValid = 'Please enter a valid email';
      controlFocus = this.email;
    }
    if (!this.state.lastName) {
      isValid = 'All fields are required';
      controlFocus = this.lastName;
    }
    if (!this.state.firstName) {
      isValid = 'All fields are required';
      controlFocus = this.firstName;
    }

    return {isValid, controlFocus};
  };

  _submit = async () => {
    const {isValid, controlFocus} = this.validate();
    if (!isValid) {
      this.props.onLoadingAction();
      const data = await payoutBet(this.props.commitmentId, this.state.email);
      this.setState({data}, () => {
        this._showBillModal();
      });
      this.props.offLoadingAction();
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

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  _goToTracker = (item) => () => {
    addCommitmentFinishScreen(this.props.componentId, {item});
  };

  render() {
    console.log(this.props.item, '1');
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon5 name="chevron-left" size={ms(15)} />
            </TouchableOpacity>
          }
        />
        <KeyboardAwareScrollView contentContainerStyle={common.flex_1}>
          <View style={common.container}>
            <View>
              <TitleComponent width={90} title="Payout" styleContainer={common.alignSeftCenter} />
              {/* <Text style={[common.textCenter, common.mx20]}>
                You're receiving this payout for Ngoc's Running commitment which ran from{' '}
                {moment(this.props.item.cCommitmentModel.created_at).format('MMM DD')} to{' '}
                {moment(this.props.item.cCommitmentModel.finish_at).format('MMM DD, YYYY')}
              </Text> */}
              <TouchableOpacity style={styles.btnShowDetails} onPress={this._showModal}>
                <Text style={styles.btnText}>View Payout Details</Text>
              </TouchableOpacity>
            </View>
            <View>
              <InputComponent
                ref={(input) => (this.firstName = input)}
                placeholder="First Name"
                onChangeText={this._onChangeText('firstName')}
                value={this.state.firstName}
              />
              <InputComponent
                ref={(input) => (this.lastName = input)}
                placeholder="Last Name"
                onChangeText={this._onChangeText('lastName')}
                value={this.state.lastName}
              />
              <InputComponent
                ref={(input) => (this.email = input)}
                keyboardType="email-address"
                placeholder="PayPal Account (Email)"
                onChangeText={this._onChangeText('email')}
                value={this.state.email}
              />

              <ButtonComponent text="Submit" onPress={this._submit} styleContainer={common.my20} />
              <Text style={styles.formTextFirst}>By clicking on Submit you confirm that you accept</Text>
              <Text style={styles.formTextLast}>
                the <Text style={styles.textLink}> Friend Recipient of Stakes Term and Conditions</Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal isVisible={this.state.modalStatus}>
          <View style={[common.modalContainer, common.pd15]}>
            <TouchableOpacity style={common.modalClose} onPress={this._closeModal}>
              <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.silverTree} />
            </TouchableOpacity>
            <TitleComponent width={90} title="Payout Info" styleContainer={styles.titlePayout} />
            <View style={styles.modalBody}>
              <View style={styles.modalFiled}>
                <Text style={styles.modalFieldTitle}>Total Amount of payout</Text>
                <Text style={[styles.modalFieldText, styles.fieldNumber]}>
                  ${this.props.item.cCommitmentModel.amount_bet}.00
                </Text>
              </View>
              <View style={styles.modalFiled}>
                <Text style={styles.modalFieldTitle}>Period Duration</Text>
                <Text style={styles.modalFieldText}>
                  {moment(this.props.item.cCommitmentModel.created_at).format('MMM DD')} to{' '}
                  {moment(this.props.item.cCommitmentModel.finish_at).format('MMM DD, YYYY')}
                </Text>
              </View>
              <View style={styles.modalFiled}>
                <Text style={styles.modalFieldTitle}>Dishonored on</Text>
                <Text style={styles.modalFieldText}>
                  {moment(this.props.item.cPaymentModel.finish_at).format('MMM DD, YYYY hh:mm A')}
                </Text>
              </View>
              <View style={styles.modalFiled}>
                <Text style={styles.modalFieldTitle}>Amount</Text>
                <Text style={[styles.modalFieldText, common.semiBold]}>
                  {parseInt(this.props.item.cPaymentModel.amount_bet.toString()) ===
                  this.props.item.cPaymentModel.amount_bet
                    ? `${this.props.item.cPaymentModel.amount_bet}.00`
                    : this.props.item.cPaymentModel.amount_bet}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        {this.state.modalBillStatus ? (
          <Modal isVisible={this.state.modalBillStatus} style={styles.modalWrap} hasBackdrop={false}>
            <View style={[common.modalContainer, styles.modalContainer]}>
              <TouchableOpacity style={[common.modalClose, styles.closeIcon]} onPress={this._closeBillModal}>
                <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.darkMain} />
              </TouchableOpacity>
              <View style={styles.modalBody}>
                <TitleComponent
                  title={'Dishonored Pledge details'}
                  width={100}
                  styleContainer={common.alignSeftCenter}
                  styleUnderLine={{position: 'absolute', top: 60, left: 110}}
                  styleTitle={{textAlign: 'center', width: 230} as any}
                />
                <Text style={styles.textDefault}>
                  {this.props.item.cCommitmentModel.goal_id === 1
                    ? 'Burning'
                    : this.props.item.cCommitmentModel.goal_id === 2
                    ? 'Running'
                    : this.props.item.cCommitmentModel.goal_id === 4
                    ? 'Walking'
                    : this.props.item.cCommitmentModel.goal_id === 5
                    ? 'Visiting'
                    : 'Biking'}{' '}
                  {this.props.item.cCommitmentModel.goal_id === 5
                    ? this.props.item.cCommitmentModel.location_name + ' '
                    : null}
                  {this.props.item.cCommitmentModel.unit === 'meters'
                    ? (this.props.item.cCommitmentModel.commitment_target / 0.000621371192).toFixed(0)
                    : parseFloat(this.props.item.cCommitmentModel.commitment_target).toFixed(0)}{' '}
                  {this.props.item.cCommitmentModel.unit === 'meters'
                    ? parseFloat(this.props.item.cCommitmentModel.commitment_target) / 0.000621371192 > 1
                      ? this.props.item.cCommitmentModel.goal_id === 1
                        ? 'calories'
                        : this.props.item.cCommitmentModel.goal_id === 4
                        ? 'steps'
                        : this.props.item.cCommitmentModel.goal_id === 5
                        ? 'times'
                        : this.props.item.cCommitmentModel.unit
                      : this.props.item.cCommitmentModel.goal_id === 1
                      ? 'calories'
                      : this.props.item.cCommitmentModel.goal_id === 4
                      ? 'step'
                      : this.props.item.cCommitmentModel.goal_id === 5
                      ? 'time'
                      : this.props.item.cCommitmentModel.unit.slice(0, this.props.item.cCommitmentModel.unit.length - 1)
                    : parseFloat(this.props.item.cCommitmentModel.commitment_target) > 1
                    ? this.props.item.cCommitmentModel.goal_id === 1
                      ? 'calories'
                      : this.props.item.cCommitmentModel.goal_id === 4
                      ? 'steps'
                      : this.props.item.cCommitmentModel.goal_id === 5
                      ? 'times'
                      : this.props.item.cCommitmentModel.unit
                    : this.props.item.cCommitmentModel.goal_id === 1
                    ? 'calories'
                    : this.props.item.cCommitmentModel.goal_id === 4
                    ? 'step'
                    : this.props.item.cCommitmentModel.goal_id === 5
                    ? 'time'
                    : this.props.item.cCommitmentModel.unit.slice(
                        0,
                        this.props.item.cCommitmentModel.unit.length - 1,
                      )}{' '}
                  for the next {this.props.item.cCommitmentModel.commitment_target_time}{' '}
                  {this.props.item.cCommitmentModel.unit === 'meters'
                    ? parseFloat(
                        (this.props.item.cCommitmentModel.commitment_target_time / 0.000621371192).toFixed(0),
                      ) > 1
                      ? this.props.item.cCommitmentModel.commitment_target_time_unit.toLowerCase()
                      : this.props.item.cCommitmentModel.commitment_target_time_unit
                          .toLowerCase()
                          .slice(0, this.props.item.cCommitmentModel.commitment_target_time_unit.length - 1)
                    : parseFloat(this.props.item.cCommitmentModel.commitment_target_time.toFixed(0)) > 1
                    ? this.props.item.cCommitmentModel.commitment_target_time_unit.toLowerCase()
                    : this.props.item.cCommitmentModel.commitment_target_time_unit
                        .toLowerCase()
                        .slice(0, this.props.item.cCommitmentModel.commitment_target_time_unit.length - 1)}
                </Text>
                <View style={styles.itemBottom}>
                  <View style={styles.itemBottomEach}>
                    <Text style={[styles.itemBottomTitle, common.pb0]}>Total amount</Text>
                    <Text style={styles.itemBottomTitle}>at stake</Text>
                    <Text style={styles.itemBottomNumber}>
                      $
                      {parseInt(this.state.data.data.amount_stake.toString()) === this.state.data.data.amount_stake
                        ? `${this.state.data.data.amount_stake}.00`
                        : this.state.data.data.amount_stake}
                    </Text>
                  </View>
                  <Dash
                    dashGap={5}
                    dashLength={6}
                    dashThickness={2}
                    dashColor="#C0C5CF"
                    style={{width: 1, height: 80, flexDirection: 'column', opacity: 0.5}}
                  />
                  <View style={[styles.itemBottomEach, styles.itemBottomEachRight]}>
                    <Text style={[styles.itemBottomTitle, common.pb0]}>Total money</Text>
                    <Text style={styles.itemBottomTitle}>received</Text>
                    <Text style={[styles.itemBottomNumber, {color: colors.silverTree}]}>
                      +$
                      {parseInt(this.state.data.data.amount_received.toString()) ===
                      this.state.data.data.amount_received
                        ? `${this.state.data.data.amount_received}.00`
                        : this.state.data.data.amount_received}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemTop}>
                  <FastImage style={styles.iconItem} source={require('@src/assets/images/payout-success.png')} />
                  <Text style={styles.textDefault}>
                    <Text style={{color: colors.silverTree, textDecorationLine: 'underline'}}>{this.props.name}</Text>{' '}
                    has just paid you
                  </Text>
                  <Text style={styles.moneyNumber}>
                    $
                    {parseInt(this.state.data.data.amount_received.toString()) === this.state.data.data.amount_received
                      ? `${this.state.data.data.amount_received}.00`
                      : this.state.data.data.amount_received}
                  </Text>
                  {/* <Text style={styles.textDefault}>by failling the commitment to</Text>
                <Text style={styles.userName}>{this.props.name}</Text> */}
                  <ButtonComponent
                    btnFull={false}
                    text="See Pledge details"
                    onPress={this._goToTracker(this.props.item.cCommitmentModel)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PayoutComponent);
