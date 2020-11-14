import {RootState} from '@src/boot/rootReducers';
import {colors} from '@src/styles';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import csStyles from './styles';

export default function LoadingComponent() {
  const {isLoading} = useSelector((state: RootState) => ({
    isLoading: state.common.isLoading,
  }));

  return isLoading ? (
    <View style={csStyles.view_loading}>
      <View style={csStyles.viewContent}>
        <ActivityIndicator color={colors.silverTree} />
        <Text>Please wait ...</Text>
      </View>
    </View>
  ) : null;
}
