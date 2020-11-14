import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {common} from '@src/styles';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {rootStartedLastScreen} from '../startedLast/navigation';
import styles from '../styles';
import GestureRecognizer from 'react-native-swipe-gestures';
interface IProps {
  componentId: string;
}

class StartedSecondComponent extends React.Component<IProps> {
  _next = () => {
    rootStartedLastScreen(this.props.componentId);
  };

  _skip = () => {
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
            <Image style={styles.slideImgSecond} source={require('@src/assets/images/Group239.png')} />
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Big Consequences</Text>
              <Image style={styles.titleImageSecond} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={styles.text}>Stake money against friends, enemies, or a charity you despise</Text>
          </View>
          <View style={styles.dotContent}>
            <View style={styles.wrapDot}>
              <View style={[styles.dot]} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={[styles.dot]} />
              <View style={[styles.dot]} />
            </View>
          </View>
        </View>
        <View style={styles.bottomFixed}>
          <View style={styles.wrapBtn}>
            <ButtonComponent text="Skip" clear={true} onPress={this._skip} />
            <ButtonComponent text="Next" onPress={this._next} />
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(StartedSecondComponent);
