import {createActions} from 'redux-actions';

const actions = createActions({
  APP_LAUNCH_ACTION: null,
  APP_TO_BACKGROUND_ACTION: null,
  BACKGROUND_TO_APP_ACTION: null,
});

export const {appLaunchAction, appToBackgroundAction, backgroundToAppAction} = actions;
