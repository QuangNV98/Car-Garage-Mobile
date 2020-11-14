import {Navigation} from 'react-native-navigation';
import SupportComponent from './component';

const MY_PROFILE_SUPPORT_SCREEN = 'app.my_profile.support';

const myProfileSupportScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_SUPPORT_SCREEN,
      name: MY_PROFILE_SUPPORT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_SUPPORT_SCREEN, myProfileSupportScreen, SupportComponent};
