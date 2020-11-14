import {colors} from '@src/styles';
import {Navigation} from 'react-native-navigation';

const APP_MY_COMMITMENT_SCREEN = 'app.my_commitment';

const rootMyCommitmentScreen = () => {
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
              id: APP_MY_COMMITMENT_SCREEN,
              name: APP_MY_COMMITMENT_SCREEN,
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

export {APP_MY_COMMITMENT_SCREEN, rootMyCommitmentScreen};
