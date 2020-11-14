import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getListNotifications} from '../services';
import {getListNotificationsAction, setListNotificationsAction} from './actions';

function* getListNotificationsWatcher() {
  yield takeLatest(getListNotificationsAction, function* () {
    try {
      yield put(onLoadingAction());
      const result = yield call(getListNotifications);
      yield put(setListNotificationsAction(result.data));
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
  getListNotificationsWatcher,
};