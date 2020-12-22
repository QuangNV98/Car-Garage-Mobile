import {Navigation} from 'react-native-navigation';
import SupportCustomerComponent from './component';

const MY_PROFILE_SUPPORT_CUSTOMER_SCREEN = 'app.my_profile.support_customer';

const myProfileSupportCustomerScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_SUPPORT_CUSTOMER_SCREEN,
      name: MY_PROFILE_SUPPORT_CUSTOMER_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_SUPPORT_CUSTOMER_SCREEN, myProfileSupportCustomerScreen, SupportCustomerComponent};
