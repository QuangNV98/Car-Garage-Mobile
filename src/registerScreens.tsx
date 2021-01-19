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
import TransactionComponent from './screens/transactions';
import {APP_TRANSACTIONS_SCREEN} from './screens/transactions/navigation';
import DetailBill from './screens/transactions/detailBill/index';
import {APP_DETAIL_BILL_SCREEN} from './screens/transactions/detailBill/navigation';
import RescueScreen from './screens/rescue';
import {APP_SOS_SCREEN} from './screens/rescue/navigation';
import theme from './styles/theme';

const Screens = new Map();

Screens.set(APP_LOGIN_SCREEN, LoginComponent);
Screens.set(APP_MY_COMMITMENT_SCREEN, MyCommitmentComponent);
Screens.set(APP_TRANSACTIONS_SCREEN, TransactionComponent);
Screens.set(APP_DETAIL_BILL_SCREEN, DetailBill);
Screens.set(APP_SOS_SCREEN, RescueScreen);

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
