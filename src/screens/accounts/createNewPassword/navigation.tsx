import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_SIGN_UP_CREATE_NEW_PASS_SCREEN = 'app.sign_up.create_new_pass';

const rootCreateNewPasswordScreen = (passProps: {email: string}) => {
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
              id: APP_SIGN_UP_CREATE_NEW_PASS_SCREEN,
              name: APP_SIGN_UP_CREATE_NEW_PASS_SCREEN,
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

export {APP_SIGN_UP_CREATE_NEW_PASS_SCREEN, rootCreateNewPasswordScreen};
