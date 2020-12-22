import {RootState} from '@src/boot/rootReducers';
import config from '@src/constant/config';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils';
import moment from 'moment';
import React, {useState} from 'react';
import {Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Header, ListItem} from 'react-native-elements';
import ImagePicker, {Image as IMG} from 'react-native-image-crop-picker';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {IProps, IState} from './propState';
import {
  changeEmailAction,
  changeFirstNameAction,
  changeLastNameAction,
  changePasswordAction,
  deleteAccountAction,
} from './redux/actions';
import {uploadPhoto} from './services';
import styles from './styles';

export default function AccountSettingComponent(props: IProps) {
  let current_password: TextInput = null;
  let new_password: TextInput = null;
  let repeat_password: TextInput = null;
  let email: TextInput = null;
  let first_name: TextInput = null;
  let last_name: TextInput = null;

  let ActionSheetSelectPhoto: ActionSheet = null;

  const dispatch = useDispatch();
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    email: state.account.email,
    first_name: state.account.first_name,
    last_name: state.account.last_name,
    avatar_img: state.account.avatar,
    changePasswordAction: (current_password: string, new_password: string) =>
      dispatch(changePasswordAction(current_password, new_password)),
    changeEmailAction: (new_email: string) => dispatch(changeEmailAction(new_email)),
    changeFirstNameAction: (new_first_name: string) => dispatch(changeFirstNameAction(new_first_name)),
    changeLastNameAction: (new_last_name: string) => dispatch(changeLastNameAction(new_last_name)),
    deleteAccountAction: () => dispatch(deleteAccountAction()),
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));

  const [state, setState] = useState<IState>({
    showModalEmail: false,
    showModalFirstName: false,
    showModalLastName: false,
    showModalChangePass: false,
    showModalDeleteAccount: false,
    current_password: '',
    new_password: '',
    repeat_password: '',
    email: props.email,
    first_name: props.first_name,
    last_name: props.last_name,
    avatar: null,
    avatar_img: props.avatar_img,
  });

  const _goBack = () => Navigation.pop(props.componentId);

  const account = useSelector((state: RootState) => state.account);

  const _toggleModalEmail = () =>
    setState((state: IState) => ({...state, showModalEmail: !state.showModalEmail, email: account.email}));

  const _toggleModalFirstName = () =>
    setState((state: IState) => ({
      ...state,
      showModalFirstName: !state.showModalFirstName,
      first_name: account.first_name,
    }));

  const _toggleModalLastName = () =>
    setState((state: IState) => ({
      ...state,
      showModalLastName: !state.showModalLastName,
      last_name: account.last_name,
    }));

  const _toggleModalChangePass = () =>
    setState((state: IState) => ({
      ...state,
      showModalChangePass: !state.showModalChangePass,
      current_password: '',
      new_password: '',
      repeat_password: '',
    }));

  const _toggleModalDeleteAccount = () =>
    setState((state: IState) => ({...state, showModalDeleteAccount: !state.showModalDeleteAccount}));

  const validatePassword = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validatePassword(state.new_password)) {
      isValid = 'Password must be at least 8 characters!';
      controlFocus = new_password;
    }

    if (!state.repeat_password) {
      isValid = 'All fields are required';
      controlFocus = repeat_password;
    }

    if (!state.current_password) {
      isValid = 'All fields are required';
      controlFocus = current_password;
    }

    if (state.new_password === state.current_password) {
      isValid = 'New password must be different from current password';
      controlFocus = new_password;
    }

    if (!state.new_password) {
      isValid = 'All fields are required';
      controlFocus = new_password;
    }

    if (state.new_password !== state.repeat_password) {
      isValid = "The confirm password and new password don't match";
      controlFocus = repeat_password;
    }
    return {isValid, controlFocus};
  };

  const validateEmail = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateEmail(state.email)) {
      isValid = 'Please enter a valid email';
      controlFocus = email;
    }

    return {isValid, controlFocus};
  };

  const validateFirstName = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateName(state.first_name)) {
      isValid = 'Please enter the first name!';
      controlFocus = first_name;
    }

    return {isValid, controlFocus};
  };

  const validateLastName = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateName(state.last_name)) {
      isValid = 'Please enter the last name!';
      controlFocus = last_name;
    }

    return {isValid, controlFocus};
  };

  const _onChangeText = (value: string, controlFocus?: TextInput) => (evt: any) => {
    if (evt && controlFocus) {
      controlFocus.focus();
    }
    setState((state: IState) => ({...state, [value]: evt}));
  };

  const _changePassword = () => {
    const {isValid, controlFocus} = validatePassword();
    if (!isValid) {
      setState((state: IState) => ({...state, showModalChangePass: !state.showModalChangePass}));
      props.changePasswordAction(state.current_password, state.new_password);
      setState((state: IState) => ({...state, current_password: '', new_password: '', repeat_password: ''}));
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _changeEmail = () => {
    const {isValid, controlFocus} = validateEmail();
    if (!isValid) {
      setState((state: IState) => ({...state, showModalEmail: !state.showModalEmail}));
      props.changeEmailAction(state.email);
      // account.email = state.email;
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _changeFirstName = () => {
    const {isValid, controlFocus} = validateFirstName();
    if (!isValid) {
      setState((state: IState) => ({...state, showModalFirstName: !state.showModalFirstName}));
      props.changeFirstNameAction(state.first_name);
      account.first_name = state.first_name;
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _changeLastName = () => {
    const {isValid, controlFocus} = validateLastName();
    if (!isValid) {
      setState((state: IState) => ({...state, showModalLastName: !state.showModalLastName}));
      props.changeLastNameAction(state.last_name);
      account.last_name = state.last_name;
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _deleteAccount = () => {
    setState((state: IState) => ({...state, showModalDeleteAccount: !state.showModalDeleteAccount}));
    props.deleteAccountAction();
  };

  const _uploadAvatar = (index) => {
    switch (index) {
      case 0:
        ImagePicker.openCamera({
          compressImageQuality: 0.1,
        }).then(async (image) => {
          const formData = new FormData();
          const img = {
            uri: (image as IMG).path,
            type: (image as IMG).mime || 'image/jpeg',
            name: (image as IMG).filename || moment(new Date()).format('hmmssMMDDYY') + '.jpg',
          };
          formData.append('img', img as any);
          props.onLoadingAction();
          await uploadPhoto(formData)
            .then((response) => {
              if (response && response.data) {
                account.avatar = response.data;
                setState((state: IState) => ({...state, avatar: image as IMG, avatar_img: null}));
              } else {
                Alert.alert('Error', 'Server is busy');
              }
            })
            .catch(() => {
              return;
            });
          props.offLoadingAction();
        });
        break;
      case 1:
        ImagePicker.openPicker({
          multiple: false,
          mediaType: 'photo',
          compressImageQuality: 0.1,
        })
          .then(async (image) => {
            const formData = new FormData();
            const img = {
              uri: (image as IMG).path,
              type: (image as IMG).mime || 'image/jpeg',
              name: (image as IMG).filename || moment(new Date()).format('hmmssMMDDYY') + '.jpg',
            };
            formData.append('img', img as any);
            props.onLoadingAction();
            await uploadPhoto(formData).then((response) => {
              if (response && response.data) {
                account.avatar = response.data;
                setState((state: IState) => ({...state, avatar: image as IMG, avatar_img: null}));
              } else {
                Alert.alert('Error', 'Server is busy');
              }
            });
            props.offLoadingAction();
          })
          .catch(() => {
            return;
          });
        break;
      default:
        break;
    }
  };

  const onPressAddPhotoBtn = () => {
    ActionSheetSelectPhoto.show();
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Account Settings',
          style: styles.headerCenter,
        }}
      />
      <ScrollView style={common.flex_1}>
        <View style={styles.headerImageContainer}>
          <TouchableOpacity style={common.flexColumnCenter} onPress={onPressAddPhotoBtn}>
            <Image
              style={styles.headerImage}
              source={
                state.avatar_img
                  ? {uri: `${config.HOST_API}/${state.avatar_img}`}
                  : !state.avatar
                  ? require('@src/assets/images/avatarDefault.png')
                  : {uri: `${state.avatar.path}`}
              }
            />
            <Icon name="camera" size={ms(14)} color={colors.white} style={{position: 'absolute'}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onPressAddPhotoBtn}>
          <Text style={styles.txtChangePhoto}>Change photo</Text>
        </TouchableOpacity>
        <View style={common.container}>
          <ListItem
            title="Email"
            rightTitle={props.email.length > 25 ? props.email.slice(0, 22).concat('...') : props.email}
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={styles.listItemText}
            rightTitleStyle={styles.listItemTextRight}
            onPress={_toggleModalEmail}
          />
          <ListItem
            title="First Name"
            rightTitle={props.first_name}
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={styles.listItemText}
            rightTitleStyle={styles.listItemTextRight}
            onPress={_toggleModalFirstName}
          />
          <ListItem
            title="Last Name"
            rightTitle={props.last_name}
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={styles.listItemText}
            rightTitleStyle={styles.listItemTextRight}
            onPress={_toggleModalLastName}
          />
          <ListItem
            title="Password"
            rightTitle="* * * * * *"
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={styles.listItemText}
            rightTitleStyle={styles.listItemTextRight}
            onPress={_toggleModalChangePass}
          />
          <ListItem
            title="Delete Account"
            bottomDivider={true}
            containerStyle={styles.listItemContainer}
            titleStyle={[styles.listItemText, {color: colors.red}]}
            onPress={_toggleModalDeleteAccount}
          />
        </View>
        <ActionSheet
          ref={(o) => (ActionSheetSelectPhoto = o)}
          title={'Select photo'}
          options={['Take Photo...', 'Choose from Library...', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={_uploadAvatar}
          on={true}
        />
      </ScrollView>
      {/* Modal change email */}
      <Modal animationType="fade" transparent={true} visible={state.showModalEmail}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalEmail}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Email</Text>
            <InputComponent
              ref={(input) => (email = input)}
              autoCapitalize="none"
              value={state.email}
              placeholder="Email address"
              onChangeText={_onChangeText('email')}
              containerStyle={styles.inputEmail}
            />
            <ButtonComponent text="Save" styleContainer={[common.mt30, common.mb20]} onPress={_changeEmail} />
          </View>
        </View>
      </Modal>
      {/* Modal change FirstName */}
      <Modal animationType="fade" transparent={true} visible={state.showModalFirstName}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalFirstName}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>First Name</Text>
            <InputComponent
              ref={(input) => (first_name = input)}
              value={state.first_name}
              placeholder="Enter your name"
              onChangeText={_onChangeText('first_name')}
            />
            <ButtonComponent text="Save" styleContainer={common.mt20} onPress={_changeFirstName} />
          </View>
        </View>
      </Modal>
      {/* Modal change LastName */}
      <Modal animationType="fade" transparent={true} visible={state.showModalLastName}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalLastName}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Last Name</Text>
            <InputComponent
              ref={(input) => (last_name = input)}
              value={state.last_name}
              placeholder="Enter your name"
              onChangeText={_onChangeText('last_name')}
            />
            <ButtonComponent text="Save" styleContainer={common.mt20} onPress={_changeLastName} />
          </View>
        </View>
      </Modal>
      {/* Modal change pass */}
      <Modal animationType="fade" transparent={true} visible={state.showModalChangePass}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalChangePass}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Password</Text>
            <InputComponent
              ref={(input) => (current_password = input)}
              value={state.current_password}
              secureTextEntry={true}
              placeholder="Current password"
              onChangeText={_onChangeText('current_password')}
            />
            <InputComponent
              ref={(input) => (new_password = input)}
              value={state.new_password}
              secureTextEntry={true}
              placeholder="New password"
              onChangeText={_onChangeText('new_password')}
            />
            <InputComponent
              ref={(input) => (repeat_password = input)}
              value={state.repeat_password}
              secureTextEntry={true}
              placeholder="Repeat password"
              onChangeText={_onChangeText('repeat_password')}
            />
            <ButtonComponent text="Save" styleContainer={common.mt20} onPress={_changePassword} />
          </View>
        </View>
      </Modal>
      {/* Modal delete account */}
      <Modal animationType="fade" transparent={true} visible={state.showModalDeleteAccount}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalDeleteAccount}>
              <Icon name="times" size={ms(20)} color={colors.manatee} />
            </TouchableOpacity>
            <Text style={[styles.modalTile, {color: colors.red}]}>Attention!</Text>
            <Text style={styles.modalValueChange}>You will lose all your data</Text>
            <View style={styles.deleteAccountView}>
              <ButtonComponent
                text="Cancel"
                styleContainer={styles.cancleBtn}
                styleButton={{backgroundColor: 'transparent', borderColor: colors.manatee}}
                styleText={{color: colors.manatee}}
                onPress={_toggleModalDeleteAccount}
              />
              <ButtonComponent
                text="Delete"
                styleButton={{backgroundColor: colors.red, borderColor: colors.red}}
                onPress={_deleteAccount}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
