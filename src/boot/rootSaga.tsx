import appStateSaga from '@src/containers/redux/appState/operations';
import commonSaga from '@src/containers/redux/common/operations';
import screenSaga from '@src/screens/screens.sagas';
import {networkSaga} from 'react-native-offline';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  const sagas = [...Object.values(screenSaga), ...Object.values(appStateSaga), ...Object.values(commonSaga)].map(fork);
  yield all([fork(networkSaga), ...sagas]);
}
