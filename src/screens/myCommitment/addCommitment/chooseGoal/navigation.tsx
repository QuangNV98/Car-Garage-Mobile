import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN = 'app.my_commitment.choose_goal';

const addCommitmentChooseGoalScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN,
      name: APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN, addCommitmentChooseGoalScreen};
