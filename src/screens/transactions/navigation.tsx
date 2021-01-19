import {Navigation} from 'react-native-navigation';

const APP_TRANSACTIONS_SCREEN = 'app.transactions';

const rootTransactionScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: APP_TRANSACTIONS_SCREEN,
              name: APP_TRANSACTIONS_SCREEN,
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

export {APP_TRANSACTIONS_SCREEN, rootTransactionScreen};
