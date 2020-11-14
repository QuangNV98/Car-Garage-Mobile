import {appLaunchAction, appToBackgroundAction, backgroundToAppAction} from '@src/containers/redux/appState/actions';
import {AppState, AppStateStatus} from 'react-native';

export default () => (createStore) => (...args) => {
  const store = createStore(...args);
  let currentState = null;
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (currentState !== nextAppState) {
      if ((currentState === null || currentState === 'unknown') && nextAppState === 'active') {
        // Launch the application
        store.dispatch(appLaunchAction());
      } else if (currentState === 'active' && nextAppState === 'inactive') {
        // Exit the background
        store.dispatch(appToBackgroundAction());
      } else if (currentState === 'background' && nextAppState === 'active') {
        // Run from the background
        store.dispatch(backgroundToAppAction());
      } else if (currentState === 'inactive' && nextAppState === 'active') {
        // App in inactive appstate
        store.dispatch(backgroundToAppAction());
      }
    }
    currentState = nextAppState;
  };
  AppState.addEventListener('change', handleAppStateChange);
  // setTimeout to allow redux-saga to catch the initial state
  setTimeout(() => handleAppStateChange(AppState.currentState));
  return store;
};
