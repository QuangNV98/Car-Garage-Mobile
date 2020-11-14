import config from '@src/constant/config';
import {configServices} from '@src/utils';
import {System} from '@src/constant';

export const signUp = async (first_name: string, last_name: string, email: string, password: string) => {
  try {
    const body = {
      first_name,
      last_name,
      email,
      password,
    };

    const response = await configServices.postService('api/v1/accounts/create', body, false);
    return response;
  } catch (error) {
    throw error;
  }
};
