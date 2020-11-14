import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import styles from '../styles';
import {IProps, IState} from './propState';

export const CountDown = (props: IProps) => {
  const [state, setState] = useState<IState>({
    countDownTimeMinute: '00',
    countDownTimeSecond: '00',
  });

  useEffect(() => {
    if (props.startCountDown) {
      startTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [props.startCountDown]);

  const startTimer = async () => {
    const backgroundTimer = await AsyncStorage.getItem(System.BACKGROUND_TIMER);
    const obj = {
      timer: new Date().toISOString(),
      item: props.item,
    };
    if (!backgroundTimer) await AsyncStorage.setItem(System.BACKGROUND_TIMER, JSON.stringify(obj));
    let minute_counter = props.countDownTimeMinute;
    let second_counter = props.countDownTimeSecond;
    BackgroundTimer.runBackgroundTimer(() => {
      second_counter++;
      if (second_counter === 60) {
        minute_counter++, (second_counter = 0);
      }

      let second_display = second_counter.toString();
      let minute_display = minute_counter.toString();
      if (second_counter < 10) {
        second_display = '0' + second_counter.toString();
      }
      if (minute_counter < 10) {
        minute_display = '0' + minute_counter.toString();
      }
      setState((state) => ({
        ...state,
        countDownTimeMinute: minute_display,
        countDownTimeSecond: second_display,
      }));
    }, 1000);
  };

  return (
    <Text style={styles.durationNumber}>
      {state.countDownTimeMinute}:{state.countDownTimeSecond}
    </Text>
  );
};
