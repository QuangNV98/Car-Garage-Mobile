import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN = 'app.my_commitment.checkin_location';

const addCommitmentCheckInLocationScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN,
      name: APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN, addCommitmentCheckInLocationScreen};
