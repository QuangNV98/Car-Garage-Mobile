import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_CHECK_YOUR_EMAIL_SCREEN = 'app.check_your_email';

const rootCheckYourEmailScreen = () => {
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
              id: APP_CHECK_YOUR_EMAIL_SCREEN,
              name: APP_CHECK_YOUR_EMAIL_SCREEN,
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

export {APP_CHECK_YOUR_EMAIL_SCREEN, rootCheckYourEmailScreen};
