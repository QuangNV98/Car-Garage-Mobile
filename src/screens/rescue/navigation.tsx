import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_SOS_SCREEN = 'app.sos';

const rootSosScreen = (passProps?: object) => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: colors.solitude,
      style: 'dark',
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: APP_SOS_SCREEN,
              name: APP_SOS_SCREEN,
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

export {APP_SOS_SCREEN, rootSosScreen};
