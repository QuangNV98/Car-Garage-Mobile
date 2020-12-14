import {configServices} from '@src/utils';

export const getListTransactionsFixing = async (ID: number) => {
  try {
    return await configServices.getService('api/getAllTransRepairByCusId', {
      ID
    });
  } catch (error) {
    throw error;
  }
};

export const getListTransactionsCompleted = async (ID: number) => {
  try {
    return await configServices.getService('api/getAllTransCompletedByCusId', {
      ID
    });
  } catch (error) {
    throw error;
  }
};

export const getListTransactionsGuarantee = async (ID: number) => {
  try {
    return await configServices.getService('api/getGuarantedByCusId', {
      ID
    });
  } catch (error) {
    throw error;
  }
};