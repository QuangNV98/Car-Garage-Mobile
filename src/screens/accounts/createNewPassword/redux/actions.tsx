import {createActions} from 'redux-actions';

const actions = createActions({
  CREATE_NEW_PASSWORD_ACTION: (email, new_password) => ({
    email,
    new_password,
  }),
});

export const {createNewPasswordAction} = actions;
