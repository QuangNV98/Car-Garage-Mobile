import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_WHILE_RUNNING = 'app.my_commitment.whileRunning';

const addCommitmentWhileRunningScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_WHILE_RUNNING,
      name: APP_ADD_COMMITMENT_WHILE_RUNNING,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_WHILE_RUNNING, addCommitmentWhileRunningScreen};
