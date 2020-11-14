import TitleComponent from '@src/containers/components/title';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps} from './propState';
import styles from './styles';

class FriendProgressComponent extends React.Component<IProps> {
  _goBack = () => Navigation.pop(this.props.componentId);
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
    }
  };

  _renderValueTextStandard = () => {
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

  _renderValueSingularTextStandard = () => {
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

  _renderGoalText = () => {
    if (this.props.item) {
      switch (this.props.item.goal_id) {
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

  render() {
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon5 name="chevron-left" size={ms(15)} />
            </TouchableOpacity>
          }
          centerComponent={<Text style={common.headerTitle}>Commitment details</Text>}
        />
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.boxContent}>
              <View style={styles.viewTitle}>
                <TitleComponent
                  title={`${this.props.username}'s commitment progress`}
                  width={90}
                  styleContainer={common.alignSeftCenter}
                  styleUnderLine={{top: -60}}
                  styleTitle={common.textCenter}
                />
                {/* <Text style={styles.title}>
                  {this.props.item.goal_id === 1
                    ? 'Burn Calories'
                    : this.props.item.goal_id === 2
                    ? 'Run'
                    : this.props.item.goal_id === 4
                    ? 'Step'
                    : this.props.item.goal_id === 5
                    ? 'Check into a location'
                    : 'Biking'}{' '}
                </Text> */}
                <Text style={common.textCenter}>
                  {this.props.item.goal_id === 1
                    ? 'Burning'
                    : this.props.item.goal_id === 2
                    ? 'Running'
                    : this.props.item.goal_id === 4
                    ? 'Walking'
                    : this.props.item.goal_id === 5
                    ? 'Visiting'
                    : 'Biking'}{' '}
                  {this.props.item.unit === 'meters'
                    ? (parseFloat(this.props.item.commitment_target) / 0.000621371192).toFixed(0)
                    : parseFloat(this.props.item.commitment_target).toFixed(0)}{' '}
                  {this.props.item.commitment_target > 1
                    ? this._renderValueTextStandard()
                    : this._renderValueSingularTextStandard()}{' '}
                  for the next {this.props.item.commitment_target_time}{' '}
                  {this.props.item.commitment_target_time > 1
                    ? this.props.item.commitment_target_time_unit.toLowerCase()
                    : this.props.item.commitment_target_time_unit
                        .toLowerCase()
                        .slice(0, this.props.item.commitment_target_time_unit.length - 1)}
                </Text>
                {/* <View style={styles.viewCircleFirst}> */}
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
                          : parseFloat(
                              ((this.props.item.count_finish / this.props.item.commitment_target_time) * 100).toFixed(
                                2,
                              ),
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
                      {this.props.item && parseInt(this.props.item.commitment_target.toString()) > 1
                        ? this._renderValueText()
                        : this._renderValueSingularText()}
                    </Text>
                    <Text style={styles.goalText}>
                      {this.props.item
                        ? this.props.item.commitment_type === 'STANDARD'
                          ? this.props.item.commitment_process > this.props.item.commitment_target
                            ? parseFloat(this.props.item.commitment_target).toFixed(0)
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
                            ? 100
                            : (
                                100 -
                                parseFloat(
                                  (
                                    (this.props.item.commitment_process / this.props.item.commitment_target) *
                                    100
                                  ).toFixed(2),
                                )
                              ).toFixed(0)
                          : 100 -
                            parseFloat(
                              ((this.props.item.count_finish / this.props.item.commitment_target_time) * 100).toFixed(
                                2,
                              ),
                            )
                        : 0}
                      %)
                    </Text>
                    {/* <Text style={common.mt10}>Goal</Text>
                    <Text style={styles.fontBold}>
                      {this.props.item
                        ? this.props.item.commitment_type === 'STANDARD'
                          ? this.props.item.unit === 'meters'
                            ? parseFloat(this.props.item.commitment_target) / 0.000621371192
                            : parseFloat(this.props.item.commitment_target).toFixed(0)
                          : this.props.item.commitment_target_time
                        : null}{' '}
                      {this.props.item && this.props.item.commitment_target > 1
                        ? this._renderValueText()
                        : this._renderValueSingularText()}
                    </Text> */}

                    {/* {this.props.item ? null : this.props.addCommitmentReducer.commitment_type === 'DAILY_WEEKLY' ? (
                  <Text>
                    per{' '}
                    {this.props.addCommitmentReducer.target_time_unit
                      .toLowerCase()
                      .slice(0, this.props.addCommitmentReducer.target_time_unit.length - 1)}
                  </Text>
                ) : null} */}
                    {/* </View> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendProgressComponent);
