import {configServices} from '@src/utils';

export const updateDateOfBirth = async (date_of_birth: Date) => {
  try {
    return await configServices.postService('api/v1/accounts/update_personal_data', {
      date_of_birth,
    });
  } catch (error) {
    throw error;
  }
};

export const updateWeight = async (weight: number) => {
  try {
    return await configServices.postService('api/v1/accounts/update_personal_data', {
      weight,
    });
  } catch (error) {
    throw error;
  }
};

export const updateHeight = async (height: number) => {
  try {
    return await configServices.postService('api/v1/accounts/update_personal_data', {
      height,
    });
  } catch (error) {
    throw error;
  }
};

export const updateGender = async (gender: boolean) => {
  try {
    return await configServices.postService('api/v1/accounts/update_personal_data', {
      gender,
    });
  } catch (error) {
    throw error;
  }
};
