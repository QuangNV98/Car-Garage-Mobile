import {createActions} from 'redux-actions';

const actions = createActions({
  INVITE_FRIEND_ACTION: () => ({}),
  SAVE_LIST_FRIEND_ACTION: (data) => ({data}),
});

export const {inviteFriendAction, saveListFriendAction} = actions;
