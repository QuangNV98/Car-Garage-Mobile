import {handleActions} from 'redux-actions';
import {setListNotificationsAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setListNotificationsAction.toString()]: (state, {payload}) => ({
      ...state,
      data: payload.data,
    }),
  },
  {
    data: [],
  },
);
