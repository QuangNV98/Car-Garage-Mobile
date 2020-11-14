import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {colors, common} from '@src/styles';
import {validation} from '@src/utils';
import React from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import {createNewPasswordAction} from './redux/actions';
import styles from './styles';
import {vs} from '@src/styles/scalingUtils';

class CreateNewPasswordComponent extends React.Component<IProps> {
  password: TextInput;
  new_password: TextInput;

  state: IState = {
    repeate_password: '',
    new_password: '',
  };

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validatePassword(this.state.new_password)) {
      isValid = 'Password must be at least 8 characters!';
      controlFocus = this.password;
    }

    if (!this.state.new_password) {
      isValid = 'All fields are required';
      controlFocus = this.new_password;
    }

    if (!this.state.repeate_password) {
      isValid = 'All fields are required';
      controlFocus = this.password;
    }

    if (this.state.repeate_password !== this.state.new_password) {
      isValid = "The repeate password and new password don't match";
      controlFocus = this.new_password;
    }
    return {isValid, controlFocus};
  };

  _changePassword = () => {
    const {isValid, controlFocus} = this.validate();
    if (!isValid) {
      this.props.createNewPasswordAction(this.props.email, this.state.new_password);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  render() {
    return (
      <>
        {/* <Header /> */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={common.flex_1}
          style={common.container}
          enableOnAndroid={true}>
          <View>
            <Image style={styles.img} source={require('@src/assets/images/logo_main.png')} />
            <Text style={styles.title}>Create new password</Text>
            <Text style={styles.secText}>Your new password must be at least 8 characters long</Text>
            <InputComponent
              placeholder="New password"
              onChangeText={this._onChangeText('new_password')}
              secureTextEntry={true}
              style={styles.inputPassword}
            />
            <InputComponent
              placeholder="Repeat password"
              containerStyle={{marginBottom: vs(100)}}
              onChangeText={this._onChangeText('repeate_password')}
              secureTextEntry={true}
              style={styles.inputPassword}
            />
            <ButtonComponent
              btnFull={true}
              text="Submit"
              onPress={this._changePassword}
              styleButton={styles.btnSubmit}
              disabled={this.props.isLoading}
            />
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({accountInfo: state.account, isLoading: state.common.isLoading});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({createNewPasswordAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPasswordComponent);
