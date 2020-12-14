import {configServices} from '@src/utils';

export const getAccountInfor = async (USERNAME) => {
  try {
    const response = await configServices.getService('api/getInfoCustomerAfterLogin', {USERNAME});
    console.log(response, 'response.data');
    return response;
  } catch (error) {
    console.log(error, 'error');
    throw error;
  }
};
