import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import {invalidTokenAction, setAccountAction} from '@src/containers/redux/account/actions';
import {logErrorAction, offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {getAccountInfor} from '@src/containers/services';
import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {logError} from '@src/utils';
import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import {rootCreateNewPasswordScreen} from '../../createNewPassword/navigation';
import {resendCode, verifyCode} from '../services';
import {resendCodeAction, verifyCodeAction} from './actions';
import system from '@src/constant/system';

function* verifyCodeWatcher() {
  yield takeLatest(verifyCodeAction, function* ({payload}: any) {
    let err = '';
    try {
      yield put(onLoadingAction());
      const {email, code} = payload;
      const fcm_token = yield AsyncStorage.getItem(system.FCM_TOKEN);
      const result = yield call(verifyCode, email, code, fcm_token);
      if (result.data === 'success') {
        rootCreateNewPasswordScreen({email});
      } else {
        yield AsyncStorage.setItem(System.TOKEN, `Bearer ${result.data}`);
        const account = yield call(getAccountInfor);
        yield put(setAccountAction(account));
        rootMyCommitmentScreen();
      }
    } catch (error) {
      err = error.message;
    } finally {
      yield put(offLoadingAction());
      if (err) {
        yield put(logErrorAction(err));
      }
    }
  });
}

function* resendCodeWatcher() {
  yield takeLatest(resendCodeAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {email} = payload;
      yield call(resendCode, email);
      Alert.alert('Resend Code', 'Resend code successfully');
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

export default {verifyCodeWatcher, resendCodeWatcher};
