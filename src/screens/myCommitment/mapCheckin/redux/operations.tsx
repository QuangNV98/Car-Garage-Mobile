import {RootState} from '@src/boot/rootReducers';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction, isCheckInAction} from '@src/containers/redux/common/actions';
import {logErrorCheckIn} from '@src/utils';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {setListCommitmentAction} from '../../redux/actions';
import {checkInLocation} from '../services';
import {checkInLocationAction} from './actions';
import {createCloserNotification} from '../../services';

function* checkInLocationActionWatcher() {
  yield takeLatest(checkInLocationAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const {id} = payload;
      yield call(checkInLocation, id);
      const currentStatus = yield select((state: RootState) => state.screens.myCommitments.list);
      if (!currentStatus.loadList) {
        currentStatus.listData.map(async (x) => {
          if (x.id === id) {
            x.commitment_process = x.commitment_process + 1;
            // if(((x.commitment_process / parseFloat(x.commitment_target)) * 100) >= 50){
            //   await createCloserNotification(x.id);
            // }
          }
        });
        yield put(
          setListCommitmentAction(
            currentStatus.countActive,
            currentStatus.countFinish,
            currentStatus.listData,
            currentStatus.pageNumber,
            currentStatus.loadList,
          ),
        );
        yield put(isCheckInAction(true));
      }
    } catch (error) {
      if (error.message === 'InvalidToken') {
        yield put(invalidTokenAction());
      } else {
        yield put(isCheckInAction(false));
        logErrorCheckIn(error.message);
      }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  checkInLocationActionWatcher,
};
