import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils';
import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {inviteFriendAction} from '../redux/actions';
import {getAccountByEmail} from '../services';
import {IProps, IState} from './propState';
import styles from './styles';

class InviteFriendModalComponent extends React.Component<IProps> {
  email: TextInput;
  name: TextInput;

  state: IState = {
    email: '',
    checkFriend: false,
    status: '',
    name: '',
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  _sendEmail = async () => {
    if (!this.state.email || this.state.email === this.props.account_email) {
      Alert.alert('Error', "Please enter your friend's email!", [{text: 'OK', onPress: () => this.email.focus()}]);
      this.setState({
        email: '',
        name: '',
      });
    } else if (!validation.validateEmail(this.state.email)) {
      Alert.alert('Error', 'Invalid E-mail address!');
      this.setState({
        email: '',
        name: '',
      });
    } else {
      this.props.onLoadingAction();
      this.props.hideModal();
      const result = await getAccountByEmail(this.state.email);
      if (result && this.state.email === result.email) {
        this.setState({
          status: 'ACTIVE',
        });
      } else {
        this.setState({
          status: 'IN_ACTIVE',
        });
      }
      this.props.offLoadingAction();
      this.props.selectEmail(this.state.email, this.state.name, this.state.status);
      this.setState({
        email: '',
        status: '',
        name: '',
      });
    }
  };

  _selectEmail = (email_friend: string, name_friend: string) => () => this.props.selectEmail(email_friend, name_friend);

  // _renderComment = ({item, index}) => (
  //   <TouchableOpacity
  //     key={`item_${index}`}
  //     style={[common.rowContainer, common.alignItemsCenter]}
  //     onPress={this._selectEmail(item.email_friend, null)}>
  //     <Image source={require('@src/assets/images/avatarDefault.png')} />
  //     <View>
  //       <Text>{item.email_friend}</Text>
  //       {item.status === 'IN_ACTIVE' ? <Text>Awaiting response</Text> : null}
  //     </View>
  //   </TouchableOpacity>
  // );

  // _itemFriend = ({item}) => (
  //   <View style={styles.itemFriend}>
  //     <View style={styles.wrapAvatar}>
  //       <Image style={styles.avatar} source={require('@src/assets/images/avatarDefault.png')} />
  //       <Text>{item.email_friend}</Text>
  //     </View>
  //     <CheckBox
  //       key={item.id}
  //       title={item.email_friend}
  //       iconRight={true}
  //       iconType="ionicon"
  //       checkedIcon="ios-checkmark-circle"
  //       uncheckedIcon="ios-radio-button-off"
  //       checkedColor={colors.silverTree}
  //       checked={this.state.email === item.email_friend ? true : false}
  //       containerStyle={styles.checkBoxFriend}
  //       textStyle={styles.checkboxLabel}
  //       onPress={this._isCheckFriend(item.email_friend, item.status)}
  //     />
  //   </View>
  // );

  // _isCheckFriend = (email_friend: string, email_status: string) => () => {
  //   if (this.state.email === email_friend) {
  //     this.setState({
  //       email: '',
  //     });
  //   } else {
  //     this.setState({
  //       email: email_friend,
  //       status: email_status,
  //     });
  //   }
  // };

  render() {
    return (
      <Modal isVisible={this.props.modalStatus}>
        <View style={[common.modalContainer, {position: 'absolute'}]}>
          <TouchableOpacity style={common.modalClose} onPress={this.props.hideModal}>
            <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.silverTree} />
          </TouchableOpacity>
          <View>
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : null}
                keyboardVerticalOffset={ms(70)}
                enabled={true}>
                <ScrollView>
                  <Image source={require('@src/assets/images/Group239.png')} style={styles.headerImage} />
                  <View style={common.flexColumn}>
                    <Text style={[styles.title, common.mt20]}>Invite your friend</Text>
                    <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
                  </View>
                  <Text style={[styles.text, common.mt10]}>Got a friend or enemy you would hate</Text>
                  <Text style={styles.text}>to lose your hard earned cash to?</Text>
                  <Text style={[styles.text, common.mb15]}>Invite them to keep you motivated</Text>
                  <InputComponent
                    ref={(input) => (this.name = input)}
                    autoCapitalize="words"
                    placeholder="Friend's name"
                    value={this.state.name}
                    onChangeText={this._onChangeText('name')}
                  />
                  <InputComponent
                    ref={(input) => (this.email = input)}
                    autoCapitalize="none"
                    placeholder="Friend's email"
                    value={this.state.email}
                    onChangeText={this._onChangeText('email')}
                  />
                  <ButtonComponent onPress={this._sendEmail} text="Send" styleContainer={common.mt20} />
                </ScrollView>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    listFriend: state.screens.myCommitments.listFriends,
    account_email: state.account.email,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({inviteFriendAction, offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendModalComponent);
