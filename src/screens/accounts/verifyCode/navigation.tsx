import { colors } from '@src/styles';
import { Navigation } from 'react-native-navigation';

const APP_SIGN_UP_VERIFY_CODE_SCREEN = 'app.sign_up.verify_code';

const rootSignupVerifyCodeScreen = (passProps: {email: string}) => {
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
              id: APP_SIGN_UP_VERIFY_CODE_SCREEN,
              name: APP_SIGN_UP_VERIFY_CODE_SCREEN,
              options: {
                topBar: {
                  visible: false,
                  height: 0,
                },
              },
              passProps,
            },
          },
        ],
      },
    },
  });
};

export { APP_SIGN_UP_VERIFY_CODE_SCREEN, rootSignupVerifyCodeScreen };

