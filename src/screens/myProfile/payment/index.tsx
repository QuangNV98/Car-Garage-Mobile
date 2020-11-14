import {Navigation} from 'react-native-navigation';
import PaymentComponent from './component';

const MY_PROFILE_PAYMENT_SCREEN = 'app.my_profile.payment';

const myProfilePaymentScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_PAYMENT_SCREEN,
      name: MY_PROFILE_PAYMENT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_PAYMENT_SCREEN, myProfilePaymentScreen, PaymentComponent};
