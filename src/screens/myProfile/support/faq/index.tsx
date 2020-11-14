import {Navigation} from 'react-native-navigation';
import SupportFAQComponent from './component';

const MY_PROFILE_SUPPORT_FAQ_SCREEN = 'app.my_profile.support_faq';

const myProfileSupportFAQScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_SUPPORT_FAQ_SCREEN,
      name: MY_PROFILE_SUPPORT_FAQ_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_SUPPORT_FAQ_SCREEN, myProfileSupportFAQScreen, SupportFAQComponent};
