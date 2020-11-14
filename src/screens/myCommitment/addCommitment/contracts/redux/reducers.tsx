import {handleActions} from 'redux-actions';
import {saveListFriendAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [saveListFriendAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data,
    }),
  },
  {
    data: [],
  },
);
