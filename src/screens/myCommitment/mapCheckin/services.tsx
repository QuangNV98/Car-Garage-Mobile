import {configServices} from '@src/utils';

export const checkInLocation = async (id: number) => {
  try {
    const response = await configServices.postService('api/v1/commitments/check_in_location', {id});
    return response;
  } catch (error) {
    throw error;
  }
};
