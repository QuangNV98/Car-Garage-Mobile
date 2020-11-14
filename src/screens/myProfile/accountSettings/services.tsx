import {configServices} from '@src/utils';

export const changePassword = async (current_password: string, new_password: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/change_password', {
      current_password,
      new_password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const changeFirstName = async (new_first_name: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/change_name', {new_first_name});
    return response;
  } catch (error) {
    throw error;
  }
};

export const changeLastName = async (new_last_name: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/change_name', {new_last_name});
    return response;
  } catch (error) {
    throw error;
  }
};

export const changeEmail = async (new_email: string) => {
  try {
    const response = await configServices.postService('api/v1/accounts/change_email', {new_email});
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await configServices.postService('api/v1/accounts/delete_account', null);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadPhoto = async (body: FormData) => {
  try {
    const response = await configServices.postService('api/v1/accounts/upload_img_profile', body, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};
