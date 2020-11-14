import {handleActions} from 'redux-actions';
import {
  setListCommitmentAction,
  setLoadCommitmentAction,
  setListProgressDetailAction,
  setDetailCheckInAction,
} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setLoadCommitmentAction.toString()]: (state, {payload}) => ({
      ...state,
      loadList: payload.loadList,
      pageNumber: payload.pageNumber,
    }),
    [setListCommitmentAction.toString()]: (state, {payload}) => ({
      ...state,
      countActive: payload.countActive,
      countFinish: payload.countFinish,
      listData: payload.listData,
      pageNumber: payload.pageNumber,
      loadList: payload.loadList,
    }),
    [setListProgressDetailAction.toString()]: (state, {payload}) => ({
      ...state,
      listProgressDetail: payload.data,
    }),
    [setDetailCheckInAction.toString()]: (state, {payload}) => ({
      ...state,
      listDetailCheckIn: payload.data,
    }),
  },
  {
    loadList: true,
    countActive: 0,
    countFinish: 0,
    pageNumber: 1,
    listData: [],
    listProgressDetail: [],
    listDetailCheckIn: [],
  },
);
