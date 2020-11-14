import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import Layout from '@src/containers/components/layout';
import {common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import {resendCodeAction, verifyCodeAction} from './redux/actions';
import styles from './styles';

class VerifyCodeComponent extends React.Component<IProps> {
  code: TextInput;
  state: IState = {
    code: '',
    errorMessage: '',
  };

  static getDerivedStateFromProps(props: IProps) {
    if (props.errorMess === 'Incorrect Verification Code!') {
      return {
        errorMessage: props.errorMess,
      };
    }
    return null;
  }

  _verifyCode = async () => {
    if (this.state.code.length < 6) {
      this.setState({
        code: '',
        errorMessage: 'Incorrect Verification Code!',
      });
    } else {
      this.props.verifyCodeAction(this.props.email, this.state.code);
      this.setState({
        code: '',
        // errorMessage: 'Incorrect Verification Code!',
      });
    }
  };

  _resendCode = async () => {
    this.props.resendCodeAction(this.props.email);
  };

  _onChangeText = (state: string, controlFocus?: string) => (evt: any) => {
    if (evt && controlFocus) {
      this[controlFocus].focus();
    }
    this.setState({[state]: evt});
  };

  render() {
    return (
      <Layout>
        <View style={common.container}>
          <View style={{marginTop: ms(26)}}>
            <Image style={styles.img} source={require('@src/assets/images/logo_main.png')} />
            <Text style={styles.title}>Verification Code</Text>
            <Text style={[styles.secText, common.mb30]}>We sent you a code to {this.props.email}</Text>
            <InputComponent
              ref={(input) => (this.code = input)}
              rightIcon="ios-eye"
              rightIconType="ionicon"
              placeholder="Enter a code"
              onChangeText={this._onChangeText('code')}
              keyboardType="number-pad"
              value={this.state.code}
              maxLength={6}
              errorMessage={this.state.errorMessage !== '' ? this.state.errorMessage : null}
            />
            <ButtonComponent
              btnFull={true}
              onPress={this._verifyCode}
              disabled={this.props.isLoading}
              text="Continue"
            />
            <View style={styles.bottomRowContainer}>
              <Text style={styles.text}>Didn't get the code?</Text>
              <TouchableOpacity onPress={this._resendCode} disabled={this.props.isLoading}>
                <Text style={common.textLink}>Resend code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  errorMess: state.common.errorMess,
  isLoading: state.common.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({verifyCodeAction, resendCodeAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeComponent);
