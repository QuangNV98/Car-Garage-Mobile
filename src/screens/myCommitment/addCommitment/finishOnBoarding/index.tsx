import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Dimensions, Image, ScrollView, TouchableOpacity, View, FlatList} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {IProps, IState} from './propState';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import {bindActionCreators, Dispatch} from 'redux';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {getListProgressDetailAction, getDetailCheckInAction} from '@src/screens/myCommitment/redux/actions';
import Modal from 'react-native-modal';
import moment from 'moment';
import TitleComponent from '@src/containers/components/title';
import ButtonComponent from '@src/containers/components/button';
import GestureRecognizer from 'react-native-swipe-gestures';

class FinishOnBoardingComponent extends React.Component<IProps> {
  state: IState = {
    countDownTimeHour: null,
    countDownTimeMinute: null,
    countDownTimeSecond: null,
    isModal: this.props.goal_id === 2 ? true : false,
    isModalProgress: false,
  };

  _continue = () => {
    if (this.props.item) {
      Navigation.pop(this.props.componentId);
    } else {
      rootMyCommitmentScreen();
    }
  };

  // componentDidMount() {
  //   if (this.props.item) {
  //     if (this.props.item.goal_id === 5) {
  //       this.props.getDetailCheckInAction(this.props.item.id);
  //     } else {
  //       this.props.getListProgressDetailAction(
  //         this.props.item.goal_id,
  //         this.props.item.created_at,
  //         this.props.item.finish_at,
  //       );
  //     }
  //   }
  // }

  async componentWillUnmount() {
    await BackgroundTimer.stopBackgroundTimer();
  }

  _goBack = async () => {
    Navigation.pop(this.props.componentId);
  };

  countDownTimer = () => {
    let hour_counter = 0;
    if (this.props.addCommitmentReducer.target_time_unit === 'DAYS') {
      hour_counter = parseInt(this.props.addCommitmentReducer.target_time) * 24 - 1;
    } else if (this.props.addCommitmentReducer.target_time_unit === 'WEEKS') {
      hour_counter = parseInt(this.props.addCommitmentReducer.target_time) * 24 * 7 - 1;
    }
    let minute_counter = 59;
    let second_counter = 60;
    BackgroundTimer.runBackgroundTimer(() => {
      if (hour_counter !== 0 || minute_counter !== 0 || second_counter !== 0) {
        second_counter--;
      }
      if (second_counter === 0) {
        if (minute_counter === 0) {
          minute_counter = 0;
        } else {
          minute_counter--;
          second_counter = 59;
        }
      }
      if (minute_counter === 0) {
        if (hour_counter === 0) {
          hour_counter = 0;
        } else {
          hour_counter--;
          minute_counter = 59;
        }
      }
      let second_display = second_counter.toString();
      let minute_display = minute_counter.toString();
      let hour_display = hour_counter.toString();
      if (second_counter < 10) {
        second_display = '0' + second_counter.toString();
      }
      if (minute_counter < 10) {
        minute_display = '0' + minute_counter.toString();
      }
      if (hour_counter < 10) {
        hour_display = '0' + hour_counter.toString();
      }
      this.setState({
        countDownTimeHour: hour_display,
        countDownTimeMinute: minute_display,
        countDownTimeSecond: second_display,
      });
    }, 1000);
  };

  _renderValueText = () => {
    if (this.props.item) {
      if (this.props.item.commitment_type === 'DAILY_WEEKLY') {
        return this.props.item.commitment_target_time_unit.toLowerCase();
      } else {
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
    } else {
      switch (this.props.addCommitmentReducer.goal) {
        case 1:
          return 'calories';
        case 2:
          return this.props.addCommitmentReducer.unit;
        case 3:
          return this.props.addCommitmentReducer.unit;
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
    if (this.props.item) {
      if (this.props.item.commitment_type === 'DAILY_WEEKLY') {
        return this.props.item.commitment_target_time_unit.toLowerCase();
      } else {
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
    } else {
      switch (this.props.addCommitmentReducer.goal) {
        case 1:
          return 'calories';
        case 2:
          return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
        case 3:
          return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
        case 4:
          return 'step';
        case 5:
          return 'time';
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
    } else {
      switch (this.props.addCommitmentReducer.goal) {
        case 1:
          return 'calories';
        case 2:
          return this.props.addCommitmentReducer.unit;
        case 3:
          return this.props.addCommitmentReducer.unit;
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
    } else {
      switch (this.props.addCommitmentReducer.goal) {
        case 1:
          return 'calories';
        case 2:
          return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
        case 3:
          return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
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
    if (this.props.item) {
      switch (this.props.item.goal_id) {
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
    } else {
      switch (this.props.addCommitmentReducer.goal) {
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

  toggleModal = () => {
    this.setState({isModal: false});
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

  keyExtractor = (index) => index.toString();

  render() {
    const title = `${this._renderGoalText()} ${
      this.props.item
        ? this.props.item.unit === 'miles'
          ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
          : (this.props.item.commitment_target / 0.000621371192).toFixed(0)
        : this.props.addCommitmentReducer
        ? this.props.addCommitmentReducer.unit === 'miles'
          ? parseFloat(this.props.addCommitmentReducer.target.toString()).toFixed(0)
          : (parseFloat(this.props.addCommitmentReducer.target) / 0.000621371192).toFixed(0)
        : null
    } ${
      this.props.item
        ? this.props.item.commitment_target > 1
          ? this._renderValueTitle()
          : this._renderValueSingularTitle()
        : this.props.addCommitmentReducer
        ? this.props.addCommitmentReducer.unit === 'miles'
          ? parseFloat(this.props.addCommitmentReducer.target) > 1
            ? this._renderValueTitle()
            : this._renderValueSingularTitle()
          : parseFloat(this.props.addCommitmentReducer.target) / 0.000621371192 > 1
          ? this._renderValueTitle()
          : this._renderValueSingularTitle()
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
              .slice(0, this.props.item.commitment_target_time_unit.length - 1)}`
        : this.props.addCommitmentReducer
        ? this.props.addCommitmentReducer.commitment_type === 'STANDARD'
          ? `in ${this.props.addCommitmentReducer.target_time} ${
              parseInt(this.props.addCommitmentReducer.target_time) > 1
                ? this.props.addCommitmentReducer.target_time_unit.toLowerCase()
                : this.props.addCommitmentReducer.target_time_unit
                    .toLowerCase()
                    .slice(0, this.props.addCommitmentReducer.target_time_unit.length - 1)
            }`
          : `per ${this.props.addCommitmentReducer.target_time_unit
              .toLowerCase()
              .slice(0, this.props.addCommitmentReducer.target_time_unit.length - 1)} for the next ${
              this.props.addCommitmentReducer.target_time
            } ${
              parseInt(this.props.addCommitmentReducer.target_time) > 1
                ? this.props.addCommitmentReducer.target_time_unit.toLowerCase()
                : this.props.addCommitmentReducer.target_time_unit
                    .toLowerCase()
                    .slice(0, this.props.addCommitmentReducer.target_time_unit.length - 1)
            }`
        : null
    }`;
    return (
      <>
        <Header
          leftComponent={
            this.props.item ? (
              <TouchableOpacity onPress={this._goBack}>
                <Icon5 name="chevron-left" size={ms(20)} />
              </TouchableOpacity>
            ) : null
          }
          centerComponent={<Text style={common.headerTitle}>Pledge details</Text>}
        />
        <View style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.boxContent}>
              <View style={styles.viewTitle}>
                <TitleComponent
                  title={title}
                  width={ms(62)}
                  styleUnderLine={{position: 'absolute', top: ms(20), left: ms(-7)}}
                  styleTitle={{textAlign: 'center'} as any}
                />
              </View>
              {this.props.item ? (
                <Text style={styles.subTitle}>
                  {moment(this.props.item.created_at).format('MMM DD')} -{' '}
                  {moment(this.props.item.finish_at).format('MMM DD, YYYY')}
                </Text>
              ) : (
                <Text style={styles.subTitle}>
                  {moment(this.props.addCommitmentReducer.start_date).format('MMM DD')} -{' '}
                  {moment(this.props.addCommitmentReducer.start_date)
                    .add(
                      this.props.addCommitmentReducer.target_time,
                      this.props.addCommitmentReducer.target_time_unit as moment.unitOfTime.DurationConstructor,
                    )
                    .format('MMM DD, YYYY')}
                </Text>
              )}
              <View style={styles.viewCircleSecond}>
                <AnimatedCircularProgress
                  size={Dimensions.get('screen').width - ms(150)}
                  width={ms(20)}
                  fill={
                    this.props.item
                      ? this.props.item.commitment_type === 'STANDARD'
                        ? this.props.item.commitment_process > this.props.item.commitment_target
                          ? 100
                          : (this.props.item.commitment_process / this.props.item.commitment_target) * 100
                        : 100 -
                          parseFloat(
                            ((this.props.item.count_active / this.props.item.commitment_target_time) * 100).toFixed(2),
                          )
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
                    {this.props.item
                      ? this.props.item && parseInt(this.props.item.commitment_target.toString()) > 1
                        ? this._renderValueText()
                        : this._renderValueSingularText()
                      : this._renderValueSingularText()}
                  </Text>
                  <Text style={styles.goalText}>
                    {this.props.item
                      ? this.props.item.commitment_type === 'STANDARD'
                        ? this.props.item.commitment_process > this.props.item.commitment_target
                          ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
                          : parseInt(this.props.item.commitment_process.toString()) ===
                            this.props.item.commitment_process
                          ? this.props.item.commitment_process
                          : this.props.item.commitment_process.toFixed(2)
                        : this.props.item.count_finish
                      : 0}
                  </Text>
                  <Text style={styles.remainingText}>
                    Remaining (
                    {this.props.item
                      ? this.props.item.commitment_type === 'STANDARD'
                        ? this.props.item.commitment_process > this.props.item.commitment_target
                          ? 0
                          : (this.props.item.commitment_process / this.props.item.commitment_target) * 100 ===
                            parseInt(
                              (
                                (this.props.item.commitment_process / this.props.item.commitment_target) *
                                100
                              ).toString(),
                            )
                          ? (
                              100 -
                              (this.props.item.commitment_process / this.props.item.commitment_target) * 100
                            ).toFixed(0)
                          : (
                              100 -
                              (this.props.item.commitment_process / this.props.item.commitment_target) * 100
                            ).toFixed(2)
                        : 100 -
                          parseFloat(
                            ((this.props.item.count_finish / this.props.item.commitment_target_time) * 100).toFixed(2),
                          )
                      : 100}
                    %)
                  </Text>
                  {this.props.item ? null : this.props.addCommitmentReducer.commitment_type === 'DAILY_WEEKLY' ? (
                    <Text>
                      per{' '}
                      {this.props.addCommitmentReducer.target_time_unit
                        .toLowerCase()
                        .slice(0, this.props.addCommitmentReducer.target_time_unit.length - 1)}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.bottomRowContainer}>
                <View style={styles.bottomCol}>
                  <Text style={styles.titleField}>
                    {this.props.item
                      ? this.props.item.commitment_target_time_unit === 'DAYS'
                        ? 'Days'
                        : 'Weeks'
                      : this.props.addCommitmentReducer.target_time_unit === 'DAYS'
                      ? 'Days'
                      : 'Weeks'}
                  </Text>
                  <Text style={styles.fieldText}>
                    {this.props.item
                      ? this.props.item.status === 'ACTIVE'
                        ? this.props.item.commitment_type === 'DAILY_WEEKLY'
                          ? `${
                              this.props.item.commitment_target_time_unit === 'DAYS'
                                ? moment.duration(moment().diff(moment(this.props.item.created_at))).days() + 1
                                : moment.duration(moment().diff(moment(this.props.item.created_at))).weeks() + 1
                            } / ${this.props.item.commitment_target_time}`
                          : `${
                              this.props.item.commitment_target_time_unit === 'DAYS'
                                ? moment.duration(moment().diff(moment(this.props.item.created_at))).days() + 1
                                : moment.duration(moment().diff(moment(this.props.item.created_at))).weeks() + 1
                            } / ${this.props.item.commitment_target_time}`
                        : `${this.props.item.commitment_target_time} / ${this.props.item.commitment_target_time}`
                      : `1 / ${this.props.addCommitmentReducer.target_time}`}
                  </Text>
                </View>
                {this.props.item ? (
                  this.props.item.commitment_type === 'DAILY_WEEKLY' ? (
                    <View style={styles.bottomCol}>
                      <Text style={styles.titleField}>Completed</Text>
                      <Text style={styles.fieldText}>
                        {this.props.item
                          ? this.props.item.commitment_process > this.props.item.commitment_target
                            ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
                            : this.props.item.unit === 'miles'
                            ? parseFloat(this.props.item.commitment_process.toString()).toFixed(0)
                            : parseFloat(this.props.item.commitment_process.toString()) / 0.000621371192
                          : 0}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.bottomCol}>
                      <Text style={styles.titleField}>Completed</Text>
                      <Text style={styles.fieldText}>
                        {this.props.item
                          ? this.props.item.commitment_process > this.props.item.commitment_target
                            ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
                            : this.props.item.unit === 'miles'
                            ? parseFloat(this.props.item.commitment_process.toString()).toFixed(0)
                            : parseFloat(this.props.item.commitment_process.toString()) / 0.000621371192
                          : this.props.addCommitmentReducer.target}
                      </Text>
                    </View>
                  )
                ) : (
                  <View style={styles.bottomCol}>
                    <Text style={styles.titleField}>Completed</Text>
                    <Text style={styles.fieldText}>0</Text>
                  </View>
                )}
                <View style={styles.bottomCol}>
                  <Text style={styles.titleField}>Goal</Text>
                  <Text style={styles.fieldText}>
                    {this.props.item
                      ? this.props.item.unit === 'miles'
                        ? parseFloat(this.props.item.commitment_target.toString()).toFixed(0)
                        : parseFloat(this.props.item.commitment_target.toString()) / 0.000621371192
                      : this.props.addCommitmentReducer
                      ? this.props.addCommitmentReducer.unit === 'miles'
                        ? parseFloat(this.props.addCommitmentReducer.target.toString()).toFixed(0)
                        : parseFloat(this.props.addCommitmentReducer.target.toString()) / 0.000621371192
                      : null}
                  </Text>
                </View>
              </View>
              {this.props.item ? null : <ButtonComponent onPress={this._continue} text="< Return" />}
            </View>
          </View>
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
        </View>
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
        <Modal isVisible={this.state.isModal} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Image source={require('@src/assets/images/Group414.png')} style={styles.headerImage} />
            <View style={common.flexColumn}>
              <Text style={[styles.titleModal]}>Running Pledges</Text>
              <Image style={styles.titleImageModal} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={styles.text}>
              In order to track the miles ran users must click the “Start Running” button in the commitment details
              screen
            </Text>
            <View style={styles.buttonContainer}>
              <ButtonComponent onPress={this.toggleModal} text="Okay" />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  addCommitmentReducer: state.screens.myCommitments.addCommitment,
  listProgressDetail: state.screens.myCommitments.list.listProgressDetail,
  listDetailCheckIn: state.screens.myCommitments.list.listDetailCheckIn,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({getListProgressDetailAction, getDetailCheckInAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinishOnBoardingComponent);
