import {configServices} from '@src/utils';

export const updateFCMToken = async (ID: number, FCM_TOKEN: string) => {
  try {
    const body = {
      ID,
      FCM_TOKEN,
    };
    console.log(body, '1');
    const response = await configServices.postService('api/updateCustomerToken', body, true);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNotification = async (ID: number) => {
  try {
    const body = {
      ID,
    };
    console.log(body, '1');
    const response = await configServices.getService('api/getListNotificationById', body, true);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
