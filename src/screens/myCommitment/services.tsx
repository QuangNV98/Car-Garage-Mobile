// import {configServices} from '@src/utils';

// export const getAccountCommitments = async (page_number: number, page_size: number, status: string) => {
//   try {
//     return await configServices.getService('api/v1/commitments/get_account_commitments', {
//       page_number,
//       page_size,
//       status,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export const addCommitments = async (obj: object) => {
//   try {
//     const response = await configServices.postService('api/v1/commitments/create', obj);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const dataCollect = async (goal_id: number, data: string, commitment_id: number) => {
//   try {
//     const response = await configServices.postService('api/v1/apple-health/data-collection', {
//       goal_id,
//       data,
//       commitment_id,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const timeStartAyncs = async () => {
//   try {
//     const response = await configServices.getService('api/v1/apple-health/time_start_async');
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createCloserNotification = async (commitment_id: number) => {
//   try {
//     const response = await configServices.postService('api/v1/notifications/create_closer_to_complete_goal', {
//       commitment_id,
//     });
//     console.log(response, 'response');
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getProgressDetail = async (goal_id: number, created_at: Date, finish_at: Date) => {
//   try {
//     const response = await configServices.postService('api/v1/apple-health/progress_detail', {
//       goal_id,
//       created_at,
//       finish_at,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getDetailCheckIn = async (commitment_id: number) => {
//   try {
//     const response = await configServices.postService('api/v1/commitments/get_detail_check_in', {
//       commitment_id,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
