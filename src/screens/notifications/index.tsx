import {RootState} from '@src/boot/rootReducers';
import config from '@src/constant/config';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import TitleComponent from '@src/containers/components/title';
import {colors, common} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {APP_NOTIFICATION_SCREEN} from './navigation';
import {IProps, IState} from './propState';
import {getListNotificationsAction} from './redux/actions';
import styles from './styles';
import ButtonComponent from '@src/containers/components/button';
import moment from 'moment';
import Dash from 'react-native-dash';

class NotificationComponent extends React.Component<IProps> {
  state: IState = {
    modalStatus: false,
    item: null,
  };

  componentDidMount() {
    this.props.getListNotificationsAction();
  }

  _showModal = (item) => () => {
    this.setState(
      {
        modalStatus: true,
        item,
      },
      () => console.log(item, '11'),
    );
  };
  _closeModal = () => {
    this.setState({
      modalStatus: false,
    });
  };

  _goToTracker = (item) => () => {
    this.setState(
      {
        modalStatus: false,
      },
      () => {
        // addCommitmentFinishScreen(this.props.componentId, {item});
      },
    );
  };

  _renderItem = ({item}) => {
    let str1 = '';
    let str2 = '';
    let str3 = '';
    const array = item.message.split(' ');

    if (item.notification_type === 'FRIEND_REGISTRATION') {
      str1 = array[0] + ' ' + array[1];
      str2 = ' ' + array[2];
      for (let i = 3; i < array.length; i++) {
        str3 += ' ' + array[i];
      }
    } else if (item.notification_type === 'COMMITMENT_INVITATION') {
      str1 = array[0];
      // str2 = ' ' + array[2];
      for (let i = 1; i < array.length; i++) {
        str3 += ' ' + array[i];
      }
    } else if (item.notification_type === 'PAYOUT_SUCCESS') {
      str1 = array[0];
      // str2 = ' ' + array[4];
      for (let i = 1; i < array.length; i++) {
        str3 += ' ' + array[i];
      }
    } else if (item.notification_type === 'VIEW_PROGRESS_TRACKER') {
      str1 = array[0];
      // str2 = ' ' + array[5];
      for (let i = 1; i < array.length; i++) {
        str3 += ' ' + array[i];
      }
    }
    return (
      <>
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.leftItem}>
            <Image
              style={styles.itemIconLeft}
              source={
                item && item.notification_type === 'PAYOUT_FAIL'
                  ? require('@src/assets/images/payout-false.png')
                  : item.notification_type === 'PAYOUT_SUCCESS'
                  ? require('@src/assets/images/payout-success.png')
                  : item.cCommitmentModel &&
                    item.cCommitmentModel.accountModel &&
                    item.cCommitmentModel.accountModel.avatar
                  ? {uri: `${config.HOST_API}/${item.cCommitmentModel.accountModel.avatar}`}
                  : require('@src/assets/images/avatarDefault.png')
              }
            />
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.itemTextContent}>
              {item.notification_type === 'PAYOUT_FAIL' ? item.message : null}
              {item.notification_type === 'DEFAULT' ? item.message : null}
              {item.notification_type === 'FRIEND_REGISTRATION'
                ? // item.notification_type === 'PAYOUT_SUCCESS' ||
                  // item.notification_type === 'VIEW_PROGRESS_TRACKER'
                  str1
                : null}
              <Text style={styles.itemTextContentUser}>
                {item.notification_type === 'FRIEND_REGISTRATION'
                  ? // item.notification_type === 'PAYOUT_SUCCESS' ||
                    // item.notification_type === 'VIEW_PROGRESS_TRACKER'
                    str2
                  : str1}
              </Text>
              {str3}
            </Text>
            {item.notification_type === 'VIEW_PROGRESS_TRACKER' ? (
              <ButtonComponent
                text="View commitment"
                styleContainer={styles.btnView}
                styleButton={styles.btnViewContainer}
                styleText={styles.textView}
                onPress={() => {}}
              />
            ) : null}
            <Text style={styles.itemTime}>
              {moment(item.created_at).days() !== moment().days() ||
              moment(item.created_at).month() !== moment().month() ||
              moment(item.created_at).year() !== moment().year()
                ? moment(item.created_at).format('MMM DD, YYYY')
                : moment.duration(moment().diff(moment(item.created_at))).hours() > 0
                ? moment.duration(moment().diff(moment(item.created_at))).hours() + ' hours ago'
                : moment.duration(moment().diff(moment(item.created_at))).minutes() + ' minutes ago'}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  render() {
    return (
      <>
        <View style={common.flex_1}>
          <View style={common.container}>
            <Text style={styles.pageTitle}>Notifications</Text>
            <FlatList
              data={this.props.listNotifications}
              renderItem={this._renderItem}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </View>
        {this.state.item ? (
          <Modal isVisible={this.state.modalStatus} style={styles.modalWrap} hasBackdrop={false}>
            <View style={[common.modalContainer, styles.modalContainer]}>
              <TouchableOpacity style={[common.modalClose, styles.closeIcon]} onPress={this._closeModal}>
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
                  {this.state.item.cCommitmentModel.goal_id === 1
                    ? 'Burning'
                    : this.state.item.cCommitmentModel.goal_id === 2
                    ? 'Running'
                    : this.state.item.cCommitmentModel.goal_id === 4
                    ? 'Walking'
                    : this.state.item.cCommitmentModel.goal_id === 5
                    ? 'Visiting'
                    : 'Biking'}{' '}
                  {this.state.item.cCommitmentModel.goal_id === 5
                    ? this.state.item.cCommitmentModel.location_name + ' '
                    : null}
                  {parseFloat(this.state.item.cCommitmentModel.commitment_target).toFixed(0)}{' '}
                  {this.state.item.cCommitmentModel.goal_id === 1
                    ? 'calories'
                    : this.state.item.cCommitmentModel.goal_id === 4
                    ? 'steps'
                    : this.state.item.cCommitmentModel.goal_id === 5
                    ? 'times'
                    : this.state.item.cCommitmentModel.unit}{' '}
                  for the next {this.state.item.cCommitmentModel.commitment_target_time}{' '}
                  {this.state.item.cCommitmentModel.commitment_target_time > 1
                    ? this.state.item.cCommitmentModel.commitment_target_time_unit.toLowerCase()
                    : this.state.item.cCommitmentModel.commitment_target_time_unit
                        .toLowerCase()
                        .slice(0, this.state.item.cCommitmentModel.commitment_target_time_unit.length - 1)}
                </Text>
                <View style={styles.itemBottom}>
                  <View style={styles.itemBottomEach}>
                    <Text style={[styles.itemBottomTitle, common.pb0]}>Total amount</Text>
                    <Text style={styles.itemBottomTitle}>at stake</Text>
                    <Text style={styles.itemBottomNumber}>${this.state.item.cCommitmentModel.amount_bet}.00</Text>
                  </View>
                  <Dash
                    dashGap={5}
                    dashLength={6}
                    dashThickness={2}
                    dashColor="#C0C5CF"
                    style={{width: 1, height: 80, flexDirection: 'column', opacity: 0.5}}
                  />
                  <View style={[styles.itemBottomEach, styles.itemBottomEachRight]}>
                    <Text style={[styles.itemBottomTitle, common.pb0]}>Total </Text>
                    <Text style={styles.itemBottomTitle}>money lost</Text>
                    <Text style={[styles.itemBottomNumber, {color: colors.red}]}>
                      -${this.state.item.cCommitmentModel.amount_bet}.00
                    </Text>
                  </View>
                </View>
                <View style={styles.itemTop}>
                  <Image style={styles.iconItem} source={require('@src/assets/images/payout-false.png')} />
                  <Text style={styles.textDefault}>
                    Your money is gone to{' '}
                    <Text style={{color: colors.silverTree, textDecorationLine: 'underline'}}>
                      {this.state.item.cCommitmentModel.email_friend}
                    </Text>
                  </Text>
                  <Text style={styles.moneyNumber}>${this.state.item.cCommitmentModel.amount_bet}.00</Text>
                  {/* <Text style={styles.textDefault}>by failling the commitment to</Text>
                  <Text style={styles.userName}>{this.state.item.cCommitmentModel.email_friend}</Text> */}
                  <ButtonComponent
                    btnFull={false}
                    text="See Pledge details"
                    onPress={this._goToTracker(this.state.item.cCommitmentModel)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        ) : null}

        <BottomTabNavigation componentId={this.props.componentId} activeTab={APP_NOTIFICATION_SCREEN} />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({listNotifications: state.screens.notificationReducer.data});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({getListNotificationsAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
