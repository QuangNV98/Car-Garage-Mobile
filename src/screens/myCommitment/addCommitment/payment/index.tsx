import {Navigation} from 'react-native-navigation';
import CommitmentPaymentComponent from './component';

const MY_COMMITMENT_PAYMENT_SCREEN = 'app.my_commitment.payment';

const myCommitmentPaymentScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_COMMITMENT_PAYMENT_SCREEN,
      name: MY_COMMITMENT_PAYMENT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_COMMITMENT_PAYMENT_SCREEN, myCommitmentPaymentScreen, CommitmentPaymentComponent};
