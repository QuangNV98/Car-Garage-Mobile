import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import TitleComponent from '@src/containers/components/title';
import {offLoadingAction, onLoadingAction, toggleUpdateTimerAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import appleHealth from '@src/utils/appleHealthKit';
import moment from 'moment';
import React from 'react';
import {Alert, Dimensions, ScrollView, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import AppleHealthKit from 'rn-apple-healthkit';
import {dataCollectAction} from '../redux/actions';
import {CountDown} from './countDown';
import {IProps, IState} from './propState';
import styles from './styles';
import {getListProgressDetailAction, getDetailCheckInAction} from '@src/screens/myCommitment/redux/actions';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';

class StartRunningComponent extends React.Component<IProps> {
  state: IState = {
    isRunning: false,
    startTime: null,
    item: this.props.item,
    isStartTimer: false,
    countDownTimeMinute: 0,
    countDownTimeSecond: 0,
    isModalProgress: false,
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.diffMinute && props.diffSecond) {
      return {
        countDownTimeMinute: props.diffMinute,
        countDownTimeSecond: props.diffSecond,
      };
    }
    return null;
  }

  async componentDidMount() {
    const backgroundTimer = await AsyncStorage.getItem(System.BACKGROUND_TIMER);
    const timer = JSON.parse(backgroundTimer);
    if (timer) {
      const diffTime = moment.duration(moment().diff(moment(timer.timer)));
      this.setState(
        {
          // isStartTimer: true,
          isRunning: timer.timer,
          countDownTimeMinute: diffTime.minutes(),
          countDownTimeSecond: diffTime.seconds(),
          startTime: timer ? moment(timer.timer).toDate() : null,
        },
        () => {
          this.props.toggleUpdateTimerAction(true);
        },
      );
    }
  }

  setPremission = (read?: string[], write?: string[]) => {
    try {
      return new Promise((resolve, reject) => {
        AppleHealthKit.initHealthKit({permissions: {read, write}}, (err: string, results: object) =>
          err ? reject(err) : resolve(results),
        );
      });
    } catch (error) {
      throw error;
    }
  };

  _goBack = async () => {
    const backgroundTimer = await AsyncStorage.getItem(System.BACKGROUND_TIMER);
    if (backgroundTimer) {
      Alert.alert('Warning', 'Please finish to save the progress!');
    } else {
      Navigation.pop(this.props.componentId);
    }
  };

  startWorkout = async (goal_id) => {
    const PREMISSION_READ = {
      RUNNING: 'DistanceWalkingRunning',
    };

    const readPremission = [];
    if (goal_id === 2) {
      readPremission.push(PREMISSION_READ.RUNNING);
    }

    await this.setPremission(readPremission);
  };

  _goWhileRunning = async () => {
    this.startWorkout(this.state.item.goal_id).then(() => {
      this.props.toggleUpdateTimerAction(true);
      this.setState({
        isStartTimer: true,
        isRunning: true,
        startTime: new Date(),
      });
    });
  };

  _stopRunning = async () => {
    await AsyncStorage.removeItem(System.BACKGROUND_TIMER);
    this.setState(
      {
        isStartTimer: false,
        isRunning: false,
        countDownTimeMinute: 0,
        countDownTimeSecond: 0,
      },
      async () => {
        await BackgroundTimer.stopBackgroundTimer();
        let dataRunning = [];

        if (this.state.item.goal_id === 2) {
          this.props.onLoadingAction();
          this.props.toggleUpdateTimerAction(false);
          dataRunning = await appleHealth.getDailyDistanceWalkingRunning(this.state.startTime);
          let valueRunning = 0;
          dataRunning.map((x) => {
            valueRunning += x.value;
          });
          if (this.state.item.unit === 'meters') {
            valueRunning = valueRunning / 0.000621371192;
          }
          if (dataRunning.length > 0) {
            const new_item = {
              amount_bet: this.state.item.amount_bet,
              commitment_details_process: this.state.item.commitment_details_process,
              commitment_details_target: this.state.item.commitment_details_target,
              commitment_process: this.state.item.commitment_process + valueRunning,
              commitment_target: this.state.item.commitment_target,
              commitment_target_time: this.state.item.commitment_target_time,
              commitment_target_time_unit: this.state.item.commitment_target_time_unit,
              commitment_type: this.state.item.commitment_type,
              count_active: this.state.item.count_active,
              count_finish: this.state.item.count_finish,
              email_friend: this.state.item.email_friend,
              first_name: this.state.item.first_name,
              goal_id: this.state.item.goal_id,
              id: this.state.item.id,
              last_name: this.state.item.last_name,
              latitude: this.state.item.latitude,
              location_name: this.state.item.location_name,
              longitude: this.state.item.longitude,
              row_number: this.state.item.row_number,
              status: this.state.item.status,
              unit: this.state.item.unit,
            };
            this.setState(
              {
                item: new_item,
              },
              () => {
                this.props.dataCollectAction(2, JSON.stringify(dataRunning), this.props.item.id);
              },
            );
          }
          this.props.offLoadingAction();
        }
      },
    );
  };
  _renderValueText = () => {
    if (this.state.item) {
      switch (this.state.item.goal_id) {
        case 1:
          return 'calories';
        case 2:
          return this.state.item.unit;
        case 3:
          return this.state.item.unit;
        case 4:
          return 'steps';
        case 5:
          return 'times';
        default:
          return '';
      }
    }
  };

  _renderValueSingularText = () => {
    if (this.state.item) {
      switch (this.state.item.goal_id) {
        case 1:
          return 'calories';
        case 2:
          return this.state.item.unit.slice(0, this.state.item.unit.length - 1);
        case 3:
          return this.state.item.unit.slice(0, this.state.item.unit.length - 1);
        case 4:
          return 'step';
        case 5:
          return 'time';
        default:
          return '';
      }
    }
  };

  _renderGoalText = () => {
    if (this.state.item) {
      switch (this.state.item.goal_id) {
        case 1:
          return 'burn';
        case 2:
          return 'run';
        case 3:
          return 'bike';
        case 4:
          return 'walk';
        case 5:
          return 'visit';
        default:
          return '';
      }
    }
  };

  _renderGoalTitle = () => {
    if (this.state.item) {
      switch (this.state.item.goal_id) {
        case 1:
          return 'Burn';
        case 2:
          return 'Run';
        case 3:
          return 'Bike';
        case 4:
          return 'Walk';
        case 5:
          return 'Visit';
        default:
          return '';
      }
    }
  };

  _renderValueTitle = () => {
    if (this.props.item) {
      switch (this.props.item.goal_id) {
        case 1:
          return 'calories';
        case 2:
          return this.props.item.unit;
        case 3:
          return this.props.item.unit;
        case 4:
          return 'steps';
        case 5:
          return 'times';
        default:
          return '';
      }
    }
  };

  _renderValueSingularTitle = () => {
    if (this.props.item) {
      switch (this.props.item.goal_id) {
        case 1:
          return 'calories';
        case 2:
          return this.props.item.unit.slice(0, this.props.item.unit.length - 1);
        case 3:
          return this.props.item.unit.slice(0, this.props.item.unit.length - 1);
        case 4:
          return 'step';
        case 5:
          return 'time';
        default:
          return '';
      }
    }
  };

  toggleModalDetails = () => {
    this.setState({isModalProgress: false});
  };

  showProgressDetail = () => {
    this.setState({isModalProgress: true});

    if (this.props.item) {
      if (this.props.item.goal_id === 5) {
        this.props.getDetailCheckInAction(this.props.item.id);
      } else {
        this.props.getListProgressDetailAction(
          this.props.item.goal_id,
          this.props.item.created_at,
          this.props.item.finish_at,
        );
      }
    }
  };

  keyExtractor = (index) => index.toString();

  _renderBottomSheetContent = ({item}) => {
    return (
      <View style={styles.bottomSheetItem}>
        {item.progress_detail ? (
          <>
            <View style={styles.itemLeft}>
              <Text style={styles.itemLeftDate}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
              <Text style={styles.itemLeftnumber}>
                {item.progress_detail.toFixed(2)}{' '}
                {item.progress_detail > 1 ? this._renderValueTitle() : this._renderValueSingularTitle()}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Image style={styles.imgUp} source={require('@src/assets/images/icon-up.png')} />
              <Text style={styles.itemRightNumber}>
                +{((item.progress_detail / this.props.item.commitment_target) * 100).toFixed(2)}%
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.itemLeft}>
              <Text style={styles.itemLeftDate}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
              <Text style={styles.itemLeftnumber}>
                {item.count_check_in} {item.count_check_in > 1 ? 'times' : 'time'}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Image style={styles.imgUp} source={require('@src/assets/images/icon-up.png')} />
              <Text style={styles.itemRightNumber}>
                +{((item.count_check_in / this.props.item.commitment_target) * 100).toFixed(2)}%
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };

  render() {
    const title = `${this._renderGoalTitle()} ${
      this.props.item
        ? this.props.item.unit === 'miles'
          ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
          : (this.props.item.commitment_target / 0.000621371192).toFixed(0)
        : null
    } ${
      this.props.item
        ? this.props.item.commitment_target > 1
          ? this._renderValueText()
          : this._renderValueSingularText()
        : null
    } ${
      this.props.item
        ? this.props.item.commitment_type === 'STANDARD'
          ? `in ${this.props.item.commitment_target_time} ${
              this.props.item.commitment_target_time > 1
                ? this.props.item.commitment_target_time_unit.toLowerCase()
                : this.props.item.commitment_target_time_unit
                    .toLowerCase()
                    .slice(0, this.props.item.commitment_target_time_unit.length - 1)
            }`
          : `per ${this.props.item.commitment_target_time_unit
              .toLowerCase()
              .slice(0, this.props.item.commitment_target_time_unit.length - 1)} for the next ${
              this.props.item.commitment_target_time
            } ${
              this.props.item.commitment_target_time > 1
                ? this.props.item.commitment_target_time_unit.toLowerCase()
                : this.props.item.commitment_target_time_unit
                    .toLowerCase()
                    .slice(0, this.props.item.commitment_target_time_unit.length - 1)
            }`
        : null
    }`;
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon5 name="chevron-left" size={ms(20)} />
            </TouchableOpacity>
          }
          centerComponent={<Text style={common.headerTitle}>Pledge details</Text>}
        />
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.boxContent}>
              <View style={styles.viewTitle}>
                <TitleComponent
                  title={title}
                  width={62}
                  styleContainer={common.alignSeftCenter}
                  styleTitle={common.textCenter}
                  styleUnderLine={{position: 'absolute', top: ms(20), left: ms(-7)}}
                />
                {this.state.item ? (
                  <Text style={styles.subTitle}>
                    {moment(this.state.item.created_at).format('MMM DD')} -{' '}
                    {moment(this.state.item.finish_at).format('MMM DD, YYYY')}
                  </Text>
                ) : null}
                <View style={styles.viewCircleSecond}>
                  <AnimatedCircularProgress
                    size={Dimensions.get('screen').width - ms(150)}
                    width={ms(20)}
                    fill={
                      this.state.item
                        ? this.state.item.commitment_process > this.state.item.commitment_target
                          ? 100
                          : (this.state.item.commitment_process / this.state.item.commitment_target) * 100
                        : 0
                    }
                    arcSweepAngle={360}
                    rotation={0}
                    tintColor="#BBE7DF"
                    backgroundColor="rgba(0, 0, 0, 0.06)"
                    backgroundWidth={ms(20)}
                    lineCap="round"
                    style={styles.AnimatedCircularProgress}
                  />
                  <View style={styles.viewTextFill}>
                    <Text style={styles.unitText}>
                      {this.state.item && parseInt(this.state.item.commitment_target.toString()) > 1
                        ? this._renderValueText()
                        : this._renderValueSingularText()}
                    </Text>
                    <Text style={styles.goalText}>
                      {this.state.item
                        ? this.state.item.commitment_process > this.state.item.commitment_target
                          ? parseFloat(this.state.item.commitment_target).toFixed(0)
                          : parseInt(this.state.item.commitment_process.toString()) ===
                            this.state.item.commitment_process
                          ? this.state.item.commitment_process
                          : this.state.item.commitment_process.toFixed(2)
                        : 0}
                    </Text>
                    <Text style={styles.remainingText}>
                      Remaining (
                      {this.state.item
                        ? this.state.item.commitment_process > this.state.item.commitment_target
                          ? 0
                          : parseInt(this.state.item.commitment_process.toString()) ===
                            this.state.item.commitment_process
                          ? 100 -
                            parseFloat(
                              ((this.state.item.commitment_process / this.state.item.commitment_target) * 100).toFixed(
                                2,
                              ),
                            )
                          : (
                              100 -
                              parseFloat(
                                (
                                  (this.state.item.commitment_process / this.state.item.commitment_target) *
                                  100
                                ).toFixed(2),
                              )
                            ).toFixed(2)
                        : 0}
                      %)
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomRowContainer}>
                {this.props.item.status === System.STATUS.ACTIVE ? (
                  <View style={styles.wrapDuration}>
                    <Text style={styles.durationText}>Duration</Text>
                    <CountDown
                      item={this.state.item}
                      startCountDown={this.props.isStartTimer}
                      countDownTimeMinute={
                        this.props.diffMinute ? this.props.diffMinute : this.state.countDownTimeMinute
                      }
                      countDownTimeSecond={
                        this.props.diffSecond ? this.props.diffSecond : this.state.countDownTimeSecond
                      }
                    />
                  </View>
                ) : null}
                {!this.state.isRunning && this.props.item.status === System.STATUS.ACTIVE ? (
                  <ButtonComponent
                    text="Start Running"
                    onPress={this._goWhileRunning}
                    hasIcon={true}
                    iconName="play-arrow"
                  />
                ) : this.state.isRunning && this.props.item.status === System.STATUS.ACTIVE ? (
                  <ButtonComponent text="Finish Running" onPress={this._stopRunning} />
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
        {this.props.item ? (
          <GestureRecognizer onTouchMove={this.showProgressDetail}>
            <TouchableOpacity onPress={this.showProgressDetail}>
              <View style={styles.btnViewDetails}>
                <View style={styles.line} />
                <Text style={styles.fontBold}>Progress details</Text>
              </View>
            </TouchableOpacity>
          </GestureRecognizer>
        ) : null}
        {this.props.item ? (
          this.props.item.goal_id !== 5 ? (
            <Modal
              isVisible={this.state.isModalProgress}
              style={styles.modalDetails}
              onBackdropPress={this.toggleModalDetails}>
              {this.props.listProgressDetail.length > 0 ? (
                <>
                  <View style={styles.line} />
                  <Text style={styles.bottomSheetTitle}>Progress details</Text>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.listProgressDetail ? this.props.listProgressDetail : null}
                    renderItem={this._renderBottomSheetContent}
                    onEndReachedThreshold={0.5}
                  />
                </>
              ) : (
                <>
                  <View style={{position: 'absolute', top: 0, alignSelf: 'center'}}>
                    <View style={styles.line} />
                    <Text style={styles.bottomSheetTitle}>Progress details</Text>
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.bottomSheetText}>No progress</Text>
                  </View>
                </>
              )}
            </Modal>
          ) : (
            <Modal
              isVisible={this.state.isModalProgress}
              style={styles.modalDetails}
              onBackdropPress={this.toggleModalDetails}>
              {this.props.listDetailCheckIn.length > 0 ? (
                <>
                  <View style={styles.line} />
                  <Text style={styles.bottomSheetTitle}>Progress details</Text>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.listDetailCheckIn ? this.props.listDetailCheckIn : null}
                    renderItem={this._renderBottomSheetContent}
                    onEndReachedThreshold={0.5}
                  />
                </>
              ) : (
                <>
                  <View style={{position: 'absolute', top: 0, alignSelf: 'center'}}>
                    <View style={styles.line} />
                    <Text style={styles.bottomSheetTitle}>Progress details</Text>
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.bottomSheetText}>No progress</Text>
                  </View>
                </>
              )}
            </Modal>
          )
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isStartTimer: state.common.timer,
  diffMinute: state.common.diffMinute,
  diffSecond: state.common.diffSecond,
  listProgressDetail: state.screens.myCommitments.list.listProgressDetail,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      offLoadingAction,
      onLoadingAction,
      dataCollectAction,
      toggleUpdateTimerAction,
      getListProgressDetailAction,
      getDetailCheckInAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartRunningComponent);
