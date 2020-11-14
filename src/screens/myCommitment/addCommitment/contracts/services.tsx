import config from '@src/constant/config';
import {configServices} from '@src/utils';
import {System} from '@src/constant';

export const getFriendById = async () => {
  try {
    const response = await configServices.getService('api/v1/accounts/getFriendById');
    return response.data;
  } catch (error) {
    if (error.response.status === System.RESPONSE_STATUS.NOT_FOUND) {
      return {message: 'Server is busy'};
    }
    if (error.response.status === System.RESPONSE_STATUS.INTERVAL_SERVER) {
      return {message: 'Server is error'};
    }
  }
};

export const getAccountByEmail = async (email) => {
  try {
    const response = await configServices.getService('api/v1/accounts/getAccountByEmail', {email});
    return response.data;
  } catch (error) {
    throw error;
  }
};
