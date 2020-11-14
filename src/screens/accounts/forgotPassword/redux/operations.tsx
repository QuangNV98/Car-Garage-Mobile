import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {forgotPassword} from '../services';
import {forgotPasswordAction} from './actions';
import {rootSignupVerifyCodeScreen} from '../../verifyCode/navigation';
import {invalidTokenAction} from '@src/containers/redux/account/actions';

function* forgotPasswordWatcher() {
  yield takeLatest(forgotPasswordAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {email} = payload;
      yield call(forgotPassword, email);
      // yield Alert.alert('Forgot Password', `An email has been sent to ${email}`);
      rootSignupVerifyCodeScreen({email});
    } catch (error) {
      if (error.message === 'InvalidToken') {
        yield put(invalidTokenAction());
      } else {
        logError(error.message);
      }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {forgotPasswordWatcher};
