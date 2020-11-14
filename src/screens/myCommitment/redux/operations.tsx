import {RootState} from '@src/boot/rootReducers';
import system from '@src/constant/system';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {appleHealthKit, logError} from '@src/utils';
import _ from 'lodash';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  dataCollect,
  getAccountCommitments,
  timeStartAyncs,
  createCloserNotification,
  getProgressDetail,
  getDetailCheckIn,
} from '../services';
import {
  dataCollectAction,
  getListCommitmentAction,
  setListCommitmentAction,
  getListProgressDetailAction,
  setListProgressDetailAction,
  getDetailCheckInAction,
  setDetailCheckInAction,
} from './actions';
import CommitmentState from './state';

function* getListCommitmentActionWatcher() {
  yield takeLatest(getListCommitmentAction, function* ({payload}: any) {
    try {
      // yield put(onLoadingAction());
      const {pageNumber, status} = payload;
      const commitmentState: CommitmentState = yield select((state: RootState) => state.screens.myCommitments.list);
      if (commitmentState.loadList) {
        const timeStart = yield call(timeStartAyncs);
        yield call(appleHealthKit.getDataHealth, timeStart.data);
        const listCommitments = yield call(getAccountCommitments, pageNumber, system.PAGE_SIZE, status);
        // create closer 50% goal
        // if (listCommitments.list_commitments) {
        //   listCommitments.list_commitments.map(async (item) => {
        //     if (
        //       item.commitment_type === 'STANDARD' &&
        //       (item.commitment_process / parseFloat(item.commitment_target)) * 100 >= 50
        //     ) {
        //       await createCloserNotification(item.id);
        //     } else if (
        //       item.commitment_type === 'DAILY_WEEKLY' &&
        //       (item.count_finish / item.commitment_target_time) * 100 >= 50
        //     ) {
        //       await createCloserNotification(item.id);
        //     }
        //   });
        // }
        let newData = commitmentState.listData.concat(listCommitments.list_commitments);
        newData = _.uniqBy(newData, 'id');
        yield put(
          setListCommitmentAction(
            listCommitments.count_active,
            listCommitments.count_finish,
            newData,
            pageNumber,
            false,
          ),
        );
      }
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

function* dataCollectActionWatcher() {
  yield takeLatest(dataCollectAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {goal_id, dataRunning, id} = payload;
      yield call(dataCollect, goal_id, dataRunning, id);
      const newDataRunning = JSON.parse(dataRunning);
      let valueRunning = 0;
      newDataRunning.map((x) => {
        valueRunning += x.value;
      });
      const data = yield select((state: RootState) => state.screens.myCommitments.list.listData);
      if (data) {
        data.map(async (x) => {
          if (x.id === id) {
            if (x.commitment_type === 'STANDARD') {
              x.commitment_process += valueRunning;
              // if ((x.commitment_process / parseFloat(x.commitment_target)) * 100 >= 50) {
              //   await createCloserNotification(x.id);
              // }
            }
          }
        });
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

function* getListProgressDetailActionWatcher() {
  yield takeLatest(getListProgressDetailAction, function* ({payload}: any) {
    try {
      // yield put(onLoadingAction());
      const {goal_id, created_at, finish_at} = payload;
      const result = yield call(getProgressDetail, goal_id, created_at, finish_at);
      yield put(setListProgressDetailAction(result));
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

function* getDetailCheckInActionWatcher() {
  yield takeLatest(getDetailCheckInAction, function* ({payload}: any) {
    try {
      // yield put(onLoadingAction());
      const {commitment_id} = payload;
      const result = yield call(getDetailCheckIn, commitment_id);
      yield put(setDetailCheckInAction(result));
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
  getListCommitmentActionWatcher,
  dataCollectActionWatcher,
  getListProgressDetailActionWatcher,
  getDetailCheckInActionWatcher,
};
