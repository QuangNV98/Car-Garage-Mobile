import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN = 'app.my_commitment.daily_weekly';

const addCommitmentDailyWeeklyScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN,
      name: APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN, addCommitmentDailyWeeklyScreen};
