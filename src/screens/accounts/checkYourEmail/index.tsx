import ButtonComponent from '@src/containers/components/button';
import { common } from '@src/styles';
import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function CheckYourEmailComponent() {
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid={true} style={common.container}>
      <View style={common.content}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.secText}>We've just sent you a letter with new password, please check</Text>
        <ButtonComponent btnFull={true} text="Check my email" />
      </View>
    </KeyboardAwareScrollView>
  );
}
