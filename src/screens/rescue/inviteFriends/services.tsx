import {configServices} from '@src/utils';

export const inviteFriends = async (email_friend: string, name_friend: string) => {
  try {
    return await configServices.postService('api/v1/accounts/invite_friends', {
      email_friend,
      name_friend,
    });
  } catch (error) {
    throw error;
  }
};
