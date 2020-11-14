import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_START_RUNNING = 'app.my_commitment.startRunning';

const addCommitmentStartRunningScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_START_RUNNING,
      name: APP_ADD_COMMITMENT_START_RUNNING,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_START_RUNNING, addCommitmentStartRunningScreen};
