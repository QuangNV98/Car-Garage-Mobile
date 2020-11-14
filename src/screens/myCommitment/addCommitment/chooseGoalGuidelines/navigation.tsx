import {Navigation} from 'react-native-navigation';

const APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN = 'app.my_commitment.choose_goal_guidelines';

const addCommitmentChooseGoalGuidelinesScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN,
      name: APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN, addCommitmentChooseGoalGuidelinesScreen};
