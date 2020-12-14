import {Navigation} from 'react-native-navigation';

const APP_DETAIL_BILL_SCREEN = 'app.detail_bill';

const rootDetailBillScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_DETAIL_BILL_SCREEN,
      name: APP_DETAIL_BILL_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_DETAIL_BILL_SCREEN, rootDetailBillScreen};
