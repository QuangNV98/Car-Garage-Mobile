import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import {IProps} from './propState';
import styles from './styles';

export default function ButtonComponent(props: IProps) {
  return (
    <View style={[styles.mainContainer, props.styleContainer]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.btnContainer,
          {opacity: props.disabled ? 0.5 : 1},
          {width: props.btnFull ? '100%' : 'auto'},
          {backgroundColor: props.clear ? 'transparent' : colors.silverTree},
          {borderColor: props.clear ? 'transparent' : colors.silverTree},
          {paddingHorizontal: props.clear ? 0 : ms(30)},
          props.styleButton,
        ]}
        testID={props.testID}
        disabled={props.disabled}>
        {props.hasIcon ? (
          <Icon
            size={props.sizeIcon ? props.sizeIcon : 15}
            type="material"
            name={props.iconName}
            color={props.clear ? colors.darkGray : colors.white}
            style={{marginRight: ms(5)}}
          />
        ) : null}
        <Text style={[styles.btnText, {color: props.clear ? colors.darkGray : colors.white}, props.styleText]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
