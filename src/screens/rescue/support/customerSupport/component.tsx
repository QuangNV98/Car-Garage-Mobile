import {ms} from '@src/styles/scalingUtils';
import React, {useState, useRef} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {IProps} from './propState';
import styles from './styles';
import {IState} from './propState';
import ButtonComponent from '@src/containers/components/button';
import {validation} from '@src/utils';
import {RootState} from '@src/boot/rootReducers';
import {useDispatch, useSelector} from 'react-redux';
import {sendSupport} from '../services';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';

export default function SupportCustomerComponent(props: IProps) {
  let question: TextInput = null;
  const _goBack = () => Navigation.pop(props.componentId);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isLoading: state.common.isLoading,
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));

  const [state, setState] = useState<IState>({
    question: '',
  });

  const validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateName(state.question)) {
      isValid = 'Please enter a valid question';
      controlFocus = question;
    }

    return {isValid, controlFocus};
  };

  const _onChangeText = (value: string, controlFocus?: TextInput) => (evt: any) => {
    if (evt && controlFocus) {
      controlFocus.focus();
    }
    setState((state: IState) => ({...state, [value]: evt}));
  };

  const submitSupport = async () => {
    const {isValid, controlFocus} = validate();

    if (!isValid) {
      props.onLoadingAction();
      await sendSupport(state.question)
        .then((response) => {
          if (response && response.data) {
            Alert.alert('Success', 'We’ve received your message and will get back to you shortly');
          } else {
            Alert.alert('Error', 'Server is busy');
          }
        })
        .catch(() => {
          return;
        });
      props.offLoadingAction();
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
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
          text: 'Customer support',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      {/* <ScrollView style={styles.container} ref={scrollViewRef}> */}
      <View style={styles.container}>
        <Text style={styles.headerText}>Questions? Feel free to reach out below</Text>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ScrollView contentContainerStyle={styles.containerStyleInputArea}>
          <TextInput
            ref={(input) => (question = input)}
            value={state.question}
            autoCapitalize="none"
            placeholder="Your questions"
            onChangeText={_onChangeText('question')}
            multiline={true}
            numberOfLines={10}
            style={styles.textInputArea}
            maxLength={500}
          />
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </View>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center', flex: 1}}>
        <ButtonComponent
          btnFull={true}
          text="Submit"
          disabled={props.isLoading}
          styleContainer={styles.submitBtn}
          onPress={submitSupport}
        />
      </View>
      {/* </ScrollView> */}
    </>
  );
}
