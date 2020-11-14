import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getFriendById} from '../services';
import {inviteFriendAction, saveListFriendAction} from './actions';

function* inviteFriendWatcher() {
  yield takeLatest(inviteFriendAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const result = yield call(getFriendById);
      if (result.message === 'Server is busy') {
        yield put(saveListFriendAction([]));
      }
      yield put(saveListFriendAction(result));
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

export default {inviteFriendWatcher};
