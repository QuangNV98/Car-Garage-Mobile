import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {getAccountInfor} from '@src/containers/services';
import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {call, put, takeLatest} from 'redux-saga/effects';
import {checkLogin} from '../services';
import {logInAction} from './actions';
import {Alert} from 'react-native';

function* logInWatcher() {
  yield takeLatest(logInAction, function* ({payload}: any) {
    const {username, password} = payload;
    try {
      yield put(onLoadingAction());
      const result = yield call(checkLogin, username, password);
      yield AsyncStorage.setItem(System.TOKEN, `Bearer ${result.token}`);
      if (result) {
        const user = yield call(getAccountInfor, username);
        yield AsyncStorage.setItem(System.USER_INFO, JSON.stringify(user));
        yield call(rootMyCommitmentScreen);
      }
    } catch (error) {
      Alert.alert('Error', "Đăng nhập thất bại");
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {logInWatcher};
