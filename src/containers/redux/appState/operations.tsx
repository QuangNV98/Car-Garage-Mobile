import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import {getAccountInfor} from '@src/containers/services';
import {logError} from '@src/utils';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import {call, put, takeLatest} from 'redux-saga/effects';
import {invalidTokenAction, setAccountAction} from '../account/actions';
import {logOutAction, offLoadingAction, onLoadingAction, toggleUpdateTimerAction} from '../common/actions';
import {appLaunchAction, appToBackgroundAction, backgroundToAppAction} from './actions';

function* appLaunchWatcher() {
  yield takeLatest(appLaunchAction, function* () {
    try {
      yield put(onLoadingAction());
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

function* appToBackgroundWatcher() {
  yield takeLatest(appToBackgroundAction, function* () {
    try {
    //   yield put(onLoadingAction());
    //   yield BackgroundTimer.stopBackgroundTimer();
    //   yield put(toggleUpdateTimerAction(false));
    // } catch (error) {
    //   if (error.message === 'InvalidToken') {
    //     yield put(invalidTokenAction());
    //   } else {
    //     logError(error.message);
    //   }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* backgroundToAppWatcher() {
  yield takeLatest(backgroundToAppAction, function* () {
    try {
      // yield put(onLoadingAction());
      // // // const token = yield AsyncStorage.getItem(System.TOKEN);
      // // // // const componentId = yield select((state: RootState) => state.common.componentId);
      // // // if (token) {
      // // //   const account = yield call(getAccountInfor);
      // // //   if (account) {
      // // //     yield put(setAccountAction(account));
      // // //     // start timer when one commitment running
      // // //     const backgroundTimer = yield AsyncStorage.getItem(System.BACKGROUND_TIMER);
      // // //     const bgTimer = JSON.parse(backgroundTimer);
      // // //     if (bgTimer) {
      // // //       const diffTime = moment.duration(moment().diff(moment(bgTimer.timer)));
      // // //       yield put(toggleUpdateTimerAction(true, diffTime.minutes(), diffTime.seconds()));
      // // //     }

      // // //     // end
      // // //     // reload commitments
      // // //     // if (componentId === APP_MY_COMMITMENT_SCREEN) {
      // // //     //   const currentStatus = yield select((state: RootState) => state.screens.myCommitments.list);
      // // //     //   if (!currentStatus.loadList) {
      // // //     //     yield put(setLoadCommitmentAction(true, currentStatus.pageNumber));
      // // //     //   }
      // // //     // }
      // // //     //end
      // //   } else {
      // //     yield put(logOutAction());
      // //   }
      // }
    } catch (error) {
      // if (error.message === 'InvalidToken') {
      //   yield put(invalidTokenAction());
      // } else {
      //   logError(error.message);
      // }
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default {
  appLaunchWatcher,
  appToBackgroundWatcher,
  backgroundToAppWatcher,
};
