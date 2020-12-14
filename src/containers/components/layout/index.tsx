import AsyncStorage from '@react-native-community/async-storage';
import system from '@src/constant/system';
import React, {ReactNode, useEffect} from 'react';

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     getFcmToken();
  //   }
  // };

  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   if (fcmToken) {
  //     await AsyncStorage.setItem(system.FCM_TOKEN, fcmToken);
  //   } else {
  //     console.log('Failed', 'No token received');
  //   }
  // };

  // return <>{props.children}</>;
};

export default Layout;
