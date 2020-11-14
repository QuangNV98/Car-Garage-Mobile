import {Navigation} from 'react-native-navigation';
import AccountSettingComponent from './component';

const MY_PROFILE_ACCOUNT_SETTINGS_SCREEN = 'app.my_profile.account_settings';

const myProfileAccountSettingScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_ACCOUNT_SETTINGS_SCREEN,
      name: MY_PROFILE_ACCOUNT_SETTINGS_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_ACCOUNT_SETTINGS_SCREEN, myProfileAccountSettingScreen, AccountSettingComponent};
