import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_SIGN_UP_SCREEN = 'app.signup';

const rootSignupScreen = () => {
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
              id: APP_SIGN_UP_SCREEN,
              name: APP_SIGN_UP_SCREEN,
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

export {APP_SIGN_UP_SCREEN, rootSignupScreen};
