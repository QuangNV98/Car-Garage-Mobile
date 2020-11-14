import {Navigation} from 'react-native-navigation';

const APP_STARTED_FOUR_SCREEN = 'app.started_four';

const rootStartedFourScreen = (componentId: string, passProps?: object) => {
  Navigation.push(componentId, {
    component: {
      id: APP_STARTED_FOUR_SCREEN,
      name: APP_STARTED_FOUR_SCREEN,
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

export {APP_STARTED_FOUR_SCREEN, rootStartedFourScreen};
