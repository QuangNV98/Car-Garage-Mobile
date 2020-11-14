import {Navigation} from 'react-native-navigation';

const APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN = 'app.noti.friendProgress';

const notiFriendProgressScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN,
      name: APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN, notiFriendProgressScreen};
