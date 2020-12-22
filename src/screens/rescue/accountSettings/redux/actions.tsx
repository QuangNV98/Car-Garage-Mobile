import {createActions} from 'redux-actions';

const actions = createActions({
  CHANGE_PASSWORD_ACTION: (current_password, new_password) => ({
    current_password,
    new_password,
  }),
  CHANGE_EMAIL_ACTION: (new_email) => ({
    new_email,
  }),
  CHANGE_FIRST_NAME_ACTION: (new_first_name) => ({
    new_first_name,
  }),
  CHANGE_LAST_NAME_ACTION: (new_last_name) => ({
    new_last_name,
  }),
  DELETE_ACCOUNT_ACTION: () => ({}),
});

export const {
  changePasswordAction,
  changeEmailAction,
  changeFirstNameAction,
  changeLastNameAction,
  deleteAccountAction,
} = actions;
