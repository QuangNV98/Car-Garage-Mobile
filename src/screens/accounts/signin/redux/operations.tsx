import AsyncStorage from '@react-native-community/async-storage';
import { System } from '@src/constant';
import { setAccountAction } from '@src/containers/redux/account/actions';
import { offLoadingAction, onLoadingAction } from '@src/containers/redux/common/actions';
import { getAccountInfor } from '@src/containers/services';
import { rootMyCommitmentScreen } from '@src/screens/myCommitment/navigation';
import { logError } from '@src/utils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { rootSignupVerifyCodeScreen } from '../../verifyCode/navigation';
import { checkLogin } from '../services';
import { logInAction } from './actions';

function* logInWatcher() {
  yield takeLatest(logInAction, function* ({payload}: any) {
    const {username, password} = payload;
    try {
      yield put(onLoadingAction());
      const result = yield call(checkLogin, username, password);
      yield AsyncStorage.setItem(System.TOKEN, `Bearer ${result.access_token}`);
      const account = yield call(getAccountInfor);
      if (account) {
        yield put(setAccountAction(account));
        yield call(rootMyCommitmentScreen);
      }
    } catch (error) {
      if (error.message === 'ACCOUNT_NOT_ACTIVE') {
        rootSignupVerifyCodeScreen({email: username});
      } else if (error.message === 'ACCOUNT_HAS_BEEN_DELETED') {
        logError('The account has been deleted.');
      } else {
        logError('Either the email or password is incorrect. Please try again.');
      }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {logInWatcher};
