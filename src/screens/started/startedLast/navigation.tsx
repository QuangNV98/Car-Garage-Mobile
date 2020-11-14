import {Navigation} from 'react-native-navigation';

const APP_STARTED_LAST_SCREEN = 'app.started_last';

const rootStartedLastScreen = (componentId: string, passProps?: object) => {
  Navigation.push(componentId, {
    component: {
      id: APP_STARTED_LAST_SCREEN,
      name: APP_STARTED_LAST_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });
};

export {APP_STARTED_LAST_SCREEN, rootStartedLastScreen};
