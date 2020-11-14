import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_CONGRATULATION_SCREEN = 'app.my_commitment.congulation';

const addCommitmentDailyWeeklyCongratulationScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_CONGRATULATION_SCREEN,
      name: APP_ADD_COMMITMENT_CONGRATULATION_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_CONGRATULATION_SCREEN, addCommitmentDailyWeeklyCongratulationScreen};
