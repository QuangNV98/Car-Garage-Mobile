import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import config from '@src/constant/config';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import Layout from '@src/containers/components/layout';
import {saveCommitmentStatusAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import React, {FC, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {rootProfileScreen} from '../myProfile/navigation';
import {ListCommitmentComponent} from './listCommitments';
import {APP_MY_COMMITMENT_SCREEN} from './navigation';
import {IProps, IState} from './propState';
import {getListCommitmentAction} from './redux/actions';
import {addCommitmentStartRunningScreen} from './startRunning/navigation';
import styles from './styles';
import {logOutAction} from '@src/containers/redux/common/actions';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import ButtonComponent from '@src/containers/components/button';
import IconE from 'react-native-vector-icons/FontAwesome5';

export const MyCommitmentComponent: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: any) => ({
    ...props,
    account: state.account,
    logOutAction: () => dispatch(logOutAction()),
  }));
  const [state, setState] = useState<any>({
    showConfirmLogout: false,
    user: null
  });

  const _signout = () => {
    setState((state: IState) => ({...state, showConfirmLogout: !state.showConfirmLogout}));
    props.logOutAction();
    rootLoginScreen();
  };

  const _toggleModalLogout = () => {
    setState((state: IState) => ({...state, showConfirmLogout: !state.showConfirmLogout}));
  };

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    const user = await AsyncStorage.getItem(System.USER_INFO);
    setState((state: IState) => ({...state, user}));
  }

  return (
    <>
      <View style={[common.container, common.flex_0]} accessibilityLabel="commitment-tab-content">
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Hello,</Text>
            <View style={[common.flexRow, common.alignItemsCenter]}>
              <Text style={styles.name}>{JSON.parse(state.user)?.NAME}!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={_toggleModalLogout}>
            <Icon name="sign-out" type="font-awesome" color={colors.silverTree} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ListCommitmentComponent componentId={props.componentId} />
      <BottomTabNavigation
        componentId={props.componentId}
        activeTab={APP_MY_COMMITMENT_SCREEN}
        showAddCommitments={true}
      />
      <Modal animationType="fade" transparent={true} visible={state.showConfirmLogout}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalLogout}>
              <IconE name="times" size={20} color={colors.manatee} />
            </TouchableOpacity>
            {/* <Text style={styles.modalTile}>Are you sure you</Text>
            <Text style={styles.modalTile}>want to log out?</Text> */}
            <View style={styles.modalGroupButton}>
              <ButtonComponent
                styleContainer={{width: 114}}
                styleButton={{backgroundColor: 'transparent', borderColor: colors.manatee}}
                styleText={{fontSize: 13, color: colors.manatee}}
                text="Cancel"
                onPress={_toggleModalLogout}
              />
              <ButtonComponent
                styleContainer={{width: 114}}
                styleButton={{backgroundColor: colors.red, borderColor: 'transparent'}}
                styleText={{fontSize: 13}}
                text="Log Out"
                onPress={_signout}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
