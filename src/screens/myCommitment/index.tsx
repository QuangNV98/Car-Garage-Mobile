import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import config from '@src/constant/config';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import Layout from '@src/containers/components/layout';
import {saveCommitmentStatusAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import React, {FC, useEffect} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {rootProfileScreen} from '../myProfile/navigation';
import {ListCommitmentComponent} from './listCommitments';
import {APP_MY_COMMITMENT_SCREEN} from './navigation';
import {IProps} from './propState';
import {getListCommitmentAction} from './redux/actions';
import {addCommitmentStartRunningScreen} from './startRunning/navigation';
import styles from './styles';

export const MyCommitmentComponent: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    avatar_img: state.account.avatar,
    fullname: `${state.account.first_name}`,
    countActive: state.screens.myCommitments.list.countActive,
    countFinish: state.screens.myCommitments.list.countFinish,
    status_id: state.common.status.status_id,
    status_name: state.common.status.status_name,
    getListCommitmentAction: (pageNumber: number, status: string) =>
      dispatch(getListCommitmentAction(pageNumber, status)),
    saveCommitmentStatusAction: (status) => dispatch(saveCommitmentStatusAction(status)),
  }));

  useEffect(() => {
    AsyncStorage.getItem(System.BACKGROUND_TIMER).then((res) => {
      const backgroundTimer = JSON.parse(res);
      if (backgroundTimer) {
        const item = backgroundTimer.item;
        if (item) {
          Alert.alert('Warning', 'There is a timer running. Please finish it before starting a new timer', [
            {
              text: 'OK',
              onPress: () => addCommitmentStartRunningScreen(props.componentId, {item}),
            },
          ]);
        }
      }
    });
  }, []);

  const goToAccountSettings = () => rootProfileScreen();

  const _goalOnValueChange = (value: number) => {
    if (parseInt(value.toString()) === 0)
      props.saveCommitmentStatusAction({status_name: 'ACTIVE', status_id: 1, loading: true});
    else if (parseInt(value.toString()) === 1)
      props.saveCommitmentStatusAction({status_name: 'FINISH', status_id: 2, loading: true});
    else if (parseInt(value.toString()) === 2)
      props.saveCommitmentStatusAction({status_name: 'FAIL', status_id: 3, loading: true});
  };

  const renderSelect = (index, sectionID, rowID, highlightRow) => {
    console.log(sectionID, 'sectionID');
    console.log(rowID, 'rowID');
    console.log(highlightRow, 'highlightRow');
    return (
      <View style={styles.itemSelect}>
        <Text style={styles.textSelect}>{index}</Text>
        {/* if active will show Icon */}
        <Icon name="left" type="antdesign" color="white" containerStyle={styles.iconSelect} size={18} />
      </View>
    );
  };
  const renderSeparator = () => {
    return false;
  };

  return (
    <Layout>
      <View style={[common.container, common.flex_0]} accessibilityLabel="commitment-tab-content">
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Hello,</Text>
            <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />

            <View style={[common.flexRow, common.alignItemsCenter]}>
              <Text style={styles.name}>{props.fullname}!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={goToAccountSettings}>
            <Image
              style={styles.avatar}
              source={
                props.avatar_img
                  ? {uri: `${config.HOST_API}/${props.avatar_img}`}
                  : require('@src/assets/images/avatarDefault.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemSubtext}>Active {props.countActive !== 1 ? 'Pledges' : 'Pledge'}</Text>
            <Text style={styles.numberCount}>{props.countActive}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemSubtext}>Honored {props.countFinish !== 1 ? 'Pledges' : 'Pledge'}</Text>
            <Text style={styles.numberCount}>{props.countFinish}</Text>
          </View>
        </View>
        <View style={styles.wrapListTitle}>
          <Text style={styles.listTitle}>Pledges</Text>
          <View style={[common.flexRow, common.alignItemsCenter, common.pr10]}>
            <ModalDropdown
              style={styles.selectWrap}
              textStyle={styles.selectText}
              dropdownStyle={styles.selectDropdown}
              dropdownTextStyle={styles.dropdownTextStyle}
              options={['Active', 'Honored', 'Dishonored']}
              renderRow={renderSelect}
              // accessible={false}
              renderSeparator={renderSeparator}
              defaultValue={
                props.status_name === 'FINISH' ? 'Honored' : props.status_name === 'FAIL' ? 'Dishonored' : 'Active'
              }
              onSelect={_goalOnValueChange}
            />
            <Icon name="down" type="antdesign" color={colors.silverTree} size={18} />
          </View>
        </View>
      </View>
      <ListCommitmentComponent componentId={props.componentId} />
      <BottomTabNavigation
        componentId={props.componentId}
        activeTab={APP_MY_COMMITMENT_SCREEN}
        showAddCommitments={true}
      />
    </Layout>
  );
};
