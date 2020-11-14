import {Alert, Dimensions, Platform} from 'react-native';
import appleHealthKit from './appleHealthKit';
import configServices from './configServices';
import location from './location';
import {getMimeTypes} from './mimeTypes';
import permission from './permission';
import validation from './validation';
import {Navigation} from 'react-native-navigation';

/** Check device IPhoneX */
const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
};

const isIphonePlus = () => {
  const dimen = Dimensions.get('window');
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (dimen.height === 736 || dimen.width === 736);
};

const isIphoneMax = () => {
  const dimen = Dimensions.get('window');
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (dimen.height === 896 || dimen.width === 896);
};

const ifIphoneX = (iphoneXStyle: any, regularStyle: any) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

const ifIphonePlus = (iphonePlusStyle: any, regularStyle: any) => {
  if (isIphonePlus()) {
    return iphonePlusStyle;
  }
  return regularStyle;
};

const ifIphoneMax = (iphonePlusStyle: any, regularStyle: any) => {
  if (isIphoneMax()) {
    return iphonePlusStyle;
  }
  return regularStyle;
};

const logError = (message: string) => Alert.alert('Error', message, [{text: 'OK', style: 'cancel'}]);

const logErrorCheckIn = (message: string) =>
  Alert.alert('Warning', message, [
    {
      text: 'OK',
      style: 'cancel',
      onPress: () => {
        Navigation.pop('app.my_commitment.map_checkin');
      },
    },
  ]);

export {
  getMimeTypes,
  appleHealthKit,
  configServices,
  validation,
  isIphoneX,
  ifIphoneX,
  ifIphonePlus,
  isIphonePlus,
  ifIphoneMax,
  isIphoneMax,
  location,
  permission,
  logError,
  logErrorCheckIn,
};
