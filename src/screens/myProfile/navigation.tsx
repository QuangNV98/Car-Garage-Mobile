import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_PROFILE_SCREEN = 'app.profile';

const rootProfileScreen = () => {
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
              id: APP_PROFILE_SCREEN,
              name: APP_PROFILE_SCREEN,
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

export {APP_PROFILE_SCREEN, rootProfileScreen};
