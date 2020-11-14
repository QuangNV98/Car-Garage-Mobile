import {createActions} from 'redux-actions';

const actions = createActions({
  GET_LIST_NOTIFICATIONS_ACTION: () => ({}),
  SET_LIST_NOTIFICATIONS_ACTION: (data) => ({data}),
});

export const {getListNotificationsAction, setListNotificationsAction} = actions;
