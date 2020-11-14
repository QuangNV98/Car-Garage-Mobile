import {RootState} from '@src/boot/rootReducers';
import {colors} from '@src/styles';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import csStyles from './styles';

export default function InternetErrorComponent() {
  const {isConnected} = useSelector((state: RootState) => ({
    isConnected: state.network.isConnected,
  }));

  return !isConnected ? (
    <View style={csStyles.view_loading}>
      <View style={csStyles.viewContent}>
        <ActivityIndicator color={colors.silverTree} />
        <Text>Connecting ...</Text>
      </View>
    </View>
  ) : null;
}
