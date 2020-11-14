import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_CONTRACT_SCREEN = 'app.add_commitment.contract';

const addCommitmentContractScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_CONTRACT_SCREEN,
      name: APP_ADD_COMMITMENT_CONTRACT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_CONTRACT_SCREEN, addCommitmentContractScreen};
