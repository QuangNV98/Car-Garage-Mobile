import {createActions} from 'redux-actions';

const actions = createActions({
  GET_LIST_TRANSACTIONS_FIXING_ACTION: () => ({}),
  SET_LIST_TRANSACTIONS_FIXING_ACTION: (data) => ({data}),
  GET_LIST_TRANSACTIONS_COMPLETED_ACTION: () => ({}),
  SET_LIST_TRANSACTIONS_COMPLETED_ACTION: (data) => ({data}),
  GET_LIST_TRANSACTIONS_GUARANTEE_ACTION: () => ({}),
  SET_LIST_TRANSACTIONS_GUARANTEE_ACTION: (data) => ({data}),
});

export const {setListTransactionsFixingAction, getListTransactionsFixingAction, setListTransactionsCompletedAction, getListTransactionsCompletedAction, setListTransactionsGuaranteeAction, getListTransactionsGuaranteeAction, } = actions;
