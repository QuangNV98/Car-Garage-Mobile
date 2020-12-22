import listCommitmentReducer from '@src/screens/myCommitment/redux/reducers';
import {combineReducers} from 'redux';

export default combineReducers({
  list: listCommitmentReducer,
});
