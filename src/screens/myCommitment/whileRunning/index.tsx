import React from 'react';
import {connect} from 'react-redux';
import {common, colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {IProps, IState} from './propState';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import ButtonComponent from '@src/containers/components/button';
import TitleComponent from '@src/containers/components/title';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {bindActionCreators, Dispatch} from 'redux';
import {addCommitmentCompleteRunningScreen} from '../completeRunning/navigation';

class WhileRunningComponent extends React.Component<IProps> {
  state: IState = {};

  _goBack = () => Navigation.pop(this.props.componentId);

  _goCompleteRunning = () => addCommitmentCompleteRunningScreen(this.props.componentId);

  render() {
    return (
      <>
        <Header
          leftComponent={
            <TouchableOpacity onPress={this._goBack} style={styles.headerLeftTouch}>
              <Icon5 name="chevron-left" size={ms(15)} />
            </TouchableOpacity>
          }
        />
        <View style={[common.container, common.alignItemsCenter]}>
          <TitleComponent
            title="Keep it up!"
            width={160}
            styleContainer={common.alignSeftCenter}
            styleUnderLine={{top: -20}}
            styleTitle={common.textCenter}
          />
          <Text style={common.textCenter}>You're getting better every day!</Text>
          <View>
            <Text>Chart</Text>
          </View>

          <View style={styles.wrapDuration}>
            <Text style={styles.durationNumber}>00:00</Text>
            <Text style={styles.durationText}>Duration</Text>
          </View>
          <ButtonComponent text="Finish" onPress={this._goCompleteRunning} styleContainer={common.mt20} />
        </View>
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({offLoadingAction, onLoadingAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WhileRunningComponent);
