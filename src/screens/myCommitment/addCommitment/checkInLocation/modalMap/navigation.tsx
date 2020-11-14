import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_MODAL_MAP_SCREEN = 'app.my_commitment.checkin_location.map';

const addCommitmentCheckInLocationMapScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_MODAL_MAP_SCREEN,
      name: APP_ADD_COMMITMENT_MODAL_MAP_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_MODAL_MAP_SCREEN, addCommitmentCheckInLocationMapScreen};
