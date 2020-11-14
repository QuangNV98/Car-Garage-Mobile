import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {addCommitmentDailyWeeklyCongratulationScreen} from '@src/screens/myCommitment/addCommitment/congratulations/navigation';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {chooseGoalAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {colors, common} from '@src/styles';
import React, {Fragment} from 'react';
import {Alert, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {addCommitmentCheckInLocationMapScreen} from './modalMap/navigation';
import {IProps, IState} from './propState';
import styles from './styles';
import moment from 'moment';

class CheckInLocationComponent extends React.Component<IProps> {
  target: TextInput;
  target_time: TextInput;

  state: IState = {
    target: this.props.target ? this.props.target : null,
    target_time: this.props.target_time ? this.props.target_time : null,
    target_time_unit: System.DATA_DATE[0].id,
    lat: this.props.region.latitude,
    lng: this.props.region.longitude,
    locationName: this.props.locationName,
    isShowSetupCommit: false,
    modalStatus: false,
    region: {
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude,
      latitudeDelta: this.props.region.latitudeDelta,
      longitudeDelta: this.props.region.longitudeDelta,
    },
  };

  chooseTargetUnit = (unit) => {
    this.setState({
      target_time_unit: unit,
    });
  };

  _validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;
    if (!this.state.target_time || parseInt(this.state.target_time.toString()) === 0) {
      isValid = 'All fields are required!';
      controlFocus = this.target_time;
    }
    if (!this.state.target || parseInt(this.state.target.toString()) === 0) {
      isValid = 'All fields are required!';
      controlFocus = this.target;
    }
    if (!this.state.locationName) {
      isValid = 'Please search the Check-in Location';
    }
    if (this.state.target > 3 * this.state.target_time && this.state.target_time_unit === 'DAYS') {
      isValid = 'You can only checkin maximum 3 times a day';
    }
    if (this.state.target > 21 * this.state.target_time && this.state.target_time_unit === 'WEEKS') {
      isValid = 'You can only checkin maximum 3 times a day';
    }
    return {isValid, controlFocus};
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: Number(evt)});

  _gotoMap = () => {
    addCommitmentCheckInLocationMapScreen(this.props.componentId, {
      locationName: this.state.locationName,
      region: this.props.region,
      target: this.state.target,
      target_time: this.state.target_time,
    });
  };

  _goToCongrats = () => {
    const {isValid, controlFocus} = this._validate();
    if (!isValid) {
      this.props.chooseGoalAction(
        5,
        this.state.target,
        this.state.target_time,
        this.state.target_time_unit,
        this.state.lat,
        this.state.lng,
        this.state.locationName,
        System.COMMITMENT_TYPE.STANDARD,
        moment(new Date()).utc().toDate(),
        System.DATA_UNIT[0].id,
      );
      addCommitmentDailyWeeklyCongratulationScreen(this.props.componentId);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _goBack = () => Navigation.popTo('app.my_commitment.choose_goal');

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
                <Text style={styles.title}>Set your Pledge guidelines</Text>
                <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
              </View>
              <Image style={styles.titleImgRight} source={require('@src/assets/images/Group272.png')} />
            </View>
            <View style={[common.m_hori_10]}>
              <Text style={styles.textForm}>I Pledge to Physically visit</Text>
              <View style={common.mt10}>
                <TouchableOpacity style={styles.selectLocation} onPress={this._gotoMap}>
                  <Icon type="entypo" name="location-pin" color={colors.darkGray} />
                  <Text style={this.state.locationName ? styles.selectSearchedLocationText : styles.selectLocationText}>
                    {this.state.locationName ? this.state.locationName : 'Select Location'}
                  </Text>
                </TouchableOpacity>
                <View style={[styles.rowForm, common.mb20]}>
                  <InputComponent
                    autoCapitalize="none"
                    placeholder="times"
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this._onChangeText('target')}
                    value={this.state.target ? this.state.target.toString() : ''}
                    inputWrapStyle={styles.inputWrapStyle}
                    inputStyle={styles.inputStyle}
                    keyboardType="number-pad"
                  />
                  <Text style={styles.textTime}>{this.state.target > 1 ? 'times' : 'time'} in</Text>
                  <InputComponent
                    autoCapitalize="none"
                    placeholder={this.state.target_time_unit.toLowerCase()}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this._onChangeText('target_time')}
                    value={this.state.target_time ? this.state.target_time.toString() : ''}
                    inputWrapStyle={styles.inputWrapStyle}
                    inputStyle={styles.inputStyle}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
              <View style={common.flexRowCenter}>
                <View style={styles.switch}>
                  <TouchableOpacity
                    style={
                      this.state.target_time_unit === 'DAYS'
                        ? [styles.switchThumb, styles.switchThumbActive]
                        : [styles.switchThumb]
                    }
                    onPress={() => this.chooseTargetUnit('DAYS')}>
                    <Text
                      style={
                        this.state.target_time_unit === 'DAYS'
                          ? [styles.switchText, styles.switchTextActive]
                          : styles.switchText
                      }>
                      {this.state.target_time > 1 ? 'days' : 'day'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      this.state.target_time_unit === 'WEEKS'
                        ? [styles.switchThumb, styles.switchThumbActive]
                        : [styles.switchThumb]
                    }
                    onPress={() => this.chooseTargetUnit('WEEKS')}>
                    <Text
                      style={
                        this.state.target_time_unit === 'WEEKS'
                          ? [styles.switchText, styles.switchTextActive]
                          : styles.switchText
                      }>
                      {this.state.target_time > 1 ? 'weeks' : 'week'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.wrapBtn}>
              {/* <ButtonComponent text="Change goal" clear={true} onPress={this._goBack} /> */}
              <ButtonComponent text="Next" onPress={this._goToCongrats} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({chooseGoalAction}, dispatch);

export default connect(null, mapDispatchToProps)(CheckInLocationComponent);
