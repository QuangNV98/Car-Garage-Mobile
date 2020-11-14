import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils';
import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {IProps, IState} from './propState';
import {inviteFriends} from './services';
import styles from './styles';

export default function InviteFriendComponent(props: IProps) {
  let email: TextInput = null;
  let name: TextInput = null;

  const dispatch = useDispatch();
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isLoading: state.common.isLoading,
    email_account: state.account.email,
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));

  const [state, setState] = useState<IState>({
    email: '',
    name: '',
  });

  const validateEmail = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateEmail(state.email)) {
      isValid = 'Please enter a valid email';
      controlFocus = email;
    }
    if (!validation.validateName(state.name)) {
      isValid = 'Please enter a valid name';
      controlFocus = name;
    }
    if (state.email === props.email_account) {
      isValid = "Please enter your friend's email";
      controlFocus = email;
    }

    return {isValid, controlFocus};
  };

  const _onChangeText = (value: string, controlFocus?: TextInput) => (evt: any) => {
    if (evt && controlFocus) {
      controlFocus.focus();
    }
    setState((state: IState) => ({...state, [value]: evt}));
  };

  const _inviteFriends = async () => {
    const {isValid, controlFocus} = validateEmail();
    if (!isValid) {
      props.onLoadingAction();
      await inviteFriends(state.email, state.name);
      props.offLoadingAction();
      setState((state: IState) => ({...state, email: '', name: ''}));
      Alert.alert('Success', 'Your invitation is on its way!', [
        {
          text: 'OK',
          onPress: () => _goBack(),
        },
      ]);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _goBack = () => Navigation.pop(props.componentId);

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{text: 'Invite Friends', style: styles.headerCenter}}
        containerStyle={styles.headerContainer}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.container}>
        {/* <View style={common.container}> */}
        <Text style={styles.text}>Invite your friends (or enemies) to make a Pledge to enter their emails below:</Text>
        <InputComponent
          ref={(input) => (name = input)}
          value={state.name}
          autoCapitalize="words"
          placeholder="Friend's name"
          containerStyle={styles.containerStyleInput}
          onChangeText={_onChangeText('name')}
        />
        <InputComponent
          ref={(input) => (email = input)}
          value={state.email}
          autoCapitalize="none"
          placeholder="Email address"
          containerStyle={styles.containerStyleInputEmail}
          onChangeText={_onChangeText('email')}
        />
        <ButtonComponent text="Send" onPress={_inviteFriends} disabled={props.isLoading} />
        <Text style={styles.text}>or share a link with them</Text>
        <InputComponent
          ref={(input) => (this.email = input)}
          autoCapitalize="none"
          value="Link"
          rightIcon="ios-copy"
          rightIconType="ionicon"
          rightIconStyle={common.colorPrimary}
          editable={false}
          selectTextOnFocus={false}
          containerStyle={styles.containerStyleInput}
        />
        {/* </View> */}
      </KeyboardAwareScrollView>
    </>
  );
}
