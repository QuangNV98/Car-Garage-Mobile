import myCommitments from '@src/screens/myCommitment/index.reducers';
import transReducer from '@src/screens/transactions/redux/reducers';
import {combineReducers} from 'redux';

export default combineReducers({
  myCommitments,
  transReducer
});
