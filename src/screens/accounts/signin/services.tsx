import {configServices} from '@src/utils';

export const checkLogin = async (username: string, password: string) => {
  try {
    const body = {
      username,
      password,
    };
    const response = await configServices.postService('authenticate', body, false);
    return response;
  } catch (error) {
    throw error;
  }
};
