import {Navigation} from 'react-native-navigation';
import PersonalDataComponent from './component';

const MY_PROFILE_PERSONAL_DATA_SCREEN = 'app.my_profile.personal_data';

const myProfilePersonalDataScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_PERSONAL_DATA_SCREEN,
      name: MY_PROFILE_PERSONAL_DATA_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_PERSONAL_DATA_SCREEN, myProfilePersonalDataScreen, PersonalDataComponent};
