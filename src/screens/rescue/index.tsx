import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {logOutAction} from '@src/containers/redux/common/actions';
import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {ActivityIndicator, Alert, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {callSos} from './services';
import {APP_SOS_SCREEN} from './navigation';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import Geolocation, {GeolocationError, GeolocationResponse} from '@react-native-community/geolocation';
class RescueComponent extends React.Component<IProps> {
  state: IState = {
    region: null,
  };

  async componentWillMount() {
    this.setState({
      region: this.props.region,
    });
  }

  getCurrentPosition = () => {
    try {
      return new Promise(
        (resolve: (position: GeolocationResponse) => void, reject: (error: GeolocationError) => void) => {
          Geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 150,
          });
        },
      );
    } catch (error) {
      console.log(error, 'err');
      throw error;
    }
  };

  _callSos = async () => {
    const user = await AsyncStorage.getItem(System.USER_INFO);

    const result = await callSos(JSON.parse(user).ID, this.state.region.latitude, this.state.region.longitude);
    if (result) {
      Alert.alert('Notification', result);
    }
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
        <BottomTabNavigation componentId={this.props.componentId} activeTab={APP_SOS_SCREEN} />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logOutAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RescueComponent);
