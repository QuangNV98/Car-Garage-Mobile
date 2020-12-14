import {configServices} from '@src/utils';

export const callSos = async (ID: number, LAT: number, LNG: number) => {
  try {
    return await configServices.postService('api/sos', {
      ID,
      LAT,
      LNG
    });
  } catch (error) {
    throw error;
  }
};