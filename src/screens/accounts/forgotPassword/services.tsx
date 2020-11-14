import { configServices } from '@src/utils';

export const forgotPassword = async (email: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/forgot_password', {email}, false);
    return response;
  } catch (error) {
    throw error;
  }
};
