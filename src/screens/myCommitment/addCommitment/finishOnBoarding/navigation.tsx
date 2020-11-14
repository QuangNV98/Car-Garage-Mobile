import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_FINISH_SCREEN = 'app.my_commitment.finish';

const addCommitmentFinishScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_FINISH_SCREEN,
      name: APP_ADD_COMMITMENT_FINISH_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_FINISH_SCREEN, addCommitmentFinishScreen};
