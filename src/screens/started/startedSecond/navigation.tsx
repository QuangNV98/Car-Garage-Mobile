import {Navigation} from 'react-native-navigation';

const APP_STARTED_SECOND_SCREEN = 'app.started_second';

const rootStartedSecondScreen = (componentId: string, passProps?: object) => {
  Navigation.push(componentId, {
    component: {
      id: APP_STARTED_SECOND_SCREEN,
      name: APP_STARTED_SECOND_SCREEN,
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

export {APP_STARTED_SECOND_SCREEN, rootStartedSecondScreen};
