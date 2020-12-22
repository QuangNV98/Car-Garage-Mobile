import AsyncStorage from '@react-native-community/async-storage';
import { System } from '@src/constant';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getListTransactionsFixing, getListTransactionsGuarantee, getListTransactionsCompleted} from '../services';
import {setListTransactionsFixingAction, getListTransactionsFixingAction, setListTransactionsCompletedAction, getListTransactionsCompletedAction, setListTransactionsGuaranteeAction, getListTransactionsGuaranteeAction,} from './actions';

function* getListTransactionsFixingWatcher() {
  yield takeLatest(getListTransactionsFixingAction, function* () {
    try {
      yield put(onLoadingAction());
      const user = yield AsyncStorage.getItem(System.USER_INFO);
      console.log("21")
      const result = yield call(getListTransactionsFixing, JSON.parse(user).ID);
      console.log(result, "res")
      yield put(setListTransactionsFixingAction(result));
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

function* getListTransactionsCompletedWatcher() {
  yield takeLatest(getListTransactionsCompletedAction, function* () {
    try {
      yield put(onLoadingAction());
      const user = yield AsyncStorage.getItem(System.USER_INFO);
      console.log("21")
      const result = yield call(getListTransactionsCompleted, JSON.parse(user).ID);
      console.log(result, "res")
      yield put(setListTransactionsCompletedAction(result));
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

function* getListTransactionsGuaranteeWatcher() {
  yield takeLatest(getListTransactionsGuaranteeAction, function* () {
    try {
      yield put(onLoadingAction());
      const user = yield AsyncStorage.getItem(System.USER_INFO);
      console.log("21")
      const result = yield call(getListTransactionsGuarantee, JSON.parse(user).ID);
      console.log(result, "res")
      yield put(setListTransactionsGuaranteeAction(result));
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

export default {
  getListTransactionsFixingWatcher,
  getListTransactionsCompletedWatcher,
  getListTransactionsGuaranteeWatcher
};
