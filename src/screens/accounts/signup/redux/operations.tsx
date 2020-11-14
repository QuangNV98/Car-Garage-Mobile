import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {rootSignupVerifyCodeScreen} from '../../verifyCode/navigation';
import {signUp} from '../services';
import {signUpAction} from './actions';

function* signUpWatcher() {
  yield takeLatest(signUpAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {firstName, lastName, email, password} = payload;
      const result = yield call(signUp, firstName, lastName, email, password);
      yield rootSignupVerifyCodeScreen({email: result.data.email});
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

export default {signUpWatcher};
