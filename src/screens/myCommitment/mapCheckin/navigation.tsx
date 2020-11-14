import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_MAP_CHECKIN = 'app.my_commitment.map_checkin';

const addCommitmentMapCheckInScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_MAP_CHECKIN,
      name: APP_ADD_COMMITMENT_MAP_CHECKIN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_MAP_CHECKIN, addCommitmentMapCheckInScreen};
