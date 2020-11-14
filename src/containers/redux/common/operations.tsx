import AsyncStorage from '@react-native-community/async-storage';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {logError} from '@src/utils';
import {put, takeLatest, select} from 'redux-saga/effects';
import {logOutAction, clearAddCommitmentAction} from './actions';
import system from '@src/constant/system';
import {RootState} from '@src/boot/rootReducers';
import {invalidTokenAction} from '../account/actions';

function* logOutWatcher() {
  yield takeLatest(logOutAction, function* () {
    try {
      yield put(onLoadingAction());
      yield AsyncStorage.clear();
      rootLoginScreen();
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

function* clearAddCommitmentWatcher() {
  yield takeLatest(clearAddCommitmentAction, function* () {
    try {
      const myCommitments = yield select((state: RootState) => state.screens.myCommitments);
      myCommitments.addCommitment = {
        goal: -1,
        target: null,
        target_time: null,
        target_time_unit: system.DATA_DATE[0].id,
        lat: null,
        lng: null,
        location_name: null,
        commitment_type: null,
        amount_fine: null,
        stake_to: system.STAKE.NO_STAKE,
        email_friend: null,
        status: system.STATUS.ACTIVE,
        card_number: null,
        card_valid_from: null,
        card_cvc: null,
        zip_code: null,
        card_id: null,
        four_digit_card: null,
        start_date: null,
        unit: null,
      };
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

export default {logOutWatcher, clearAddCommitmentWatcher};
