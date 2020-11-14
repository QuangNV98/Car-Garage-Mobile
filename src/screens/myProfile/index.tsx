import AsyncStorage from '@react-native-community/async-storage';
import {RootState} from '@src/boot/rootReducers';
import {System} from '@src/constant';
import config from '@src/constant/config';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import ButtonComponent from '@src/containers/components/button';
import {logOutAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React, {Fragment} from 'react';
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {rootLoginScreen} from '../accounts/signin/navigation';
import {myProfileAccountSettingScreen} from './accountSettings';
import {myProfileConnectHealthkitScreen} from './connectHealthkit';
import {myProfileInviteFriendScreen} from './inviteFriends';
import {APP_PROFILE_SCREEN} from './navigation';
import {myProfilePaymentScreen} from './payment';
import {myProfilePersonalDataScreen} from './peronalData';
import {IProps, IState} from './propState';
import styles from './styles';
import {myProfileSupportScreen} from './support';
import {myProfileTAndCScreen} from './tAndC';

class MyProfileComponent extends React.Component<IProps> {
  state: IState = {
    avatar_img: this.props.avatar_img,
    showConfirmLogout: false,
  };

  list = [
    {
      title: 'Account Settings',
      icon: 'user',
      onPress: () => myProfileAccountSettingScreen(this.props.componentId),
    },
    {
      title: 'Invite Friends',
      icon: 'user-plus',
      onPress: () => myProfileInviteFriendScreen(this.props.componentId),
    },
    {
      title: 'Personal Data',
      icon: 'cog',
      onPress: () => myProfilePersonalDataScreen(this.props.componentId),
    },
    {
      title: 'Payment',
      icon: 'cc-stripe',
      onPress: () => myProfilePaymentScreen(this.props.componentId),
    },
    {
      title: 'Connect to Apple Health',
      icon: 'apple',
      onPress: () => myProfileConnectHealthkitScreen(this.props.componentId),
    },
    {
      title: 'Support',
      icon: 'question-circle',
      onPress: () => myProfileSupportScreen(this.props.componentId),
    },
    {
      title: 'Terms & Conditions',
      icon: 'file-alt',
      onPress: () => myProfileTAndCScreen(this.props.componentId),
    },
  ];

  _signout = () => {
    this.setState({showConfirmLogout: false}, async () => {
      this.props.logOutAction();
      AsyncStorage.setItem(System.PASS_STARTED, 'passed');
      await BackgroundTimer.stopBackgroundTimer();
      rootLoginScreen();
    });
  };

  _toggleModalLogout = () => {
    this.setState({showConfirmLogout: !this.state.showConfirmLogout});
  };

  render() {
    return (
      <Fragment>
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.headerImageContainer}>
              <Image
                style={styles.headerImage}
                source={
                  this.state.avatar_img
                    ? {uri: `${config.HOST_API}/${this.state.avatar_img}`}
                    : require('@src/assets/images/avatarDefault.png')
                }
              />
            </View>
            {this.list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                rightIcon={<Icon name={item.icon} color={colors.darkGray} size={ms(16)} solid={true} />}
                bottomDivider={true}
                containerStyle={styles.listItemContainer}
                titleStyle={styles.listItemText}
                onPress={item.onPress}
              />
            ))}
            <ButtonComponent
              onPress={this._toggleModalLogout}
              text="Log out"
              styleContainer={styles.menuBottomContainer}
              styleButton={styles.menuBottomButton}
              styleText={styles.menuBottomText}
              testID="btn-logout"
            />
          </View>
        </ScrollView>
        <BottomTabNavigation componentId={this.props.componentId} activeTab={APP_PROFILE_SCREEN} />
        <Modal animationType="fade" transparent={true} visible={this.state.showConfirmLogout}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalBtnClose} onPress={this._toggleModalLogout}>
                <Icon name="times" size={ms(20)} color={colors.manatee} />
              </TouchableOpacity>
              <Text style={styles.modalTile}>Are you sure you</Text>
              <Text style={styles.modalTile}>want to log out?</Text>
              <View style={styles.modalGroupButton}>
                <ButtonComponent
                  styleContainer={{width: ms(114)}}
                  styleButton={{backgroundColor: 'transparent', borderColor: colors.manatee}}
                  styleText={{fontSize: ms(13), color: colors.manatee}}
                  text="Cancel"
                  onPress={this._toggleModalLogout}
                />
                <ButtonComponent
                  styleContainer={{width: ms(114)}}
                  styleButton={{backgroundColor: colors.red, borderColor: 'transparent'}}
                  styleText={{fontSize: ms(13)}}
                  text="Log Out"
                  onPress={this._signout}
                />
              </View>
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  avatar_img: state.account.avatar,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logOutAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
