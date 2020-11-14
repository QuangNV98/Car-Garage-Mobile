import {Config} from '@src/constant';
import {configServices} from '@src/utils';

export const verifyCode = async (email: string, code: string, fcm_token: string) => {
  try {
    const body = {client_id: Config.CLIENT_ID, email, code, fcm_token};
    const response = await configServices.postService('api/v1/accounts/active_account', body, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendCode = async (email: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/resend_code', {email}, false);
    return response;
  } catch (error) {
    throw error;
  }
};
