import {configServices} from '@src/utils';

export const getAccountInfor = async (USERNAME) => {
  try {
    const response = await configServices.getService('api/getInfoCustomerAfterLogin', {USERNAME});
    return response;
  } catch (error) {
    throw error;
  }
};
