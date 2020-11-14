import config from '@src/constant/config';
import {configServices} from '@src/utils';
import {System} from '@src/constant';

export const getListLocationCheckIn = async () => {
  try {
    return await configServices.getService('api/v1/commitments/list_location_checkin_account');
  } catch (error) {
    throw error.response.data;
  }
};
