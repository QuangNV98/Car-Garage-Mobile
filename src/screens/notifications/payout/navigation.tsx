import {Navigation} from 'react-native-navigation';

const APP_NOTIFICATION_PAYOUT_SCREEN = 'app.noti.payout';

const notiPayoutScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_NOTIFICATION_PAYOUT_SCREEN,
      name: APP_NOTIFICATION_PAYOUT_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });
// const notiPayoutScreen = () => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         id: APP_NOTIFICATION_PAYOUT_SCREEN,
//         name: APP_NOTIFICATION_PAYOUT_SCREEN,
//         options: {
//           topBar: {
//             visible: false,
//             height: 0,
//           },
//         },
//       },
//     },
//   });
// };
export {APP_NOTIFICATION_PAYOUT_SCREEN, notiPayoutScreen};
