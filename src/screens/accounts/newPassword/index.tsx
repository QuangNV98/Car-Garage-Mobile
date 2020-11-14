import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import { common } from '@src/styles';
import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function CheckYourEmailComponent() {
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.container}>
      <View style={common.content}>
        <Text style={styles.title}>Create new password</Text>
        <Text style={styles.secText}>Your new password must be at least 8 characters long</Text>
        <InputComponent placeholder="New password" />
        <InputComponent placeholder="Repeat password" containerStyle={common.mb30} />
        <ButtonComponent btnFull={true} text="Submit" />
      </View>
    </KeyboardAwareScrollView>
  );
}
