import {Navigation} from 'react-native-navigation';
import ConnectHealthkitComponent from './component';

const MY_PROFILE_CONNECT_HEALTHKIT_SCREEN = 'app.my_profile.connect_healthkit';

const myProfileConnectHealthkitScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_CONNECT_HEALTHKIT_SCREEN,
      name: MY_PROFILE_CONNECT_HEALTHKIT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_CONNECT_HEALTHKIT_SCREEN, myProfileConnectHealthkitScreen, ConnectHealthkitComponent};
