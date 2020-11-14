import {RootState} from '@src/boot/rootReducers';
import {invalidTokenAction} from '@src/containers/redux/account/actions';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {addCommitments} from '@src/screens/myCommitment/services';
import {logError} from '@src/utils';
import {Base64} from 'js-base64';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {addCommitmentFinishScreen} from '../finishOnBoarding/navigation';
import {addCommitmentAction} from './actions';

function* addCommitmentActionWatcher() {
  yield takeLatest(addCommitmentAction, function* ({payload}: any) {
    try {
      yield put(onLoadingAction());
      const data = yield select((state: RootState) => state.screens.myCommitments.addCommitment);
      const obj = {
        goal_id: data.goal,
        latitude: data.lat,
        longitude: data.lng,
        location_name: data.location_name,
        commitment_type: data.commitment_type,
        commitment_target: data.target,
        commitment_target_time: data.target_time,
        commitment_target_time_unit: data.target_time_unit,
        amount_bet: data.amount_fine,
        stake_type: data.stake_to,
        email_friend: data.email_friend,
        name_friend: data.name_friend,
        card_number: data.card_number,
        card_valid_from: data.card_valid_from,
        card_cvc: Base64.encode(data.card_cvc),
        zip_code: data.zip_code,
        card_id: data.card_id,
        four_digit_card: data.four_digit_card,
        start_date: data.start_date,
        unit: data.unit,
        timezone: data.timezone,
      };
      const result = yield call(addCommitments, obj);

      if (result.data) {
        /** call data re-render list commitments */
        const currentList = yield select((state: RootState) => state.screens.myCommitments.list);
        // yield put(setLoadCommitmentAction(true, currentStatus.pageNumber));
        const new_commitment = {
          amount_bet: result.data.amount_bet,
          commitment_details_process: 0,
          commitment_details_target: result.data.commitment_target,
          commitment_process: 0,
          commitment_target: result.data.commitment_target,
          commitment_target_time: result.data.commitment_target_time,
          commitment_target_time_unit: result.data.commitment_target_time_unit,
          commitment_type: result.data.commitment_type,
          count_active: result.data.commitment_target_time,
          count_finish: 0,
          email_friend: result.data.email_friend,
          name_friend: result.data.name_friend,
          first_name: '',
          goal_id: result.data.goal_id,
          id: result.data.id,
          last_name: '',
          latitude: result.data.latitude,
          location_name: result.data.location_name,
          longitude: result.data.longitude,
          row_number: 1,
          status: result.data.status,
          unit: result.data.unit,
          timezone: result.data.timezone,
          created_at: result.data.created_at,
          finish_at: result.data.finish_at,
        };

        if (currentList) currentList.listData.unshift(new_commitment);
        /** end */
        const account = yield select((state: RootState) => state.account);
        const commitment_list = yield select((state: RootState) => state.screens.myCommitments.list);
        if (data.stake_to === 'STAKE_TO_FRIEND') {
          account.has_friend = true;
        }
        commitment_list.countActive += 1;
        addCommitmentFinishScreen(payload, {goal_id: result.data.goal_id});
      } else logError('Add commitment fail!');
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
  addCommitmentActionWatcher,
};
