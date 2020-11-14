import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN = 'app.my_commitment.standart_commitment';

const addCommitmentStandartScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN,
      name: APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN, addCommitmentStandartScreen};
