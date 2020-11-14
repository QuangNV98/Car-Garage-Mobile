import {createActions} from 'redux-actions';

const actions = createActions({
  CHOOSE_GOAL_ACTION: (
    goal: number,
    target: number,
    target_time: number,
    target_time_unit: string,
    lat: number,
    lng: number,
    location_name: string,
    commitment_type: string,
    start_date: Date,
    unit: string,
  ) => ({goal, target, target_time, target_time_unit, lat, lng, location_name, commitment_type, start_date, unit}),
  STAKE_APP_ACTION: (
    amount_fine: number,
    stake_to: string,
    email_friend: string,
    name_friend: string,
    timezone: string,
  ) => ({
    amount_fine,
    stake_to,
    email_friend,
    name_friend,
    timezone,
  }),
  PAYMENT_ACTION: (card_id: string, four_digit_card: string) => ({
    card_id,
    four_digit_card,
  }),
  ADD_COMMITMENT_ACTION: (componentId: string) => componentId,
});

export const {chooseGoalAction, stakeAppAction, paymentAction, addCommitmentAction} = actions;
