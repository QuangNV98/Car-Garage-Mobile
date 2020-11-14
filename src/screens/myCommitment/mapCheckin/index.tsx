import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import * as geolib from 'geolib';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Modal from 'react-native-modal';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import {checkInLocationAction} from './redux/actions';
import styles from './styles';
import {isCheckInAction} from '@src/containers/redux/common/actions';

class ModalMapComponent extends React.Component<IProps> {
  state: IState = {
    locationName: '',
    locationPlaces: null,
    locationCompared: null,
    isModalVisible: false,
    checkIn: null,
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (state.isModalVisible !== props.isCheckIn) {
      return {
        isModalVisible: props.isCheckIn,
      };
    }
    return {
      isModalVisible: false,
    };
  }

  _gotoCheckin = async () => {
    const latitude = parseFloat(this.props.region.latitude.toString());
    const longitude = parseFloat(this.props.region.longitude.toString());
    const centerLatitude = parseFloat(this.props.item.latitude.toString());
    const centerLongitude = parseFloat(this.props.item.longitude.toString());
    const result = geolib.isPointWithinRadius(
      {latitude, longitude},
      {latitude: centerLatitude, longitude: centerLongitude},
      200,
    );
    if (result) {
      this.props.checkInLocationAction(this.props.item.id);
      this.setState({
        // isModalVisible: true,
        checkIn: true,
      });
    } else {
      this.props.isCheckInAction(true);
      this.setState({
        // isModalVisible: true,
        checkIn: false,
      });
    }
  };

  _goBack = () => {
    this.setState({
      isModalVisible: false,
    });
    Navigation.pop(this.props.componentId);
    this.props.isCheckInAction(false);
  };

  render() {
    return (
      <View style={[common.container, common.relative]}>
        <MapView
          region={this.props.region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsMyLocationButton={false}
          showsUserLocation={false}>
          <Marker coordinate={this.props.region}>
            <Image source={require('@src/assets/images/marker.png')} style={styles.markerSize} />
          </Marker>
          <Circle
            center={{
              latitude: parseFloat(this.props.region.latitude.toString()),
              longitude: parseFloat(this.props.region.longitude.toString()),
            }}
            radius={200}
            fillColor="rgba(83, 195, 146, 0.33)"
          />
        </MapView>
        <View style={styles.boxTop}>
          <InputComponent
            inputWrapStyle={common.px0}
            leftIconContainerStyle={styles.leftIcon}
            leftIcon="ios-arrow-back"
            leftIconType="ionicon"
            rightIcon="ios-mic"
            rightIconType="ionicon"
            rightIconContainerStyle={styles.rightIcon}
            rightIconStyle={styles.icon}
            autoCapitalize="none"
            leftIconStyle={styles.icon}
            placeholder="Select Location"
            value={this.props.item.location_name}
            leftIconOnPress={this._goBack}
          />
        </View>
        <View style={styles.boxBottom}>
          <View style={[common.flexRowCenter, common.mb15]}>
            <Icon type="entypo" name="location-pin" />
            <Text style={styles.textBoxBottom}>{this.props.item.location_name}</Text>
          </View>
          <ButtonComponent text="Check In" onPress={this._gotoCheckin} />
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalClose} onPress={this._goBack}>
              <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.silverTree} />
            </TouchableOpacity>
            {this.state.checkIn === true ? (
              <View style={common.flexColumnCenter}>
                <Image style={styles.img} source={require('@src/assets/images/like.png')} />
                <Text style={styles.modalTitle}>Check in confirmed!</Text>
                <Text style={styles.modalText}>Your habbit is getting stronger!</Text>
              </View>
            ) : null}
            {this.state.checkIn === false ? (
              <View style={common.flexColumnCenter}>
                <Image style={styles.img} source={require('@src/assets/images/oops.png')} />
                <Text style={styles.modalTitle}>Oops!</Text>
                <Text style={styles.modalText}>You need to be within 0.2 km of your location to check in</Text>
              </View>
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    isCheckIn: state.common.isCheckIn,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({checkInLocationAction, isCheckInAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapComponent);
