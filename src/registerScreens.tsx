import React, {ComponentClass, FunctionComponent} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import RootComponent from './boot';
import CreateNewPasswordComponent from './screens/accounts/createNewPassword';
import {APP_SIGN_UP_CREATE_NEW_PASS_SCREEN} from './screens/accounts/createNewPassword/navigation';
import ForgotPasswordComponent from './screens/accounts/forgotPassword';
import {APP_FORGOT_PASSWORD_SCREEN} from './screens/accounts/forgotPassword/navigation';
import LoginComponent from './screens/accounts/signin';
import {APP_LOGIN_SCREEN} from './screens/accounts/signin/navigation';
import SignupComponent from './screens/accounts/signup';
import {APP_SIGN_UP_SCREEN} from './screens/accounts/signup/navigation';
import SignupVerifyCodeComponent from './screens/accounts/verifyCode';
import {APP_SIGN_UP_VERIFY_CODE_SCREEN} from './screens/accounts/verifyCode/navigation';
import {MyCommitmentComponent} from './screens/myCommitment';
import AddCommitmentBillingComponent from './screens/myCommitment/addCommitment/billingInformation';
import {APP_ADD_COMMITMENT_BILLING_SCREEN} from './screens/myCommitment/addCommitment/billingInformation/navigation';
import CheckInLocationComponent from './screens/myCommitment/addCommitment/checkInLocation';
import ModalMapComponent from './screens/myCommitment/addCommitment/checkInLocation/modalMap';
import {APP_ADD_COMMITMENT_MODAL_MAP_SCREEN} from './screens/myCommitment/addCommitment/checkInLocation/modalMap/navigation';
import {APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN} from './screens/myCommitment/addCommitment/checkInLocation/navigation';
import AddCommitmentChooseGoalComponent from './screens/myCommitment/addCommitment/chooseGoal';
import {APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN} from './screens/myCommitment/addCommitment/chooseGoal/navigation';
import {
  APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN,
  ChooseGoalGuidelineComponent,
} from './screens/myCommitment/addCommitment/chooseGoalGuidelines';
import CongratulationComponent from './screens/myCommitment/addCommitment/congratulations';
import {APP_ADD_COMMITMENT_CONGRATULATION_SCREEN} from './screens/myCommitment/addCommitment/congratulations/navigation';
import AddCommitmentContractComponent from './screens/myCommitment/addCommitment/contracts';
import {APP_ADD_COMMITMENT_CONTRACT_SCREEN} from './screens/myCommitment/addCommitment/contracts/navigation';
import AddCommitmentDailyWeeklyComponent from './screens/myCommitment/addCommitment/dailyWeeklyCommitment';
import {APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN} from './screens/myCommitment/addCommitment/dailyWeeklyCommitment/navigation';
import AddCommitmentFinishComponent from './screens/myCommitment/addCommitment/finishOnBoarding';
import {APP_ADD_COMMITMENT_FINISH_SCREEN} from './screens/myCommitment/addCommitment/finishOnBoarding/navigation';
import StandartCommitmentComponent from './screens/myCommitment/addCommitment/standartCommitment';
import {APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN} from './screens/myCommitment/addCommitment/standartCommitment/navigation';
import MapCheckinComponent from './screens/myCommitment/mapCheckin';
import {APP_ADD_COMMITMENT_MAP_CHECKIN} from './screens/myCommitment/mapCheckin/navigation';
import {APP_MY_COMMITMENT_SCREEN} from './screens/myCommitment/navigation';
import MyFriendScreen from './screens/myFriends';
import {APP_MY_FRIEND_SCREEN} from './screens/myFriends/navigation';
import MyProfileScreen from './screens/myProfile';
import {AccountSettingComponent, MY_PROFILE_ACCOUNT_SETTINGS_SCREEN} from './screens/myProfile/accountSettings';
import {InviteFriendComponent, MY_PROFILE_INVITE_FRIEND_SCREEN} from './screens/myProfile/inviteFriends';
import {SupportComponent, MY_PROFILE_SUPPORT_SCREEN} from './screens/myProfile/support';
import {SupportFAQComponent, MY_PROFILE_SUPPORT_FAQ_SCREEN} from './screens/myProfile/support/faq';
import {
  SupportCustomerComponent,
  MY_PROFILE_SUPPORT_CUSTOMER_SCREEN,
} from './screens/myProfile/support/customerSupport';
import {SupportReportComponent, MY_PROFILE_SUPPORT_REPORT_SCREEN} from './screens/myProfile/support/reportBug';
import {TAndCComponent, MY_PROFILE_TANDC_SCREEN} from './screens/myProfile/tAndC';
import {APP_PROFILE_SCREEN} from './screens/myProfile/navigation';
import {MY_PROFILE_PAYMENT_SCREEN, PaymentComponent} from './screens/myProfile/payment';
import {AddPaymentComponent, MY_PROFILE_ADD_PAYMENT_SCREEN} from './screens/myProfile/payment/addPayment';
import {UpdatePaymentComponent, MY_PROFILE_UPDATE_PAYMENT_SCREEN} from './screens/myProfile/payment/updatePayment';
import {MY_PROFILE_PERSONAL_DATA_SCREEN, PersonalDataComponent} from './screens/myProfile/peronalData';
import {MY_PROFILE_CONNECT_HEALTHKIT_SCREEN, ConnectHealthkitComponent} from './screens/myProfile/connectHealthkit';
import NotificationScreen from './screens/notifications';
import {APP_NOTIFICATION_SCREEN} from './screens/notifications/navigation';
import StartedScreen from './screens/started';
import {APP_STARTED_SCREEN} from './screens/started/navigation';
import StartedLastScreen from './screens/started/startedLast';
import {APP_STARTED_LAST_SCREEN} from './screens/started/startedLast/navigation';
import StartedSecondScreen from './screens/started/startedSecond';
import {APP_STARTED_SECOND_SCREEN} from './screens/started/startedSecond/navigation';
import StartedFourComponent from './screens/started/startedFour';
import {APP_STARTED_FOUR_SCREEN} from './screens/started/startedFour/navigation';
import {MY_COMMITMENT_PAYMENT_SCREEN, CommitmentPaymentComponent} from './screens/myCommitment/addCommitment/payment';
import {
  AddCommitmentPaymentComponent,
  MY_ADD_COMMITMENT_PAYMENT_SCREEN,
} from './screens/myCommitment/addCommitment/payment/addPayment';
import theme from './styles/theme';
import {APP_NOTIFICATION_PAYOUT_SCREEN} from './screens/notifications/payout/navigation';
import PayoutComponent from './screens/notifications/payout';
import {APP_NOTIFICATION_PAYOUT_SUCCESS_SCREEN} from './screens/notifications/payout_success/navigation';
import PayoutSuccessComponent from './screens/notifications/payout_success';
import {APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN} from './screens/myCommitment/friendProgress/navigation';
import FriendProgressComponent from './screens/myCommitment/friendProgress';
import {APP_ADD_COMMITMENT_START_RUNNING} from './screens/myCommitment/startRunning/navigation';
import StartRunningComponent from './screens/myCommitment/startRunning';
import {APP_ADD_COMMITMENT_WHILE_RUNNING} from './screens/myCommitment/whileRunning/navigation';
import WhileRunningComponent from './screens/myCommitment/whileRunning';
import {APP_ADD_COMMITMENT_COMPLETE_RUNNING} from './screens/myCommitment/completeRunning/navigation';
import CompleteRunningComponent from './screens/myCommitment/completeRunning';

const Screens = new Map();
Screens.set(APP_STARTED_SCREEN, StartedScreen);
Screens.set(APP_STARTED_SECOND_SCREEN, StartedSecondScreen);
Screens.set(APP_STARTED_LAST_SCREEN, StartedLastScreen);
Screens.set(APP_STARTED_FOUR_SCREEN, StartedFourComponent);

Screens.set(APP_LOGIN_SCREEN, LoginComponent);
Screens.set(APP_SIGN_UP_SCREEN, SignupComponent);
Screens.set(APP_SIGN_UP_VERIFY_CODE_SCREEN, SignupVerifyCodeComponent);
Screens.set(APP_FORGOT_PASSWORD_SCREEN, ForgotPasswordComponent);
Screens.set(APP_MY_COMMITMENT_SCREEN, MyCommitmentComponent);
Screens.set(APP_ADD_COMMITMENT_CHOOSE_GOAL_SCREEN, AddCommitmentChooseGoalComponent);
Screens.set(APP_ADD_COMMITMENT_DAILY_WEEKLY_SCREEN, AddCommitmentDailyWeeklyComponent);
Screens.set(APP_ADD_COMMITMENT_CONTRACT_SCREEN, AddCommitmentContractComponent);
Screens.set(APP_ADD_COMMITMENT_BILLING_SCREEN, AddCommitmentBillingComponent);
Screens.set(APP_ADD_COMMITMENT_FINISH_SCREEN, AddCommitmentFinishComponent);
Screens.set(APP_MY_FRIEND_SCREEN, MyFriendScreen);
Screens.set(APP_PROFILE_SCREEN, MyProfileScreen);
Screens.set(APP_NOTIFICATION_SCREEN, NotificationScreen);
Screens.set(APP_ADD_COMMITMENT_STANDART_COMMITMENT_SCREEN, StandartCommitmentComponent);
Screens.set(APP_ADD_COMMITMENT_CHECKIN_LOCATION_SCREEN, CheckInLocationComponent);
Screens.set(APP_ADD_COMMITMENT_MODAL_MAP_SCREEN, ModalMapComponent);
Screens.set(APP_ADD_COMMITMENT_MAP_CHECKIN, MapCheckinComponent);
Screens.set(APP_SIGN_UP_CREATE_NEW_PASS_SCREEN, CreateNewPasswordComponent);
Screens.set(MY_PROFILE_PERSONAL_DATA_SCREEN, PersonalDataComponent);
Screens.set(MY_PROFILE_CONNECT_HEALTHKIT_SCREEN, ConnectHealthkitComponent);
Screens.set(MY_PROFILE_INVITE_FRIEND_SCREEN, InviteFriendComponent);
Screens.set(MY_PROFILE_ACCOUNT_SETTINGS_SCREEN, AccountSettingComponent);
Screens.set(MY_PROFILE_PAYMENT_SCREEN, PaymentComponent);
Screens.set(MY_PROFILE_SUPPORT_SCREEN, SupportComponent);
Screens.set(MY_PROFILE_SUPPORT_FAQ_SCREEN, SupportFAQComponent);
Screens.set(MY_PROFILE_SUPPORT_CUSTOMER_SCREEN, SupportCustomerComponent);
Screens.set(MY_PROFILE_SUPPORT_REPORT_SCREEN, SupportReportComponent);
Screens.set(MY_PROFILE_TANDC_SCREEN, TAndCComponent);
Screens.set(APP_ADD_COMMITMENT_CHOOSE_GOAL_GUIDELINE_SCREEN, ChooseGoalGuidelineComponent);
Screens.set(APP_ADD_COMMITMENT_CONGRATULATION_SCREEN, CongratulationComponent);
Screens.set(APP_ADD_COMMITMENT_START_RUNNING, StartRunningComponent);
Screens.set(APP_ADD_COMMITMENT_WHILE_RUNNING, WhileRunningComponent);
Screens.set(APP_ADD_COMMITMENT_COMPLETE_RUNNING, CompleteRunningComponent);

Screens.set(MY_PROFILE_ADD_PAYMENT_SCREEN, AddPaymentComponent);
Screens.set(MY_PROFILE_UPDATE_PAYMENT_SCREEN, UpdatePaymentComponent);
Screens.set(MY_COMMITMENT_PAYMENT_SCREEN, CommitmentPaymentComponent);
Screens.set(MY_ADD_COMMITMENT_PAYMENT_SCREEN, AddCommitmentPaymentComponent);
Screens.set(APP_NOTIFICATION_PAYOUT_SCREEN, PayoutComponent);
Screens.set(APP_NOTIFICATION_PAYOUT_SUCCESS_SCREEN, PayoutSuccessComponent);
Screens.set(APP_NOTIFICATION_FRIEND_PROGRESS_SCREEN, FriendProgressComponent);

const WrappedComponent = (Component: FunctionComponent | ComponentClass, store: Store) => {
  return function inject(props: any) {
    store.dispatch({
      type: 'GET_CURRENT_SCREEN',
      payload: props.componentId,
    });
    const EnhancedComponent = () => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RootComponent>
            <Component {...props} />
          </RootComponent>
        </ThemeProvider>
      </Provider>
    );
    return <EnhancedComponent />;
  };
};

export const registerScreens = (store: Store) => {
  Screens.forEach((ScreenComponent, key) =>
    Navigation.registerComponent(key, () => WrappedComponent(ScreenComponent, store)),
  );
};
