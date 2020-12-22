import {Navigation} from 'react-native-navigation';
import TAndCComponent from './component';

const MY_PROFILE_TANDC_SCREEN = 'app.my_profile.tandc';

const myProfileTAndCScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_TANDC_SCREEN,
      name: MY_PROFILE_TANDC_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_TANDC_SCREEN, myProfileTAndCScreen, TAndCComponent};
