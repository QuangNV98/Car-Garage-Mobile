import AsyncStorage from '@react-native-community/async-storage';
import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import Layout from '@src/containers/components/layout';
import {rootLoginScreen} from '@src/screens/accounts/signin/navigation';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';
import {connect} from 'react-redux';
import styles from './styles';

interface IProps {
  componentId: string;
}

class StartedScreen extends React.Component<IProps> {
  state = {
    activeSlide: 1,
  };

  _next = () => {
    if (this.state.activeSlide < 4) {
      this.setState({
        activeSlide: this.state.activeSlide + 1,
      });
    }
  };

  _forward = () => {
    if (this.state.activeSlide > 1) {
      this.setState({
        activeSlide: this.state.activeSlide - 1,
      });
    }
  };

  _skip = () => {
    AsyncStorage.setItem(System.PASS_STARTED, 'passed', () => rootLoginScreen());
  };

  render() {
    const {activeSlide} = this.state;
    return (
      <Layout>
        <GestureRecognizer
          style={{
            flex: 1,
          }}
          onSwipeLeft={this._next}
          onSwipeRight={this._forward}>
          <View style={common.container}>
            <View style={[styles.slide, {marginTop: activeSlide === 4 ? ms(42) : ifIphoneX(ms(90), ms(56.28))}]}>
              {activeSlide === 1 ? (
                <FastImage style={styles.slideImgFirst} source={require('@src/assets/images/Group267.png')} />
              ) : null}
              {activeSlide === 2 ? (
                <FastImage style={styles.slideImgSecond} source={require('@src/assets/images/Group239.png')} />
              ) : null}

              {activeSlide === 3 ? (
                <FastImage style={styles.slideImgLast} source={require('@src/assets/images/Group254.png')} />
              ) : null}
              {activeSlide === 4 ? (
                <FastImage style={styles.slideImgWellcome} source={require('@src/assets/images/Group243.png')} />
              ) : null}
              <View style={styles.viewTitle}>
                {activeSlide === 1 ? (
                  <View style={{marginTop: ifIphoneX(ms(74.76), ms(37))}}>
                    <Text style={styles.title}>Big Goals</Text>
                    <FastImage style={styles.titleImageFirst} source={require('@src/assets/images/Rectangle_26.png')} />
                  </View>
                ) : null}
                {activeSlide === 2 ? (
                  <View style={{marginTop: ifIphoneX(ms(79.27), ms(30))}}>
                    <Text style={styles.title}>Big Consequences</Text>
                    <FastImage
                      style={styles.titleImageSecond}
                      source={require('@src/assets/images/Rectangle_26.png')}
                    />
                  </View>
                ) : null}
                {activeSlide === 3 ? (
                  <View style={{marginTop: ifIphoneX(ms(74.28), ms(32.28))}}>
                    <Text style={styles.title}>Massive Changes</Text>
                    <FastImage style={styles.titleImageLast} source={require('@src/assets/images/Rectangle_26.png')} />
                  </View>
                ) : null}
                {activeSlide === 4 ? (
                  <View style={{marginTop: ifIphoneX(ms(76.26), ms(33.44))}}>
                    <Text style={styles.title}>Welcome to Pledger!</Text>
                    <FastImage
                      style={styles.titleImageWellcome}
                      source={require('@src/assets/images/Rectangle_26.png')}
                    />
                  </View>
                ) : null}
              </View>
              {/* {activeSlide === 4 ? <Text style={[styles.title, {marginTop: -20}]}></Text> : null} */}
              <Text
                style={
                  activeSlide === 1
                    ? [styles.text, {marginHorizontal: ms(65)}]
                    : activeSlide === 2
                    ? [styles.text, {marginHorizontal: ms(16)}]
                    : activeSlide === 3
                    ? [styles.text, {marginHorizontal: ms(10)}]
                    : [styles.text, {marginHorizontal: ifIphoneX(ms(14), ms(0))}]
                }>
                {activeSlide === 1
                  ? 'Pledge to be a better you. Pledge to spark change'
                  : activeSlide === 2
                  ? 'Pledge to put money on the line to keep you accountable to friends, enemies, or a charity you despise'
                  : activeSlide === 3
                  ? 'Honor your Pledge, honor yourself. Pledger will be the spark that ignites your fire'
                  : 'Dishonor your Pledge and face financial consequences... Honor your Pledge and be rewarded with new healthy habits'}
              </Text>
              {activeSlide === 4 ? null : (
                <View style={[styles.dotContent, {paddingTop: activeSlide ? ms(40) : ms(54)}]}>
                  <View style={styles.wrapDot}>
                    <View style={[styles.dot, activeSlide === 1 ? styles.dotActive : null]} />
                    <View style={[styles.dot, activeSlide === 2 ? styles.dotActive : null]} />
                    <View style={[styles.dot, activeSlide === 3 ? styles.dotActive : null]} />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.bottomFixed}>
            {activeSlide === 4 ? (
              <ButtonComponent
                text="Let’s Make a Pledge!"
                onPress={this._skip}
                btnFull={true}
                styleContainer={{marginTop: ms(54), marginHorizontal: ms(60)}}
              />
            ) : (
              <View style={styles.wrapBtn}>
                <ButtonComponent
                  text="Skip"
                  clear={true}
                  onPress={this._skip}
                  styleContainer={{minWidth: 'auto', marginLeft: ms(14)}}
                  styleButton={{minWidth: 'auto'}}
                />
                <ButtonComponent text="Next" onPress={this._next} />
              </View>
            )}
          </View>
        </GestureRecognizer>
      </Layout>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(StartedScreen);
