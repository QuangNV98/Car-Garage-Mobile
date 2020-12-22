import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {IProps} from './propState';
import styles from './styles';
import {colors} from '@src/styles';
import {myProfileSupportFAQScreen} from './faq';
import {myProfileSupportCustomerScreen} from './customerSupport';
import {myProfileSupportReportScreen} from './reportBug';

export default function SupportComponent(props: IProps) {
  const _goBack = () => Navigation.pop(props.componentId);
  const list = [
    {
      title: 'FAQ',
      icon: 'chevron-right',
      onPress: () => myProfileSupportFAQScreen(props.componentId),
    },
    {
      title: 'Customer support',
      icon: 'chevron-right',
      onPress: () => myProfileSupportCustomerScreen(props.componentId),
    },
    {
      title: 'Report a bug',
      icon: 'chevron-right',
      onPress: () => myProfileSupportReportScreen(props.componentId),
    },
  ];

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Support',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              rightIcon={<Icon name={item.icon} color={colors.darkMain} size={ms(13)} solid={true} />}
              bottomDivider={true}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemText}
              onPress={item.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
