import {Navigation} from 'react-native-navigation';
import InviteFriendComponent from './component';

const MY_PROFILE_INVITE_FRIEND_SCREEN = 'app.my_profile.invite_friend';

const myProfileInviteFriendScreen = (componentId: string, passProps?: object) =>
  Navigation.push(componentId, {
    component: {
      id: MY_PROFILE_INVITE_FRIEND_SCREEN,
      name: MY_PROFILE_INVITE_FRIEND_SCREEN,
      options: {
        topBar: {
          visible: false,
          height: 0,
        },
      },
      passProps,
    },
  });

export {MY_PROFILE_INVITE_FRIEND_SCREEN, myProfileInviteFriendScreen, InviteFriendComponent};
