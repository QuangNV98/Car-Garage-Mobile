import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import {logOutAction} from '@src/containers/redux/common/actions';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {typography} from '@src/utils/typography';
import {Navigation} from 'react-native-navigation';
import {checkInternetConnection, offlineActionTypes} from 'react-native-offline';
import {persistStore} from 'redux-persist';
import configureStore from './src/boot/configureStore';
import {registerScreens} from './src/registerScreens';

typography();

const store = configureStore();
console.disableYellowBox = true;

registerScreens(store);

Navigation.events().registerAppLaunchedListener(() => {
  persistStore(store, {}, () => {
    checkInternetConnection().then(async (isConnected: boolean) => {
      try {
        store.dispatch({
          type: offlineActionTypes.CONNECTION_CHANGE,
          payload: isConnected,
        });

        const token = await AsyncStorage.getItem(System.TOKEN);
        if (!token) {
          rootLoginScreen();
        } else {
          rootMyCommitmentScreen();
        }
      } catch (error) {
        await store.dispatch(logOutAction());
        rootLoginScreen();
      }
    });
  });
});
