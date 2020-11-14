import {configServices} from '@src/utils';
import Config from 'react-native-config';

export const createNewPassword = async (email: string, new_password: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/create_new_password', {
      client_id: Config.CLIENT_ID,
      email,
      new_password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
