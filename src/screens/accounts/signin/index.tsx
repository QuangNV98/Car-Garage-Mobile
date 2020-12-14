import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import Layout from '@src/containers/components/layout';
import {rootForgotPasswordScreen} from '@src/screens/accounts/forgotPassword/navigation';
import {rootNotificationScreen} from '@src/screens/notifications/navigation';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils/index';
import React from 'react';
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {rootSignupScreen} from '../signup/navigation';
import {IProps, IState} from './propState';
import {logInAction} from './redux/actions';
import styles from './styles';
import {rootMyCommitmentScreen} from '@src/screens/myCommitment/navigation';


class LoginComponent extends React.Component<IProps> {
  email: TextInput;
  password: TextInput;

  state: IState = {
    email: '',
    password: '',
    disabledPass: true,
  };

  validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    // if (!this.state.password) {
    //   isValid = 'All fields are required';
    //   controlFocus = this.password;
    // }
    // if (!validation.validateEmail(this.state.email)) {
    //   isValid = 'Please enter a valid email';
    //   controlFocus = this.email;
    // }
    return {isValid, controlFocus};
  };

  _login = () => {
    // const {isValid, controlFocus} = this.validate();
    // if (!isValid) {
      this.props.logInAction(this.state.email, this.state.password);
      // rootMyCommitmentScreen();

    // } else {
    //   Alert.alert('Error', isValid, [
    //     {
    //       text: 'OK',
    //       onPress: () => (controlFocus ? controlFocus.focus() : null),
    //     },
    //   ]);
    // }
  };

  _goNoti = () => rootNotificationScreen();

  _signup = () => rootSignupScreen();

  _forgotPassword = () => rootForgotPasswordScreen();

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  togglePassword = () => {
    this.setState({
      disabledPass: !this.state.disabledPass,
    });
  };

  render() {
    return (
      <>
        <View style={{backgroundColor: colors.bgColor, flex: 1}}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={[common.container, {paddingHorizontal: ms(28), marginTop: ms(26)}]}
            accessibilityLabel="login-page">
            <Text style={styles.title}>Sign In</Text>
            <InputComponent
              accessibilityLabel="email"
              ref={(input) => (this.email = input)}
              leftIcon="ios-mail"
              leftIconType="ionicon"
              autoCapitalize="none"
              placeholder="Email address"
              onChangeText={this._onChangeText('email')}
              value={this.state.email}
            />
            <InputComponent
              accessibilityLabel="password"
              ref={(input) => (this.password = input)}
              leftIcon="ios-lock"
              leftIconType="ionicon"
              rightIcon={this.state.disabledPass ? 'ios-eye-off' : 'ios-eye'}
              rightIconType="ionicon"
              placeholder="Password"
              secureTextEntry={this.state.disabledPass}
              rightIconOnPress={this.togglePassword}
              onChangeText={this._onChangeText('password')}
              value={this.state.password}
            />
            
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.bottomFixed}>
          <ButtonComponent
            btnFull={true}
            text="Sign In"
            disabled={this.props.isLoading}
            styleContainer={{marginHorizontal: ms(44)}}
            onPress={this._login}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoading: state.common.isLoading});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logInAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
