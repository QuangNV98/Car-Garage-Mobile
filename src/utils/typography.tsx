import {colors} from '@src/styles';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const typography = () => {
  const oldTextRender = (Text as any).render;
  (Text as any).render = (...args: any) => {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    });
  };

  const oldTouchableOpacity = (TouchableOpacity as any).render;
  (TouchableOpacity as any).render = (...args: any) => {
    const origin = oldTouchableOpacity.call(this, ...args);
    return React.cloneElement(origin, {
      hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
    });
  };
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.darkMain,
  },
});
