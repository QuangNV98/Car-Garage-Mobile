import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_BILLING_SCREEN = 'app.my_commitment.billing';

const addCommitmentBillingScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_BILLING_SCREEN,
      name: APP_ADD_COMMITMENT_BILLING_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_BILLING_SCREEN, addCommitmentBillingScreen};
