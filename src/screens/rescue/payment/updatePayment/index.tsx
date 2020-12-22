import {Navigation} from 'react-native-navigation';
import UpdatePaymentComponent from './component';

const MY_PROFILE_UPDATE_PAYMENT_SCREEN = 'app.my_profile.payment.updatePayment';

const myProfileUpdatePaymentScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_UPDATE_PAYMENT_SCREEN,
      name: MY_PROFILE_UPDATE_PAYMENT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_UPDATE_PAYMENT_SCREEN, myProfileUpdatePaymentScreen, UpdatePaymentComponent};
