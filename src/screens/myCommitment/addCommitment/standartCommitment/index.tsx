import DateTimePicker from '@react-native-community/datetimepicker';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {chooseGoalAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {colors, common} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import moment from 'moment';
import React, {Fragment} from 'react';
import {Alert, Image, Modal, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {addCommitmentDailyWeeklyCongratulationScreen} from '../congratulations/navigation';
import {IProps, IState} from './propState';
import styles from './styles';

class StandartCommitmentComponent extends React.Component<IProps> {
  target: TextInput;
  target_time: TextInput;

  state: IState = {
    target: null,
    target_time: null,
    target_time_unit: System.DATA_DATE[0].id,
    unit: System.DATA_UNIT[0].id,
    lat: null,
    lng: null,
    locationName: '',
    isShowSetupCommit: false,
    modalStatus: false,
    region: {
      latitude: 21.0227387,
      longitude: 105.8194541,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    },
    showModalDateOfBirth: false,
    startDate: null,
    confirmDate: new Date(),
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: Number(evt)});

  _renderGoalText = () => {
    switch (this.props.chooseGoal) {
      case 1:
        return 'burn';
      case 2:
        return 'run';
      case 3:
        return 'bike';
      case 4:
        return 'walk';
      case 5:
        return 'visit the location';
      default:
        return '';
    }
  };

  _renderValueText = () => {
    switch (this.props.chooseGoal) {
      case 1:
        return 'calories';
      case 2:
        return this.state.unit;
      case 3:
        return this.state.unit;
      case 4:
        return 'steps';
      case 5:
        return 'times';
      default:
        return '';
    }
  };

  _renderValueSingularText = () => {
    switch (this.props.chooseGoal) {
      case 1:
        return 'calories';
      case 2:
        return this.state.unit.slice(0, this.state.unit.length - 1);
      case 3:
        return this.state.unit.slice(0, this.state.unit.length - 1);
      case 4:
        return 'step';
      case 5:
        return 'time';
      default:
        return '';
    }
  };

  chooseTargetTimeUnit = (unit) => {
    this.setState({
      target_time_unit: unit,
    });
  };

  chooseTargetUnit = (unit) => {
    this.setState({
      unit,
    });
  };

  _validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;
    if (!this.state.target_time || this.state.target_time === 0) {
      isValid = 'All fields are required!';
      controlFocus = this.target_time;
    }
    if (!this.state.target || this.state.target === 0) {
      isValid = 'All fields are required!';
      controlFocus = this.target;
    }
    if (this.props.chooseGoal === -1) {
      isValid = 'Please choose goal!';
    }
    return {isValid, controlFocus};
  };

  _gotoCongrat = () => {
    const {isValid, controlFocus} = this._validate();
    let {target} = this.state;
    if (this.state.unit === 'meters') {
      target = target * 0.000621371192;
    }
    if (!isValid) {
      this.props.chooseGoalAction(
        this.props.chooseGoal,
        target,
        this.state.target_time,
        this.state.target_time_unit,
        this.state.lat,
        this.state.lng,
        this.state.locationName,
        System.COMMITMENT_TYPE.STANDARD,
        moment(this.state.confirmDate).utc().toDate(),
        this.state.unit,
      );
      addCommitmentDailyWeeklyCongratulationScreen(this.props.componentId, {
        commitment_type: System.COMMITMENT_TYPE.STANDARD,
      });
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  toggleStartDateModal = () => {
    this.setState({
      showModalDateOfBirth: !this.state.showModalDateOfBirth,
    });
  };

  onDateChange = (event, selectedDate) => {
    this.setState({startDate: selectedDate});
  };

  saveDate = () => {
    if (!this.state.startDate) {
      this.setState({
        confirmDate: new Date(),
        showModalDateOfBirth: !this.state.showModalDateOfBirth,
      });
    } else {
      this.setState({
        confirmDate: this.state.startDate,
        showModalDateOfBirth: !this.state.showModalDateOfBirth,
      });
    }
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  render() {
    return (
      <Fragment>
        <HeaderAddCommitmentComponent
          hasBackButton={true}
          _goBack={this._goBack}
          nameButton="Change guidelines"
          step={3}
          componentId={this.props.componentId}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.viewTitleContainer}>
              <View style={styles.viewTitle}>
                <Text style={styles.title}>Standard</Text>
                <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
                <Text style={styles.title}>pledge</Text>
              </View>
              <Image
                style={styles.titleImgRight}
                source={
                  this.props.chooseGoal === 1
                    ? require('@src/assets/images/Group273.png')
                    : this.props.chooseGoal === 2
                    ? require('@src/assets/images/Group256.png')
                    : this.props.chooseGoal === 3
                    ? require('@src/assets/images/Group269.png')
                    : require('@src/assets/images/Group270.png')
                }
              />
            </View>
            <View style={styles.viewContent}>
              <Text>I Pledge to {this._renderGoalText()}</Text>
              <View style={styles.viewInputGroup}>
                <InputComponent
                  autoCapitalize="none"
                  placeholder={this._renderValueText()}
                  onChangeText={this._onChangeText('target')}
                  value={this.state.target ? this.state.target.toString() : ''}
                  keyboardType="number-pad"
                  inputStyle={common.textCenter}
                  containerStyle={styles.w_120}
                  maxLength={8}
                />

                {this.props.chooseGoal === 2 || this.props.chooseGoal === 3 ? (
                  <View style={common.flexRowCenter}>
                    <View style={[styles.switchSmall]}>
                      <TouchableOpacity
                        style={
                          this.state.unit === 'miles'
                            ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                            : [styles.switchThumb]
                        }
                        onPress={() => this.chooseTargetUnit('miles')}>
                        <Text
                          style={
                            this.state.unit === 'miles'
                              ? [styles.switchTextSmall, styles.switchTextSmallActive]
                              : [styles.switchTextSmall]
                          }>
                          {this.state.target > 1 ? 'miles' : 'mile'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          this.state.unit === 'meters'
                            ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                            : [styles.switchThumb]
                        }
                        onPress={() => this.chooseTargetUnit('meters')}>
                        <Text
                          style={
                            this.state.unit === 'meters'
                              ? [styles.switchTextSmall, styles.switchTextSmallActive]
                              : [styles.switchTextSmall]
                          }>
                          {this.state.target > 1 ? 'meters' : 'meter'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.viewInputGroupText}>
                      {this.state.target > 1 ? this._renderValueText() : this._renderValueSingularText()} in
                    </Text>
                    <InputComponent
                      autoCapitalize="none"
                      placeholder={this.state.target_time_unit.toLowerCase()}
                      onChangeText={this._onChangeText('target_time')}
                      value={this.state.target_time ? this.state.target_time.toString() : ''}
                      keyboardType="number-pad"
                      inputStyle={common.textCenter}
                      containerStyle={styles.w_100}
                    />
                  </>
                )}
              </View>
              {/* <View style={common.flexRowCenter}> */}
              <View
                style={
                  this.props.chooseGoal === 2 || this.props.chooseGoal === 3
                    ? styles.viewInputGroup
                    : common.flexRowCenter
                }>
                {this.props.chooseGoal === 2 || this.props.chooseGoal === 3 ? (
                  <Text style={{marginTop: vs(20), marginRight: vs(-30)}}>in</Text>
                ) : null}
                {this.props.chooseGoal === 2 || this.props.chooseGoal === 3 ? (
                  <>
                    <InputComponent
                      autoCapitalize="none"
                      placeholder={this.state.target_time_unit.toLowerCase()}
                      onChangeText={this._onChangeText('target_time')}
                      value={this.state.target_time ? this.state.target_time.toString() : ''}
                      keyboardType="number-pad"
                      inputStyle={common.textCenter}
                      containerStyle={styles.w_100}
                    />
                    <View style={styles.switchSmall}>
                      <TouchableOpacity
                        style={
                          this.state.target_time_unit === 'DAYS'
                            ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                            : [styles.switchThumb]
                        }
                        onPress={() => this.chooseTargetTimeUnit('DAYS')}>
                        <Text
                          style={
                            this.state.target_time_unit === 'DAYS'
                              ? [styles.switchTextSmall, styles.switchTextSmallActive]
                              : styles.switchTextSmall
                          }>
                          {this.state.target_time > 1 ? 'days' : 'day'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          this.state.target_time_unit === 'WEEKS'
                            ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                            : [styles.switchThumb]
                        }
                        onPress={() => this.chooseTargetTimeUnit('WEEKS')}>
                        <Text
                          style={
                            this.state.target_time_unit === 'WEEKS'
                              ? [styles.switchTextSmall, styles.switchTextSmallActive]
                              : styles.switchTextSmall
                          }>
                          {this.state.target_time > 1 ? 'weeks' : 'week'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={styles.switchSmall}>
                    <TouchableOpacity
                      style={
                        this.state.target_time_unit === 'DAYS'
                          ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                          : [styles.switchThumb]
                      }
                      onPress={() => this.chooseTargetTimeUnit('DAYS')}>
                      <Text
                        style={
                          this.state.target_time_unit === 'DAYS'
                            ? [styles.switchTextSmall, styles.switchTextSmallActive]
                            : styles.switchTextSmall
                        }>
                        {this.state.target_time > 1 ? 'days' : 'day'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        this.state.target_time_unit === 'WEEKS'
                          ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                          : [styles.switchThumb]
                      }
                      onPress={() => this.chooseTargetTimeUnit('WEEKS')}>
                      <Text
                        style={
                          this.state.target_time_unit === 'WEEKS'
                            ? [styles.switchTextSmall, styles.switchTextSmallActive]
                            : styles.switchTextSmall
                        }>
                        {this.state.target_time > 1 ? 'weeks' : 'week'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* </View> */}
              </View>
              <View style={[common.mt20, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                <Text>Choose your start date</Text>
                <TouchableOpacity style={styles.btnStartDate} onPress={this.toggleStartDateModal}>
                  <Text>
                    {this.state.confirmDate
                      ? moment(this.state.confirmDate).format('MMM DD, YYYY')
                      : moment(new Date()).format('MMM DD, YYYY')}
                  </Text>
                  <Icon style={styles.iconStartDate} name="chevron-down" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapBtn}>
              {/* <ButtonComponent text="Change goal" clear={true} onPress={this._goBack} /> */}
              <ButtonComponent text="Next" onPress={this._gotoCongrat} />
            </View>
          </View>
          <Modal animationType="fade" transparent={true} visible={this.state.showModalDateOfBirth}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalBtnClose} onPress={this.toggleStartDateModal}>
                  <Icon name="times" size={ms(20)} color={colors.silverTree} />
                </TouchableOpacity>
                <Text style={styles.modalTile}>Start Date</Text>
                <DateTimePicker
                  value={this.state.startDate ? this.state.startDate : new Date()}
                  mode="date"
                  locale="en"
                  onChange={this.onDateChange}
                  minimumDate={new Date()}
                />
                <ButtonComponent text="Save" onPress={this.saveDate} />
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({chooseGoalAction}, dispatch);

export default connect(null, mapDispatchToProps)(StandartCommitmentComponent);
