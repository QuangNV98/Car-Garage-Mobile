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
import {rootStartedFourScreen} from '../startedFour/navigation';

interface IProps {
  componentId: string;
}

class StartedLastComponent extends React.Component<IProps> {
  _next = () => {
    // AsyncStorage.setItem(System.PASS_STARTED, 'passed', () => rootLoginScreen());
    rootStartedFourScreen(this.props.componentId);
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
            <Image style={styles.slideImgLast} source={require('@src/assets/images/Group254.png')} />
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Massive Changes</Text>
              <Image style={styles.titleImageSecond} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={styles.text}>Commit to achieving the best version of you</Text>
          </View>
          <View style={styles.dotContent}>
            <View style={styles.wrapDot}>
              <View style={[styles.dot]} />
              <View style={[styles.dot]} />
              <View style={[styles.dot, styles.dotActive]} />
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

export default connect(mapStateToProps)(StartedLastComponent);
