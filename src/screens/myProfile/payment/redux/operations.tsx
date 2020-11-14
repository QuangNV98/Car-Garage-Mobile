import {RootState} from '@src/boot/rootReducers';
import {invalidTokenAction, removeCreditCardAction, setCreditCardAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {logError} from '@src/utils';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {addCreditCard, removeCreditCard, updateCreditCard} from '../services';
import {addCardAction, removeCardAction, updateCardAction} from './actions';

function* addCardActionWatcher() {
  yield takeLatest(addCardAction, function* ({payload}: any) {
    try {
      const cardInfor = yield call(addCreditCard, payload.card_id, payload.four_digit_card);
      console.log(cardInfor, 'card');
      yield put(setCreditCardAction(cardInfor.data.card_id, cardInfor.data.four_digit_card));
    } catch (error) {
      if (error.message === 'InvalidToken') {
        yield put(invalidTokenAction());
      } else {
        logError(error.message);
      }
    }
  });
}

function* removeCardActionWatcher() {
  yield takeLatest(removeCardAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      yield call(removeCreditCard, payload);
      yield put(removeCreditCardAction(payload));
    } catch (error) {
      if (error.message === 'InvalidToken') yield put(invalidTokenAction());
      else logError(error.message);
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* updateCardActionWatcher() {
  yield takeLatest(updateCardAction, function* ({payload}: any) {
    try {
      const cardInfor = yield call(updateCreditCard, payload.card_id, payload.four_digit_card);
      yield put(setCreditCardAction(cardInfor.data.card_id, cardInfor.data.four_digit_card));
      const accountData = yield select((state: RootState) => state.account);
      accountData.hasPaymentFailed = false;
    } catch (error) {
      if (error.message === 'InvalidToken') {
        yield put(invalidTokenAction());
      } else {
        logError(error.message);
      }
    }
  });
}

export default {
  addCardActionWatcher,
  removeCardActionWatcher,
  updateCardActionWatcher,
};
