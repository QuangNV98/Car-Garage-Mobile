import {configServices} from '@src/utils';

export const updateFCMToken = async (ID: number, FCM_TOKEN: string) => {
  try {
    const body = {
      ID,
      FCM_TOKEN,
    };
    const response = await configServices.postService('api/updateCustomerToken', body, true);
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

    const response = await configServices.getService('api/getListNotificationById', body, true);

    return response;
  } catch (error) {
    throw error;
  }
};
