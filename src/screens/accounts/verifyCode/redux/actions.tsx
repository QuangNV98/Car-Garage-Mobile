import {createActions} from 'redux-actions';

const actions = createActions({
  VERIFY_CODE_ACTION: (email, code) => ({
    email,
    code,
  }),
  RESEND_CODE_ACTION: (email) => ({
    email,
  }),
});

export const {verifyCodeAction, resendCodeAction} = actions;
