import {createActions} from 'redux-actions';
import {IListData} from '../listCommitments/propState';

const actions = createActions({
  SET_LOAD_COMMITMENT_ACTION: (loadList: boolean, pageNumber: number) => ({loadList, pageNumber}),
  GET_LIST_COMMITMENT_ACTION: (pageNumber: number, status: string) => ({pageNumber, status}),
  SET_LIST_COMMITMENT_ACTION: (
    countActive: number,
    countFinish: number,
    listData: IListData[],
    pageNumber: number,
    loadList: boolean,
  ) => ({
    countActive,
    countFinish,
    listData,
    pageNumber,
    loadList,
  }),
  DATA_COLLECT_ACTION: (goal_id, dataRunning, id) => ({goal_id, dataRunning, id}),
  GET_LIST_PROGRESS_DETAIL_ACTION: (goal_id, created_at, finish_at) => ({goal_id, created_at, finish_at}),
  SET_LIST_PROGRESS_DETAIL_ACTION: (data) => ({data}),
  GET_DETAIL_CHECK_IN_ACTION: (commitment_id) => ({commitment_id}),
  SET_DETAIL_CHECK_IN_ACTION: (data) => ({data}),
});

export const {
  setLoadCommitmentAction,
  getListCommitmentAction,
  setListCommitmentAction,
  dataCollectAction,
  getListProgressDetailAction,
  setListProgressDetailAction,
  getDetailCheckInAction,
  setDetailCheckInAction,
} = actions;
