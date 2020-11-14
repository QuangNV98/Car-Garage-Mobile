import {Navigation} from 'react-native-navigation';

const APP_MY_FRIEND_SCREEN = 'app.my_friend';

const rootMyFriendScreen = () => {
  Navigation.setRoot({
    root: {
      component: {
        id: APP_MY_FRIEND_SCREEN,
        name: APP_MY_FRIEND_SCREEN,
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
        },
      },
    },
  });
};

export {APP_MY_FRIEND_SCREEN, rootMyFriendScreen};
