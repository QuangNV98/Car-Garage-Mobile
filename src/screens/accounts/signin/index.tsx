import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {rootNotificationScreen} from '@src/screens/notifications/navigation';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils/index';
import React from 'react';
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import {logInAction} from './redux/actions';
import styles from './styles';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

class LoginComponent extends React.Component<any> {
  email: TextInput;
  password: TextInput;

  state: IState = {
    email: '',
    password: '',
    disabledPass: true,
  };
  async componentDidMount() {
    console.log('vao');
    this.checkPermission();
    this.createNotificationListeners();
  }

  async createNotificationListeners() {
    //Tạo channel
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);

    //Vietnamese explain: khi đang ở foreground => show alert khi có noti
    this.notificationListener = firebase.notifications().onNotification((noti) => {
      const {title, body} = noti;
      Alert.alert(title, body);
    });
  }

  async checkPermission() {
    console.log('m');
    const enabled = true;
    console.log(enabled, 'en');
    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();

      if (fcmToken) {
        console.log(fcmToken);
        // await Clipboard.setString(fcmToken)
      }
    } else {
      this.requestPermission();
    }
  }
  //Step 2: if not has permission -> process request
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('quyền bị từ chối');
    }
  }
  //Step 3: if has permission -> process get Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('token = ', fcmToken);

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
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

  _login = async () => {
    let config = {
      apiKey: 'AIzaSyAFFEhrr0CDZ3zXnVNc9HAcdgQ4UBUQec4',
      databaseURL: 'cargarage-297810.firebaseapp.com',
      projectId: 'cargarage-297810',
      storageBucket: 'cargarage-297810.appspot.com',
      messagingSenderId: '509823215770',
      appId: '1:509823215770:web:c4a84edb6698d818ac5723',
    };
    firebase.initializeApp(config, null);
    // const {isValid, controlFocus} = this.validate();
    // if (!isValid) {
    this.props.logInAction(this.state.email, this.state.password);
    // const fcmToken = await firebase.messaging().getToken();

    // if (fcmToken) {
    //   console.log(fcmToken);
    // }
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
              leftIcon="eyes"
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
