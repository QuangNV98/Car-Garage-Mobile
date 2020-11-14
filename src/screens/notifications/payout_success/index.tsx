import React from 'react';
import {connect} from 'react-redux';
import {common, colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {IProps, IState} from './propState';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import ButtonComponent from '@src/containers/components/button';
import {validation} from '@src/utils';
import TitleComponent from '@src/containers/components/title';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {bindActionCreators, Dispatch} from 'redux';
import {rootNotificationScreen} from '../navigation';
import {addCommitmentFinishScreen} from '@src/screens/myCommitment/addCommitment/finishOnBoarding/navigation';
import FastImage from 'react-native-fast-image';
import Dash from 'react-native-dash';

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

  _goBack = () => Navigation.pop(this.props.componentId);

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  _goToTracker = (item) => () => {
    addCommitmentFinishScreen(this.props.componentId, {item});
  };

  render() {
    console.log(this.props.item, 'this.props.item11');
    return (
      <>
        {/* <Header
          // leftComponent={
          //   <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
          //     <Icon5 name="chevron-left" size={ms(15)} />
          //   </TouchableOpacity>
          // }
        /> */}
        {/* <KeyboardAwareScrollView contentContainerStyle={common.flex_1}> */}
        <View style={[common.modalContainer, styles.modalContainer]}>
          <TouchableOpacity style={[common.modalClose, styles.closeIcon]} onPress={this._goBack}>
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
                ? (parseFloat(this.props.item.cCommitmentModel.commitment_target) / 0.000621371192).toFixed(0)
                : parseFloat(this.props.item.cCommitmentModel.commitment_target).toFixed(0)}{' '}
              {this.props.item.cCommitmentModel.goal_id === 1
                ? 'calories'
                : this.props.item.cCommitmentModel.goal_id === 4
                ? 'steps'
                : this.props.item.cCommitmentModel.goal_id === 5
                ? 'times'
                : this.props.item.cCommitmentModel.unit}{' '}
              for the next {this.props.item.cCommitmentModel.commitment_target_time}{' '}
              {this.props.item.cCommitmentModel.unit === 'meters'
                ? parseFloat((this.props.item.cCommitmentModel.commitment_target_time / 0.000621371192).toFixed(0)) > 1
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
                  {parseInt(this.props.item.cCommitmentModel.amount_bet.toString()) ===
                  this.props.item.cCommitmentModel.amount_bet
                    ? `${this.props.item.cCommitmentModel.amount_bet}.00`
                    : this.props.item.cCommitmentModel.amount_bet}
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
                  {parseInt(JSON.parse(this.props.item.note).amount.toString()) ===
                  JSON.parse(this.props.item.note).amount
                    ? `${JSON.parse(this.props.item.note).amount}.00`
                    : JSON.parse(this.props.item.note).amount}
                </Text>
              </View>
            </View>
            <View style={styles.itemTop}>
              <FastImage style={styles.iconItem} source={require('@src/assets/images/payout-success.png')} />
              <Text style={styles.textDefault}>
                <Text style={{color: colors.silverTree, textDecorationLine: 'underline'}}>{this.props.name}</Text> has
                just paid you
              </Text>
              <Text style={styles.moneyNumber}>
                $
                {parseInt(JSON.parse(this.props.item.note).amount.toString()) ===
                JSON.parse(this.props.item.note).amount
                  ? `${JSON.parse(this.props.item.note).amount}.00`
                  : JSON.parse(this.props.item.note).amount}
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
        {/* </KeyboardAwareScrollView> */}
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PayoutComponent);
