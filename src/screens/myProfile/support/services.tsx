import {configServices} from '@src/utils';

export const reportABug = async (body: FormData) => {
  try {
    const response = await configServices.postService('api/v1/accounts/report_a_bug', body, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendSupport = async (content_support: string) => {
  try {
    console.log(content_support, 'content_support');
    return await configServices.postService('api/v1/accounts/send_support', {
      content_support,
    });
  } catch (error) {
    throw error;
  }
};
