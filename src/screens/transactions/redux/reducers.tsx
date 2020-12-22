import {handleActions} from 'redux-actions';
import {setListTransactionsFixingAction, setListTransactionsCompletedAction, setListTransactionsGuaranteeAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setListTransactionsFixingAction.toString()]: (state, {payload}) => ({
      ...state,
      data: payload.data,
    }),
    [setListTransactionsGuaranteeAction.toString()]: (state, {payload}) => ({
      ...state,
      dataGuarantee: payload.data,
    }),
    [setListTransactionsCompletedAction.toString()]: (state, {payload}) => ({
      ...state,
      dataComplete: payload.data,
    }),
  },
  {
    data: [],
  },
);
