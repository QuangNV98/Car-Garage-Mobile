import React from 'react';
import { Image, Text, View } from 'react-native';
import { IProps } from './propState';
import styles from './styles';

export default function TitleComponent(props: IProps) {
  return (
    <View style={[props.styleContainer, styles.mainContainer]}>
      <Text style={[props.styleTitle, styles.title]}>{props.title}</Text>
      <Image
        style={[styles.underLine, props.styleUnderLine, {width: props.width}]}
        resizeMode="stretch"
        source={require('@src/assets/images/underline-text.png')}
      />
    </View>
  );
}
