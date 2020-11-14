import AsyncStorage from '@react-native-community/async-storage';
import config from '@src/constant/config';
import { logOutAction } from '@src/containers/redux/common/actions';
import { logError } from '@src/utils';
import { createNetworkMiddleware } from 'react-native-offline';
import { AnyAction, applyMiddleware, CombinedState, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import applyAppStateListener from './appStateListener';
import logger from './logger';
import allReducers, { RootState } from './rootReducers';
import allSaga from './rootSaga';

const rootReducers = (state: CombinedState<RootState>, action: AnyAction) => {
  if (action.type === 'LOG_OUT_ACTION') {
    state = {} as any;
  }
  return allReducers(state, action);
};

const tokenMiddleware = ({dispatch}) => (next: any) => async (action: any) => {
  if (action.type === 'INVALID_TOKEN_ACTION') {
    await dispatch(logOutAction());
    logError('Your session has expired or you are logged in on another device!');
  } else {
    return next(action);
  }
};

export default function configureStore() {
  const middlewares = [];
  middlewares.push(tokenMiddleware);
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200,
  });
  middlewares.push(networkMiddleware);
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  if (config.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['account'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const enhancer = compose(applyAppStateListener(), applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, enhancer);
  sagaMiddleware.run(allSaga);
  return store;
}
