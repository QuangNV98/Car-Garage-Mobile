import {RootState} from '@src/boot/rootReducers';
import {APP_MY_COMMITMENT_SCREEN, rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';
import {APP_SOS_SCREEN, rootSosScreen} from '@src/screens/rescue/navigation';
import {APP_TRANSACTIONS_SCREEN, rootTransactionScreen} from '@src/screens/transactions/navigation';
import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React, {Fragment, useState} from 'react';
import {TouchableOpacity, Modal, Text, View} from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {IProps, IState} from './propState';
import styles from './styles';
import ButtonComponent from '@src/containers/components/button';
import {permission} from '@src/utils/index';
import Geolocation, {GeolocationError, GeolocationResponse} from '@react-native-community/geolocation';

export default function BottomTabNavigation(props: IProps) {
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    hasPaymentFailed: state.account.hasPaymentFailed,
  }));

  const [state, setState] = useState<IState>({
    showConfirmLogout: false,
  });

  const _tabs = [
    {
      key: APP_MY_COMMITMENT_SCREEN,
      label: 'Dashboard',
      barColor: colors.white,
      img: 'home',
      onPress: () => rootMyCommitmentScreen(),
    },
    {
      key: APP_TRANSACTIONS_SCREEN,
      label: 'Transaction',
      barColor: colors.white,
      img: 'list',
      onPress: () => rootTransactionScreen(),
    },
    {
      key: APP_SOS_SCREEN,
      label: 'S.O.S',
      barColor: colors.white,
      img: 'shield',
      onPress: async () => {
        const checkPermission = await permission.permissionMap();
        console.log(checkPermission, 'checkPermission');
        if (checkPermission) {
          const getLocation = await getCurrentPosition();
          const region = {
            latitude: getLocation.coords.latitude,
            longitude: getLocation.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          };
          console.log(region, 'r');
          rootSosScreen({region});
        }
      },
    },
  ];

  const getCurrentPosition = () => {
    try {
      return new Promise(
        (resolve: (position: GeolocationResponse) => void, reject: (error: GeolocationError) => void) => {
          Geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            // maximumAge: 10000,
          });
        },
      );
    } catch (error) {
      console.log(error, 'err');
      throw error;
    }
  };

  const _toggleModal = () => {
    setState((state: IState) => ({
      ...state,
      showConfirmLogout: !state.showConfirmLogout,
    }));
  };

  const _submitPaymentMethod = () => {
    _toggleModal();
  };

  const _handleTabPress = (newTab: any) => newTab.onPress();

  const _renderIcon = (tab: any) => ({isActive}) => (
    <Icon name={tab.img} type="font-awesome" size={ms(25)} color={isActive ? colors.silverTree : colors.darkNude} />
  );

  const _renderTab = ({tab, isActive}) => (
    <FullTab
      key={tab.key}
      isActive={isActive}
      label={tab.label}
      labelStyle={[styles.fullTabLabelStyle, {color: isActive ? colors.silverTree : colors.manatee}]}
      renderIcon={_renderIcon(tab)}
    />
  );

  return (
    <Fragment>
      <BottomNavigation
        activeTab={props.activeTab}
        renderTab={_renderTab}
        tabs={_tabs}
        onTabPress={_handleTabPress}
        useLayoutAnimation={true}
        style={styles.bottomNavigation}
      />

      <Modal animationType="fade" transparent={true} visible={state.showConfirmLogout}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModal}>
              <Icon type="font-awesome" name="ios-close" size={ms(25)} color={colors.manatee} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>
              Please submit a working credit card before you can continue using Pledger
            </Text>
            <View style={styles.modalGroupButton}>
              <ButtonComponent
                // styleContainer={{width: ms(114)}}
                styleButton={{backgroundColor: colors.red, borderColor: 'transparent'}}
                styleText={{fontSize: ms(13)}}
                text="Submit Payment Method"
                onPress={_submitPaymentMethod}
              />
            </View>
            <View style={styles.modalGroupButton}>
              <ButtonComponent
                // styleContainer={{width: ms(114)}}
                styleButton={{backgroundColor: 'transparent', borderColor: colors.manatee}}
                styleText={{fontSize: ms(13), color: colors.manatee}}
                text="Cancel"
                onPress={_toggleModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}
