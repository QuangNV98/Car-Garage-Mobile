import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {colors} from '@src/styles';
import React from 'react';
import {Text, View} from 'react-native';
import {IProps} from './propState';
import styles from './styles';

export default function HeaderAddCommitmentComponent(props: IProps) {
  return (
    <View style={styles.header}>
      <View style={styles.progressBar}>
        <View style={[styles.percent, {width: `${(100 / System.STEP) * props.step}%`}]} />
      </View>
      <View style={props.hasBackButton ? styles.wrapTextStep : styles.wrapTextStepNoButton}>
        {props.hasBackButton ? (
          <ButtonComponent
            hasIcon={true}
            iconName="chevron-left"
            text={props.nameButton}
            clear={true}
            styleContainer={{backgroundColor: colors.bgColor}}
            onPress={props._goBack}
            sizeIcon={25}
            // disabled={props.disabled}
          />
        ) : null}
        <Text style={styles.textStep}>
          {props.step} step of {System.STEP}
        </Text>
      </View>
    </View>
  );
}
