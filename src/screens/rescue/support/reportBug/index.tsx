import {Navigation} from 'react-native-navigation';
import SupportReportComponent from './component';

const MY_PROFILE_SUPPORT_REPORT_SCREEN = 'app.my_profile.support_report';

const myProfileSupportReportScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_SUPPORT_REPORT_SCREEN,
      name: MY_PROFILE_SUPPORT_REPORT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_SUPPORT_REPORT_SCREEN, myProfileSupportReportScreen, SupportReportComponent};
