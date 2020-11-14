import {handleActions} from 'redux-actions';
import {
  offLoadingAction,
  onLoadingAction,
  onUpdateDataAction,
  offUpdateDataAction,
  logErrorAction,
  getCurrentScreen,
  toggleUpdateTimerAction,
  isCheckInAction,
  saveCommitmentStatusAction,
} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [onLoadingAction.toString()]: (state) => ({...state, isLoading: true}),
    [offLoadingAction.toString()]: (state) => ({...state, isLoading: false}),
    [onUpdateDataAction.toString()]: (state) => ({...state, isUpdated: true}),
    [offUpdateDataAction.toString()]: (state) => ({...state, isUpdated: false}),
    [logErrorAction.toString()]: (state, action) => ({...state, errorMess: action.payload.error}),
    [getCurrentScreen.toString()]: (state, action) => ({...state, componentId: action.payload}),
    [toggleUpdateTimerAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        timer: payload.timer,
        diffMinute: payload.diffMinute,
        diffSecond: payload.diffSecond,
      };
    },
    [isCheckInAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        isCheckIn: payload.isCheckIn,
      };
    },
    [saveCommitmentStatusAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
  {
    isLoading: false,
    errorMess: null,
    isUpdated: true,
    componentId: null,
    timer: false,
    diffMinute: null,
    diffSecond: null,
    isCheckIn: false,
    status: {
      status_name: 'ACTIVE',
      status_id: 1,
      loading: true,
    },
  },
);
