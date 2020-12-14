import TitleComponent from '@src/containers/components/title';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Header} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps} from './propState';
import styles from './styles';

class FriendProgressComponent extends React.Component<IProps> {
  _goBack = () => Navigation.pop(this.props.componentId);
  render() {
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon5 name="chevron-left" size={ms(15)} />
            </TouchableOpacity>
          }
          centerComponent={<Text style={common.headerTitle}>Details</Text>}
        />
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.boxContent}>
              <View style={styles.viewTitle}>
                
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendProgressComponent);
