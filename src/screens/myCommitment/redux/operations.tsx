import {RootState} from '@src/boot/rootReducers';
import system from '@src/constant/system';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {appleHealthKit, logError} from '@src/utils';
import _ from 'lodash';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {updateFCMToken} from '../services';
import {updateFcmTokenAction} from './actions';

function* getDetailCheckInActionWatcher() {
  yield takeLatest(updateFcmTokenAction, function* ({payload}: any) {
    try {
      // yield put(onLoadingAction());
      console.log('danh');
      console.log(payload, 'kk');
      const {FCM_TOKEN, ID} = payload;
      const result = yield call(updateFCMToken, ID, FCM_TOKEN);
    } catch (error) {
      if (error.message === 'InvalidToken') {
        yield put(invalidTokenAction());
      } else {
        logError(error.message);
      }
    } finally {
      // yield put(offLoadingAction());
    }
  });
}

export default {
  getDetailCheckInActionWatcher,
};
