import ButtonComponent from '@src/containers/components/button';
import {ms, vs, s} from '@src/styles/scalingUtils';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, Linking, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {IProps} from './propState';
import styles from './styles';
import {common} from '@src/styles';

export default function ConnectHealthkitComponent(props: IProps) {
  const _goBack = () => Navigation.pop(props.componentId);

  const _connectToAppleHealth = () => {
    Linking.openURL('App-Prefs:root=MUSIC');
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Connect to Apple Health',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      <ScrollView style={styles.container}>
        <View style={styles.wrapImage}>
          <Image source={require('@src/assets/images/Group262.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>How to connect to</Text>
        <View style={common.flexColumn}>
          <Text style={styles.titleSub}>Apple Health to read data</Text>
          <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.textContent}>1. Open Settings, tab Health</Text>
          <Text style={styles.textContent}>2. Choose Data Access & Devices</Text>
          <Text style={styles.textContent}>3. Choose Pledger App</Text>
          <Text style={styles.textContent}>4. Turn all categories on</Text>
        </View>
        <View style={styles.buttonConnect}>
          <ButtonComponent btnFull={false} text="Connect to Apple Health" onPress={_connectToAppleHealth} />
        </View>
      </ScrollView>
    </>
  );
}
