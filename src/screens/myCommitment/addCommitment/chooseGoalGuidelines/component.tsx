import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {common, colors} from '@src/styles';
import React, {Fragment, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import {addCommitmentDailyWeeklyScreen} from '../dailyWeeklyCommitment/navigation';
import {addCommitmentStandartScreen} from '../standartCommitment/navigation';
import {IProps, IState} from './propState';
import styles from './styles';
import Modal from 'react-native-modal';
import {myProfileSupportScreen} from '@src/screens/myProfile/support/index';
import {myProfileSupportFAQScreen} from '@src/screens/myProfile/support/faq';

export default function ChooseGoalGuidelineComponent(props: IProps) {
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
  }));

  const [state, setState] = useState<IState>({
    isModal: props.isModal,
  });

  const _gotoStandart = () => {
    const chooseGoal = props.chooseGoal;
    addCommitmentStandartScreen(props.componentId, {chooseGoal});
  };

  const _gotoDaily = () => {
    const chooseGoal = props.chooseGoal;
    addCommitmentDailyWeeklyScreen(props.componentId, {chooseGoal});
  };

  const _goBack = () => Navigation.pop(props.componentId);

  const toggleModal = () => {
    setState((state: IState) => ({...state, isModal: false}));
  };

  const learnMore = () => {
    setState((state: IState) => ({...state, isModal: false}));
    myProfileSupportFAQScreen(props.componentId, {currentSection: 11});
  };

  return (
    <Fragment>
      <View>
        <HeaderAddCommitmentComponent hasBackButton={true} nameButton="Change goal" _goBack={_goBack} step={2} />
      </View>
      <ScrollView style={common.flex_1}>
        <View style={common.container}>
          <View style={styles.viewTitleContainer}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Set your</Text>
              <Text style={styles.title}>Pledge</Text>
              <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
              <Text style={styles.title}>guidelines</Text>
            </View>
            <Image
              style={styles.imgRight}
              source={
                props.chooseGoal === 1
                  ? require('@src/assets/images/Group273.png')
                  : props.chooseGoal === 2
                  ? require('@src/assets/images/Group256.png')
                  : props.chooseGoal === 3
                  ? require('@src/assets/images/Group269.png')
                  : require('@src/assets/images/Group270.png')
              }
            />
          </View>
          <TouchableOpacity style={styles.item} onPress={_gotoStandart}>
            <View style={common.flexRowCenter}>
              <Text style={styles.itemTitle}>Standard pledge</Text>
              <Image style={styles.imgIcon} source={require('@src/assets/images/sports-and-competition.png')} />
            </View>
            <Text style={styles.itemText}>A simple Pledge set to be completed in a certain amount of time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={_gotoDaily}>
            <Text style={styles.itemTitle} />
            <View style={common.flexRowCenter}>
              <Text style={styles.itemTitle}>Daily/weekly pledge</Text>
              <Image style={styles.imgIcon} source={require('@src/assets/images/interface.png')} />
            </View>
            <Text style={styles.itemText}>
              A simple Pledge that you have to pledge every day/week for a certain amount of time
            </Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={state.isModal} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Image source={require('@src/assets/images/Group466.png')} style={styles.headerImage} />
            <View style={common.flexColumn}>
              <Text style={[styles.titleModal]}>You should have a third party tracker</Text>
              <Image style={styles.titleImageModal} source={require('@src/assets/images/Rectangle_26.png')} />
            </View>
            <Text style={styles.text}>You will need a 3rd party app or tracking device to use this section</Text>
            <View style={styles.buttonContainer}>
              <ButtonComponent
                onPress={learnMore}
                clear={true}
                text="Learn More"
                styleButton={{borderColor: '#8F96A5'}}
                styleText={{color: '#8F96A5'}}
              />
              <ButtonComponent onPress={toggleModal} text="Okay" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Fragment>
  );
}
