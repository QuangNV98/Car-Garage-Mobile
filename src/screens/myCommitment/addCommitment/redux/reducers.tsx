import system from '@src/constant/system';
import {handleActions} from 'redux-actions';
import {chooseGoalAction, stakeAppAction, paymentAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [chooseGoalAction.toString()]: (state, {payload}) => ({
      ...state,
      goal: payload.goal,
      target: payload.target,
      target_time: payload.target_time,
      target_time_unit: payload.target_time_unit,
      lat: payload.lat,
      lng: payload.lng,
      location_name: payload.location_name,
      commitment_type: payload.commitment_type,
      start_date: payload.start_date,
      unit: payload.unit,
    }),
    [stakeAppAction.toString()]: (state, {payload}) => ({
      ...state,
      amount_fine: payload.amount_fine,
      stake_to: payload.stake_to,
      email_friend: payload.email_friend,
      name_friend: payload.name_friend,
      timezone: payload.timezone,
    }),
    [paymentAction.toString()]: (state, {payload}) => ({
      ...state,
      card_id: payload.card_id,
      four_digit_card: payload.four_digit_card,
    }),
  },
  {
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
    timezone: null,
  },
);
