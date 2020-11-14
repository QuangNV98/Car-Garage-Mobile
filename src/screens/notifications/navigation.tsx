import {Navigation} from 'react-native-navigation';

const APP_NOTIFICATION_SCREEN = 'app.notification';

const rootNotificationScreen = () => {
  Navigation.setRoot({
    // root: {
    //   component: {
    //     id: APP_NOTIFICATION_SCREEN,
    //     name: APP_NOTIFICATION_SCREEN,
    //     options: {
    //       topBar: {
    //         visible: false,
    //         height: 0,
    //       },
    //     },
    //   },
    // },
    root: {
      stack: {
        children: [
          {
            component: {
              id: APP_NOTIFICATION_SCREEN,
              name: APP_NOTIFICATION_SCREEN,
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

export {APP_NOTIFICATION_SCREEN, rootNotificationScreen};
