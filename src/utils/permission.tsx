import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const permissionMap = async () => {
  const fnGoSetting = () => {
    Alert.alert(
      'Location access',
      'App needs permission to access your location, open Permissions -> Location -> Allow all the time',
      [
        {text: 'Go to Setting', onPress: () => Linking.openSettings()},
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };
  if (Platform.OS === 'ios') {
    const checkLocationAlwayIos = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    const checkLocationWhenInUseIos = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (checkLocationAlwayIos === RESULTS.GRANTED || checkLocationWhenInUseIos === RESULTS.GRANTED) {
      return true;
    } else if (checkLocationAlwayIos === RESULTS.BLOCKED || checkLocationWhenInUseIos === RESULTS.BLOCKED) {
      fnGoSetting();
      return false;
    } else {
      const requestLocationAlwayIos = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const requestLocationWhenInUserIos = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (requestLocationAlwayIos === RESULTS.GRANTED || requestLocationWhenInUserIos === RESULTS.GRANTED) {
        return true;
      } else if (requestLocationAlwayIos === RESULTS.BLOCKED || requestLocationWhenInUserIos === RESULTS.BLOCKED) {
        fnGoSetting();
        return false;
      } else if (requestLocationAlwayIos === RESULTS.DENIED || requestLocationWhenInUserIos === RESULTS.DENIED) {
        Alert.alert('Location access', 'App needs permission to access your location');
        return false;
      }
    }
  } else {
    const checkLocationAndroid = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (checkLocationAndroid) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        fnGoSetting();
        return false;
      default:
        const requestLocationAndroid = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (requestLocationAndroid === RESULTS.GRANTED) {
          return true;
        } else if (requestLocationAndroid === RESULTS.BLOCKED) {
          fnGoSetting();
          return false;
        } else if (requestLocationAndroid === RESULTS.DENIED) {
          Alert.alert('Location access', 'App needs permission to access your location');
          return false;
        }
    }
  }
};

export default {permissionMap};
