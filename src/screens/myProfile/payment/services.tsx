import {configServices} from '@src/utils';

export const addCreditCard = async (card_id: string, four_digit_card: string) => {
  try {
    return await configServices.postService('api/v1/payments/add_card', {
      card_id,
      four_digit_card,
    });
  } catch (error) {
    throw error;
  }
};

export const removeCreditCard = async (card_id: string) => {
  try {
    return await configServices.postService('api/v1/payments/remove_card', {
      card_id,
    });
  } catch (error) {
    throw error;
  }
};

export const updateCreditCard = async (card_id: string, four_digit_card: string) => {
  try {
    return await configServices.postService('api/v1/payments/update_card', {
      card_id,
      four_digit_card,
    });
  } catch (error) {
    throw error;
  }
};
