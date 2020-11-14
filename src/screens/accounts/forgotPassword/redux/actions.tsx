import {createActions} from 'redux-actions';

const actions = createActions({
  FORGOT_PASSWORD_ACTION: (email) => ({email}),
});

export const {forgotPasswordAction} = actions;
