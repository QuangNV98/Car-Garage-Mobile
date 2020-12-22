import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {logOutAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React, {Fragment} from 'react';
import {ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {rootLoginScreen} from '../accounts/signin/navigation';
import {myProfileAccountSettingScreen} from './accountSettings';
import {myProfileConnectHealthkitScreen} from './connectHealthkit';
import {myProfileInviteFriendScreen} from './inviteFriends';
import {myProfilePaymentScreen} from './payment';
import {myProfilePersonalDataScreen} from './peronalData';
import {IProps, IState} from './propState';
import styles from './styles';
import {myProfileSupportScreen} from './support';
import {myProfileTAndCScreen} from './tAndC';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {location, permission} from '@src/utils/index';
import {callSos} from './services';
import {APP_PROFILE_SCREEN} from './navigation';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAJoeG8PoyedNXBowwRUFHLrXc43yeVLPw';

class MyProfileComponent extends React.Component<IProps> {
  state: IState = {
    avatar_img: this.props.avatar_img,
    showConfirmLogout: false,
    region: null,
  };

  async componentDidMount() {
    const checkPermission = await permission.permissionMap();
    if (checkPermission) {
      const getLocation = await location.getCurrentPosition();
      const region = {
        latitude: getLocation.coords.latitude,
        longitude: getLocation.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      this.setState({region});
    }
  }

  list = [
    {
      title: 'Account Settings',
      icon: 'user',
      onPress: () => myProfileAccountSettingScreen(this.props.componentId),
    },
    {
      title: 'Invite Friends',
      icon: 'user-plus',
      onPress: () => myProfileInviteFriendScreen(this.props.componentId),
    },
    {
      title: 'Personal Data',
      icon: 'cog',
      onPress: () => myProfilePersonalDataScreen(this.props.componentId),
    },
    {
      title: 'Payment',
      icon: 'cc-stripe',
      onPress: () => myProfilePaymentScreen(this.props.componentId),
    },
    {
      title: 'Connect to Apple Health',
      icon: 'apple',
      onPress: () => myProfileConnectHealthkitScreen(this.props.componentId),
    },
    {
      title: 'Support',
      icon: 'question-circle',
      onPress: () => myProfileSupportScreen(this.props.componentId),
    },
    {
      title: 'Terms & Conditions',
      icon: 'file-alt',
      onPress: () => myProfileTAndCScreen(this.props.componentId),
    },
  ];

  _signout = () => {
    this.setState({showConfirmLogout: false}, async () => {
      this.props.logOutAction();
      AsyncStorage.setItem(System.PASS_STARTED, 'passed');
      await BackgroundTimer.stopBackgroundTimer();
      rootLoginScreen();
    });
  };

  _toggleModalLogout = () => {
    this.setState({showConfirmLogout: !this.state.showConfirmLogout});
  };

  _callSos = async () => {
    const user = await AsyncStorage.getItem(System.USER_INFO);

    const result = await callSos(JSON.parse(user).ID, this.state.region.latitude, this.state.region.longitude);
  };

  render() {
    return (
      <>
        {this.state.region ? (
          <>
            <MapView
              initialRegion={this.state.region}
              region={this.state.region}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsMyLocationButton={false}
              showsUserLocation={false}>
              <Marker coordinate={this.state.region}>
                <Image source={require('@src/assets/images/marker.png')} style={styles.markerSize} />
              </Marker>
            </MapView>
          </>
        ) : (
          <ActivityIndicator style={styles.map} />
        )}

        <ButtonComponent
          styleContainer={{marginTop: 32}}
          styleButton={{backgroundColor: colors.red, borderColor: 'transparent'}}
          styleText={{fontSize: ms(13)}}
          text="S.O.S"
          onPress={this._callSos}
        />
        <BottomTabNavigation componentId={this.props.componentId} activeTab={APP_PROFILE_SCREEN} />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  avatar_img: state.account.avatar,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logOutAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
