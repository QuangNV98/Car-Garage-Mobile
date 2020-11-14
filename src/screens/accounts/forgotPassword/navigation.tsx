import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_FORGOT_PASSWORD_SCREEN = 'app.forgot_password';

const rootForgotPasswordScreen = () => {
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
              id: APP_FORGOT_PASSWORD_SCREEN,
              name: APP_FORGOT_PASSWORD_SCREEN,
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

export {APP_FORGOT_PASSWORD_SCREEN, rootForgotPasswordScreen};
