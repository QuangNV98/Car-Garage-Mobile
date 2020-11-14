import {Navigation} from 'react-native-navigation';
import AddCommitmentPaymentComponent from './component';

const MY_ADD_COMMITMENT_PAYMENT_SCREEN = 'app.my_commitment.payment.addPayment';

const myAddCommitmentPaymentScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_ADD_COMMITMENT_PAYMENT_SCREEN,
      name: MY_ADD_COMMITMENT_PAYMENT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_ADD_COMMITMENT_PAYMENT_SCREEN, myAddCommitmentPaymentScreen, AddCommitmentPaymentComponent};
