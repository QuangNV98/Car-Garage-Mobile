import listFriendReducer from '@src/screens/myCommitment/addCommitment/contracts/redux/reducers';
import addCommitmentReducer from '@src/screens/myCommitment/addCommitment/redux/reducers';
import listCommitmentReducer from '@src/screens/myCommitment/redux/reducers';
import {combineReducers} from 'redux';

export default combineReducers({
  list: listCommitmentReducer,
  addCommitment: addCommitmentReducer,
  listFriends: listFriendReducer,
});
