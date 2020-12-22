import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {logError} from '@src/utils';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {changeEmail, changeFirstName, changeLastName, changePassword, deleteAccount} from '../services';
import {
  changeEmailAction,
  changeFirstNameAction,
  changeLastNameAction,
  changePasswordAction,
  deleteAccountAction,
} from './actions';

function* changePasswordWatcher() {
  yield takeLatest(changePasswordAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {current_password, new_password} = payload;
      yield call(changePassword, current_password, new_password);
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

function* changeEmailWatcher() {
  yield takeLatest(changeEmailAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {new_email} = payload;
      const account = yield select((state: RootState) => state.account);
      yield call(changeEmail, new_email);
      account.email = new_email;
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
function* changeFirstNameWatcher() {
  yield takeLatest(changeFirstNameAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {new_first_name} = payload;
      const account = yield select((state: RootState) => state.account);
      yield call(changeFirstName, new_first_name);
      account.first_name = new_first_name;
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
function* changeLastNameWatcher() {
  yield takeLatest(changeLastNameAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {new_last_name} = payload;
      const account = yield select((state: RootState) => state.account);
      yield call(changeLastName, new_last_name);
      account.last_name = new_last_name;
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

function* deleteAccountWatcher() {
  yield takeLatest(deleteAccountAction, function* () {
    try {
      yield put(onLoadingAction());
      const result = yield call(deleteAccount);
      if (result.data === true) {
        yield AsyncStorage.clear();
        yield AsyncStorage.setItem(System.PASS_STARTED, 'passed');
        yield rootLoginScreen();
      }
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
  changePasswordWatcher,
  changeEmailWatcher,
  changeFirstNameWatcher,
  changeLastNameWatcher,
  deleteAccountWatcher,
};
