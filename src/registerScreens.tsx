import React, {ComponentClass, FunctionComponent} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import RootComponent from './boot';
import LoginComponent from './screens/accounts/signin';
import {APP_LOGIN_SCREEN} from './screens/accounts/signin/navigation';
import {MyCommitmentComponent} from './screens/myCommitment';
import {APP_MY_COMMITMENT_SCREEN} from './screens/myCommitment/navigation';
import MyFriendScreen from './screens/transactions';
import {APP_MY_FRIEND_SCREEN} from './screens/transactions/navigation';
import DetailBill from './screens/transactions/detailBill/index';
import {APP_DETAIL_BILL_SCREEN} from './screens/transactions/detailBill/navigation';
import MyProfileScreen from './screens/rescue';
import {AccountSettingComponent, MY_PROFILE_ACCOUNT_SETTINGS_SCREEN} from './screens/rescue/accountSettings';
import {InviteFriendComponent, MY_PROFILE_INVITE_FRIEND_SCREEN} from './screens/rescue/inviteFriends';
import {SupportComponent, MY_PROFILE_SUPPORT_SCREEN} from './screens/rescue/support';
import {SupportFAQComponent, MY_PROFILE_SUPPORT_FAQ_SCREEN} from './screens/rescue/support/faq';
import {
  SupportCustomerComponent,
  MY_PROFILE_SUPPORT_CUSTOMER_SCREEN,
} from './screens/rescue/support/customerSupport';
import {SupportReportComponent, MY_PROFILE_SUPPORT_REPORT_SCREEN} from './screens/rescue/support/reportBug';
import {TAndCComponent, MY_PROFILE_TANDC_SCREEN} from './screens/rescue/tAndC';
import {APP_PROFILE_SCREEN} from './screens/rescue/navigation';
import {MY_PROFILE_PAYMENT_SCREEN, PaymentComponent} from './screens/rescue/payment';
import {AddPaymentComponent, MY_PROFILE_ADD_PAYMENT_SCREEN} from './screens/rescue/payment/addPayment';
import {UpdatePaymentComponent, MY_PROFILE_UPDATE_PAYMENT_SCREEN} from './screens/rescue/payment/updatePayment';
import {MY_PROFILE_PERSONAL_DATA_SCREEN, PersonalDataComponent} from './screens/rescue/peronalData';
import {MY_PROFILE_CONNECT_HEALTHKIT_SCREEN, ConnectHealthkitComponent} from './screens/rescue/connectHealthkit';
import NotificationScreen from './screens/notifications';
import {APP_NOTIFICATION_SCREEN} from './screens/notifications/navigation';
import theme from './styles/theme';

const Screens = new Map();

Screens.set(APP_LOGIN_SCREEN, LoginComponent);
Screens.set(APP_MY_COMMITMENT_SCREEN, MyCommitmentComponent);
Screens.set(APP_MY_FRIEND_SCREEN, MyFriendScreen);
Screens.set(APP_DETAIL_BILL_SCREEN, DetailBill);
Screens.set(APP_PROFILE_SCREEN, MyProfileScreen);
Screens.set(APP_NOTIFICATION_SCREEN, NotificationScreen);
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

Screens.set(MY_PROFILE_ADD_PAYMENT_SCREEN, AddPaymentComponent);
Screens.set(MY_PROFILE_UPDATE_PAYMENT_SCREEN, UpdatePaymentComponent);

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
