import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {common} from '@src/styles';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles';
import GestureRecognizer from 'react-native-swipe-gestures';

interface IProps {
  componentId: string;
}

class StartedFourComponent extends React.Component<IProps> {
  _next = () => {
    AsyncStorage.setItem(System.PASS_STARTED, 'passed', () => rootLoginScreen());
  };

  render() {
    return (
      <GestureRecognizer
        style={{
          flex: 1,
        }}
        onSwipeLeft={this._next}>
        <View style={common.container}>
          <View style={styles.slide}>
            <Image style={styles.slideImgLast} source={require('@src/assets/images/Group243.png')} />
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Welcome to</Text>
              <Image style={styles.titleImageSecond} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={[styles.title, {marginTop: -20}]}>Accountabuilder!</Text>
            <Text style={styles.text}>
              Habit building with Consequences: Stake money against friends, enemies, or a charity you despise
            </Text>
          </View>
          {/* <View style={styles.dotContent}>
            <View style={styles.wrapDot}>
              <View style={[styles.dot]} />
              <View style={[styles.dot]} />
              <View style={[styles.dot, styles.dotActive]} />
            </View>
          </View> */}
        </View>
        <View style={styles.bottomFixed}>
          <ButtonComponent text="Get Started" onPress={this._next} btnFull={false} styleContainer={common.m_hori_15} />
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(StartedFourComponent);
