import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils/index';
import React, {Fragment} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {rootLoginScreen} from '../signin/navigation';
import {rootSignupScreen} from '../signup/navigation';
import {IProps, IState} from './propState';
import {forgotPasswordAction} from './redux/actions';
import styles from './styles';

class ForgotPasswordComponent extends React.Component<IProps> {
  email: TextInput;

  state: IState = {
    email: '',
  };

  validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateEmail(this.state.email)) {
      isValid = 'Please enter a valid email';
      controlFocus = this.email;
    }
    return {isValid, controlFocus};
  };

  _resetPassword = () => {
    const {isValid, controlFocus} = this.validate();
    if (!isValid) {
      this.props.forgotPasswordAction(this.state.email);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _signup = () => rootSignupScreen();

  _signin = () => rootLoginScreen();

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  render() {
    return (
      <>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <ScrollView style={common.container}>
          <View style={{marginHorizontal: ms(20), marginTop: ms(26)}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={this._signin} style={{flex: ms(0.1)}}>
                <Icon name="chevron-left" size={ms(20)} />
              </TouchableOpacity>
              <View style={{flex: ms(0.9)}}>
                <Image style={styles.img} source={require('@src/assets/images/logo_main.png')} />
              </View>
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.secText}>Enter your email address below and we will send you a new password</Text>
            <InputComponent
              ref={(input: any) => (this.email = input)}
              leftIcon="ios-mail"
              leftIconType="ionicon"
              placeholder="Email address"
              autoCapitalize="none"
              onChangeText={this._onChangeText('email')}
              value={this.state.email}
              containerStyle={{marginTop: ms(29)}}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomFixed}>
          <ButtonComponent
            btnFull={true}
            onPress={this._resetPassword}
            text="Reset Password"
            disabled={this.props.isLoading}
            styleContainer={{marginHorizontal: ms(44)}}
          />
        </View>
        {/* </TouchableWithoutFeedback> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoading: state.common.isLoading});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({forgotPasswordAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);
