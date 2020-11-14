import {createActions} from 'redux-actions';

const actions = createActions({
  SIGN_UP_ACTION: (firstName, lastName, email, password) => ({firstName, lastName, email, password}),
});

export const {signUpAction} = actions;
