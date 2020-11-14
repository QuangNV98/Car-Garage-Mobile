import {System} from '@src/constant';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {chooseGoalAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {common} from '@src/styles';
import {location, permission} from '@src/utils/index';
import React, {Fragment} from 'react';
import {Alert, Image, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {addCommitmentCheckInLocationScreen} from '../checkInLocation/navigation';
import {addCommitmentChooseGoalGuidelineScreen} from '../chooseGoalGuidelines';
import {addCommitmentContractScreen} from '../contracts/navigation';
import {IProps, IState} from './propState';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import {ms} from '@src/styles/scalingUtils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {clearAddCommitmentAction} from '@src/containers/redux/common/actions';

class ChooseGoalComponent extends React.Component<IProps> {
  target: TextInput;
  target_time: TextInput;

  state: IState = {
    chooseGoal: -1,
    target: null,
    target_time: null,
    target_time_unit: System.DATA_DATE[0].id,
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
  };

  _showHideModal = () =>
    this.setState({
      modalStatus: !this.state.modalStatus,
      chooseGoal: -1,
      isShowSetupCommit: false,
      locationName: '',
    });

  _goalOnValueChange = async (value: string | number) => {
    try {
      let isShowSetupCommit = false;
      let modalStatus = false;
      let region = {
        latitude: 21.0227387,
        longitude: 105.8194541,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      if (value !== -1) {
        isShowSetupCommit = true;
        if (value === 5) {
          const checkPermission = await permission.permissionMap();
          if (checkPermission) {
            modalStatus = true;
            const getLocation = await location.getCurrentPosition();
            region = {
              latitude: getLocation.coords.latitude,
              longitude: getLocation.coords.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            };
          }
        }
      }
      this.setState({
        chooseGoal: value,
        isShowSetupCommit,
        modalStatus,
        region,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  _onChangeNumber = (state: string) => (evt: any) => this.setState({[state]: Number(evt)});

  _selectLocation = (lat: number, lng: number, locationName: string) =>
    this.setState({
      modalStatus: !this.state.modalStatus,
      lat,
      lng,
      locationName,
    });

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
    if (this.state.chooseGoal === -1) {
      isValid = 'Please choose goal!';
    }
    return {isValid, controlFocus};
  };

  _continue = () => {
    const {isValid, controlFocus} = this._validate();
    if (!isValid) {
      this.props.chooseGoalAction(
        this.state.chooseGoal,
        this.state.target,
        this.state.target_time,
        this.state.target_time_unit,
        this.state.lat,
        this.state.lng,
      );
      addCommitmentContractScreen(this.props.componentId);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _gotoGoalGuidelines = (chooseGoal) => {
    const isModal = chooseGoal === 1 ? true : chooseGoal === 3 ? true : false;
    this.props.clearAddCommitmentAction();
    addCommitmentChooseGoalGuidelineScreen(this.props.componentId, {chooseGoal, isModal});
  };
  _gotoCheckInLocaton = async () => {
    permission.permissionMap();
    const getLocation = await location.getCurrentPosition();
    const region = {
      latitude: getLocation.coords.latitude,
      longitude: getLocation.coords.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    };
    this.props.clearAddCommitmentAction();
    addCommitmentCheckInLocationScreen(this.props.componentId, {region});
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  render() {
    return (
      <Fragment>
        {/* <HeaderAddCommitmentComponent step={1} /> */}
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon name="chevron-left" size={ms(20)} />
            </TouchableOpacity>
          }
        />
        <View style={styles.viewTitle}>
          <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
          <Text style={styles.title}>Choose your Pledge</Text>
        </View>
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <TouchableOpacity style={styles.item} onPress={() => this._gotoGoalGuidelines(2)}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>Outside Run</Text>
                <Text style={styles.itemText}>To increase endurance</Text>
              </View>
              <Image style={styles.imgRight} source={require('@src/assets/images/Group256.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => this._gotoGoalGuidelines(4)}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>Steps</Text>
                <Text style={styles.itemText}>To get active daily</Text>
              </View>
              <Image style={styles.imgRight} source={require('@src/assets/images/Group270.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => this._gotoGoalGuidelines(1)}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>Burn Calories</Text>
                <Text style={styles.itemText}>To lose weight & tone up</Text>
              </View>
              <Image style={styles.imgRight} source={require('@src/assets/images/Group273.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => this._gotoGoalGuidelines(3)}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>Biking</Text>
                <Text style={styles.itemText}>To explore far and wide</Text>
              </View>
              <Image style={styles.imgRight} source={require('@src/assets/images/Group269.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={this._gotoCheckInLocaton}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>Check into a location</Text>
                <Text style={styles.itemText}>To build healty habits</Text>
              </View>
              <Image style={styles.imgRight} source={require('@src/assets/images/Group272.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({chooseGoalAction, clearAddCommitmentAction}, dispatch);

export default connect(null, mapDispatchToProps)(ChooseGoalComponent);
