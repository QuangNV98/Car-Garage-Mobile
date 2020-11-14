import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {addCommitmentAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {colors, common} from '@src/styles';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import RNGooglePlaces from 'react-native-google-places';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {addCommitmentCheckInLocationScreen} from '../navigation';
import {IProps, IState} from './propState';
import styles from './styles';
import {ms} from '@src/styles/scalingUtils';

class ModalMapComponent extends React.Component<IProps> {
  state: IState = {
    locationName: '',
    region: {
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude,
      latitudeDelta: this.props.region.latitudeDelta,
      longitudeDelta: this.props.region.longitudeDelta,
    },
    locationPlaces: null,
    locationCompared: null,
    isModalVisible: false,
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  _gotoCheckin = () => {
    this.setState(
      {
        isModalVisible: false,
      },
      () => {
        addCommitmentCheckInLocationScreen(this.props.componentId, {
          locationName: this.state.locationName,
          region: this.state.region,
          target: this.props.target,
          target_time: this.props.target_time,
        });
      },
    );
  };

  _openSearchModal = async () => {
    try {
      const place = await RNGooglePlaces.openAutocompleteModal();
      this.setState((state) => ({
        ...state,
        region: {
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
        locationName: place.name,
      }));
    } catch (error) {
      if (error) {
        console.log(error, '1');

        return;
      }
    }
  };

  _goBack = () => {
    // Navigation.pop(this.props.componentId);
    addCommitmentCheckInLocationScreen(this.props.componentId, {
      locationName: this.props.locationName,
      region: this.state.region,
      target: this.props.target,
      target_time: this.props.target_time,
    });
  };

  setLatLng = (lat, lng, name) => {
    const latitude = parseFloat(lat.toString());
    const longitude = parseFloat(lng.toString());
    this.setState((state) => ({
      ...state,
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      locationName: name,
      isModalVisible: false,
    }));
  };

  renderCircle = () => {
    const renderComponent = [];
    if (this.state.locationPlaces) {
      this.state.locationPlaces.map((location, index) =>
        renderComponent.push(
          <Circle
            key={index}
            center={{
              latitude: parseFloat(location.latitude.toString()),
              longitude: parseFloat(location.longitude.toString()),
            }}
            radius={200}
            fillColor="rgba(83, 195, 146, 0.33)"
          />,
        ),
      );
    }

    return renderComponent;
  };

  clearDataLocation = () => {
    this.setState({
      locationName: '',
      region: {
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude,
        latitudeDelta: this.props.region.latitudeDelta,
        longitudeDelta: this.props.region.longitudeDelta,
      },
      locationPlaces: null,
      locationCompared: null,
      isModalVisible: false,
    });
  };

  render() {
    return (
      <View style={[common.container, common.relative]}>
        <MapView
          region={this.state.region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={false}
          followsUserLocation={true}>
          <Marker coordinate={this.state.region}>
            <Image source={require('@src/assets/images/marker.png')} style={styles.markerSize} />
          </Marker>
          {this.renderCircle()}
        </MapView>
        <View style={styles.boxTop}>
          <View style={styles.selectLocation}>
            <View style={styles.selectLocationLeft}>
              {!this.state.locationName ? (
                <TouchableOpacity onPress={this._goBack} style={styles.btnBack}>
                  <Icon type="ionicon" name="ios-arrow-back" />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity style={styles.searchButton} onPress={this._openSearchModal}>
                <Text style={styles.selectLocationText}>{this.state.locationName || 'Select Location'}</Text>
              </TouchableOpacity>
              {this.state.locationName ? (
                <TouchableOpacity style={styles.btnClose} onPress={this.clearDataLocation}>
                  <Icon type="ionicon" name="ios-close" size={ms(30)} color={colors.silverTree} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {this.state.locationName ? (
          <View style={styles.boxBottom}>
            <View style={[common.flexRowCenter, common.mb0]}>
              <Icon type="entypo" name="location-pin" />
              <Text style={styles.textBoxBottom}>{this.state.locationName}</Text>
            </View>
            <ButtonComponent text="Confirm Location" onPress={this._gotoCheckin} />
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  addCommitment: state.screens.myCommitments.addCommitment,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({addCommitmentAction, offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapComponent);
