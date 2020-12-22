import {ms, vs} from '@src/styles/scalingUtils';
import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {IProps} from './propState';
import styles from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import {IState} from './propState';
import {colors} from '@src/styles';
import Dash from 'react-native-dash';
import {ifIphoneX, ifIphonePlus, ifIphoneMax} from '@src/utils';

export default function SupportFAQComponent(props: IProps) {
  const _goBack = () => Navigation.pop(props.componentId);
  const scrollViewRef = useRef();

  const scrollFAQ = () => {
    if (props.currentSection)
      (scrollViewRef.current as any)?.scrollTo({
        y: Dimensions.get('screen').height - ifIphoneMax(ms(170), ifIphoneX(ms(140), ifIphonePlus(ms(30), ms(0)))),
        animated: true,
      });
  };

  const SECTIONS = [
    {
      key: 0,
      title: "How do you verify I've honored my pledge?",
      content:
        "All pledges in pledger are automatically validated via the health tracking app in IOS. Because of this, it's imperative that you check and double check that you have successfully connected apple health to Pledger",
    },
    {
      key: 1,
      title: 'What happens if I dishonor my pledge?',
      content:
        'If you’ve made a financial pledge you will be automatically charged the amount you chose to stake, and a failure notice will go in your pledge history. If you have chosen not to stake financially, you will only receive the failure notice in your pledge history.',
    },
    {
      key: 2,
      title: 'Can I get a refund if I dishonor my pledge?',
      content:
        'In 99% of cases there are no refunds. We are pledged to help you become the best version of yourself, refunds on pledges would degrade the effectiveness of the app. If, in the rare occasion a bug within the app prevents you from honoring your goal, please submit proof to our support team and we will take care of it.',
    },
    {
      key: 3,
      title: "Can I edit or delete a pledge once it's live?",
      content:
        'You may not edit or delete a pledge once the start date has begun. Until then, you are free to make any changes to your pledges.',
    },
    {
      key: 4,
      title: 'What happens if I dishonor my pledge and my buddy never claims the money?',
      content:
        'Your pledger has 30 days to claim their money. If your pledger does not claim their money in 30 days the money will be forfeited to Pledger.',
    },
    {
      key: 5,
      title: 'What happens if I forget to check into a location?',
      content: 'As this is a user error, you would dishonor your pledge.',
    },
    {
      key: 6,
      title: 'When does the pledge officially start?',
      content: 'You choose the start date of your pledge while creating your pledge goal',
    },
    {
      key: 7,
      title:
        'Why do I see a $1 charge on my billing statement for BetterBuddy even though I have been successful in my Pledge?',
      content:
        'This is done to certify that your credit card is working, and to prevent fraud. After 30 days we will return the $1 to your bank.',
    },
    {
      key: 8,
      title: 'How do I edit my account details?',
      content: 'Visit the account details section at the bottom of your screen.',
    },
    {
      key: 9,
      title: 'Can I change my pledge buddy once the contract has started?',
      content:
        'For the time being, we do not allow this. If this becomes a highly request feature we may change it in the future.',
    },
    {
      key: 10,
      title: 'How does Pledger Keep Track of My Progress?',
      content:
        "In order to track how long you've biked or how many calories you've burned, it's highly recommended, and in some cases necessary to download a 3rd party app or use a wearable device.",
    },
  ];
  const [state, setState] = useState<IState>({
    activeSections: [props.currentSection ? 10 : 11],
  });

  const _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon
          name={state.activeSections[0] === section.key ? 'chevron-up' : 'chevron-down'}
          size={ms(13)}
          style={{flex: 0.5 / 10}}
        />
      </View>
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
        {section.key === 10 ? (
          <>
            <Text style={[styles.contentText, {marginTop: vs(20)}]}>
              We use apple health to track your progress. The app you choose must feed your performance data into the
              apple health app. It's imperative that you allow the data connection between your 3rd party app and apple
              health.
            </Text>
            <Image style={styles.headerImage} source={require('@src/assets/images/image159.png')} />
            <Text style={[styles.contentText, {marginTop: vs(20)}]}>Suggested Apps and Devices</Text>
            <Text style={styles.contentTextMedium}>Burning Calories (and More Accurate Step Tracking):</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Fibit</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Apple Watch</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Polar Heart Rate Monitor</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Woop Strap</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.contentText]}>Map my Run</Text>
              </View>
              <Text style={[styles.contentText]} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Image style={[styles.listImage]} source={require('@src/assets/images/ellipse.png')} /> */}
              <Text style={[styles.contentText, {marginLeft: ms(15)}]}>
                (Running: Note: this is only for burning calories. You must use our in house built distance run distance
                tracking to track your running Pledge Data)
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Map my Ride for Bike riding calory tracking</Text>
            </View>

            <Text style={styles.contentTextMedium}>Biking:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Strava</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Map My Ride</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} />
              <Text style={[styles.contentText]}>Cycle Meter</Text>
            </View>
            {/* <Image style={styles.listImage} source={require('@src/assets/images/ellipse.png')} /> */}
            <Text style={[styles.contentText, {marginTop: vs(20)}]}>
              There are tons of apps and wearable to effectively track the above data for your Pledge. As long as it
              works with Apple Health, it will work with Pledger.
            </Text>
          </>
        ) : null}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Dash dashGap={0} dashLength={6} dashThickness={1} dashColor="#C0C5CF" style={{opacity: 0.5}} />
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setState((state: IState) => ({...state, activeSections}));
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
          text: 'FAQ',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      <ScrollView style={styles.container} ref={scrollViewRef} onContentSizeChange={scrollFAQ}>
        <View style={styles.viewContainer}>
          <Accordion
            sections={SECTIONS}
            activeSections={state.activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            underlayColor={colors.bgColor}
            renderFooter={renderFooter}
          />
        </View>
      </ScrollView>
    </>
  );
}
