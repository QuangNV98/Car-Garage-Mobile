import { configServices } from '@src/utils';

export const getListNotifications = async () => {
  try {
    return await configServices.getService('api/v1/notifications/get_list_notifications', null);
  } catch (error) {
    throw error;
  }
};

export const payoutBet = async (commitment_id: number, email_receiver: string) => {
  try {
    return await configServices.postService('api/v1/payments/payout', {commitment_id, email_receiver});
  } catch (error) {
    throw error;
  }
};

export const updateSeenNotifications = async () => {
  try {
    return await configServices.postService('api/v1/notifications/update_seen_notifications', null);
  } catch (error) {
    throw error;
  }
};
