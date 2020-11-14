import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_LOGIN_SCREEN = 'app.login';

const rootLoginScreen = () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: colors.solitude,
      style: 'light',
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: APP_LOGIN_SCREEN,
              name: APP_LOGIN_SCREEN,
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

export {APP_LOGIN_SCREEN, rootLoginScreen};
