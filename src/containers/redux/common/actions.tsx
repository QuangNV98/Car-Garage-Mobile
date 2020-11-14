import {createActions} from 'redux-actions';

const actions = createActions({
  ON_LOADING_ACTION: null,
  OFF_LOADING_ACTION: null,
  LOG_OUT_ACTION: null,
  ON_UPDATE_DATA_ACTION: null,
  OFF_UPDATE_DATA_ACTION: null,
  LOG_ERROR_ACTION: (error) => ({error}),
  GET_CURRENT_SCREEN: (id) => ({id}),
  TOGGLE_UPDATE_TIMER_ACTION: (timer, diffMinute, diffSecond) => ({timer, diffMinute, diffSecond}),
  IS_CHECK_IN_ACTION: (isCheckIn) => ({isCheckIn}),
  CLEAR_ADD_COMMITMENT_ACTION: null,
  SAVE_COMMITMENT_STATUS_ACTION: (status) => ({status}),
});

export const {
  onLoadingAction,
  offLoadingAction,
  logOutAction,
  onUpdateDataAction,
  offUpdateDataAction,
  logErrorAction,
  getCurrentScreen,
  toggleUpdateTimerAction,
  isCheckInAction,
  clearAddCommitmentAction,
  saveCommitmentStatusAction,
} = actions;
