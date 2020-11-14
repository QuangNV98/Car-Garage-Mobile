import AsyncStorage from '@react-native-community/async-storage';
import config from '@src/constant/config';
import system from '@src/constant/system';
import {configServices} from '@src/utils';

export const checkLogin = async (username: string, password: string) => {
  try {
    const fcm_token = await AsyncStorage.getItem(system.FCM_TOKEN);
    const body = {
      username,
      password,
      grant_type: 'password',
      client_id: config.CLIENT_ID,
      client_secret: 'password',
      scope: 'offline_access',
      fcm_token,
    };
    const response = await configServices.postService('api/v1/oauth/token', body, false);
    return response;
  } catch (error) {
    throw error;
  }
};
