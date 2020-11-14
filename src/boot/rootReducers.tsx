import accountReducer from '@src/containers/redux/account/reducers';
import commonReducer from '@src/containers/redux/common/reducers';
import screenReducer from '@src/screens/screens.reducers';
import {reducer as network} from 'react-native-offline';
import {combineReducers} from 'redux';

const reducers = {
  network,
  common: commonReducer,
  screens: screenReducer,
  account: accountReducer,
};

type GetReducerState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer Q ? Q : never;
};

export type RootState = GetReducerState<typeof reducers>;

export default combineReducers(reducers);
