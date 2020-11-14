import {Navigation} from 'react-native-navigation';

const APP_STARTED_SCREEN = 'app.started';

const rootStartedScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: APP_STARTED_SCREEN,
              name: APP_STARTED_SCREEN,
              options: {
                topBar: {
                  visible: false,
                  height: 0,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export {APP_STARTED_SCREEN, rootStartedScreen};
