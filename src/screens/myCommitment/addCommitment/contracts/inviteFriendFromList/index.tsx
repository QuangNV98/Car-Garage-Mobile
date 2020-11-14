import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import LoadingComponent from '@src/containers/components/loading';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {inviteFriendAction} from '../redux/actions';
import {IProps, IState} from './propState';
import styles from './styles';

class InviteFriendFromListModalComponent extends React.Component<IProps> {
  email: TextInput;

  state: IState = {
    email: '',
    checkFriend: false,
    status: '',
    name: '',
  };

  keyExtractor = (item, index) => index.toString();

  checkFriend = (email_friend: string, name_friend: string, email_status: string) => () => {
    if (this.state.email === email_friend) {
      this.setState({
        email: '',
        name: '',
      });
    } else {
      this.setState({
        email: email_friend,
        name: name_friend,
        status: email_status,
      });
    }
  };

  renderItem = ({item}) => (
    <>
      <ListItem
        title={
          item.name_friend
            ? item.name_friend
            : item.email_friend.length > 20
            ? item.email_friend.slice(0, 15).concat('...')
            : item.email_friend
        }
        titleStyle={{fontSize: 13}}
        leftAvatar={{
          source: require('@src/assets/images/avatarDefault.png'),
          title: item.name_friend
            ? item.name_friend
            : item.email_friend.length > 25
            ? item.email_friend.slice(0, 22).concat('...')
            : item.email_friend,
        }}
        rightIcon={
          <TouchableOpacity onPress={this.checkFriend(item.email_friend, item.name_friend, item.status)}>
            <IconIonic
              name={this.state.email === item.email_friend ? 'ios-checkmark-circle' : 'ios-radio-button-off'}
              size={ms(34)}
              color={colors.silverTree}
            />
          </TouchableOpacity>
        }
        style={{marginBottom: -10}}
      />
    </>
  );

  _sendEmail = async () => {
    if (this.state.email === '') {
      Alert.alert('Error', 'Please choose a friend from the list to stake against');
    } else {
      this.props.hideModal();
      this.props.selectEmail(this.state.email, this.state.name, this.state.status);
      this.setState({
        email: '',
        status: '',
      });
    }
  };

  render() {
    const heightFlatList = this.props.listFriend.data.length > 4 ? 300 : this.props.listFriend.data.length * 60;
    return (
      <Modal isVisible={this.props.modalStatus}>
        <View style={[styles.modalContainer]}>
          <TouchableOpacity style={common.modalClose} onPress={this.props.hideModal}>
            <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.silverTree} />
          </TouchableOpacity>
          <View style={common.flexColumn}>
            <Text style={[styles.title, common.mt30]}>Invite from the list</Text>
            <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
          </View>
          {this.props.listFriend.data.length > 0 ? (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.listFriend.data}
              renderItem={this.renderItem}
              style={{height: heightFlatList}}
              extraData={this.state}
            />
          ) : (
            <LoadingComponent />
          )}
          <ButtonComponent text="Add" styleContainer={common.mt20} onPress={this._sendEmail} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriendFromListModalComponent);
