import myCommitments from '@src/screens/myCommitment/index.reducers';
import notificationReducer from '@src/screens/notifications/redux/reducers';
import {combineReducers} from 'redux';

export default combineReducers({
  myCommitments,
  notificationReducer,
});