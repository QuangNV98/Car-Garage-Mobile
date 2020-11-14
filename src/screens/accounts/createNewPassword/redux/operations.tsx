import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import {invalidTokenAction, setAccountAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {getAccountInfor} from '@src/containers/services';
import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {createNewPassword} from '../services';
import {createNewPasswordAction} from './actions';

function* createNewPasswordWatcher() {
  yield takeLatest(createNewPasswordAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {email, new_password} = payload;
      const result = yield call(createNewPassword, email, new_password);
      yield AsyncStorage.setItem(System.TOKEN, `Bearer ${result.data}`);
      const account = yield call(getAccountInfor);
      yield put(setAccountAction(account));
      rootMyCommitmentScreen();
      rootMyCommitmentScreen();
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

export default {createNewPasswordWatcher};
