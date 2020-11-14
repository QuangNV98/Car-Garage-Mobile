import {System} from '@src/constant';
import ButtonComponent from '@src/containers/components/button';
import {addCommitmentContractScreen} from '@src/screens/myCommitment/addCommitment/contracts/navigation';
import HeaderAddCommitmentComponent from '@src/screens/myCommitment/addCommitment/header';
import {chooseGoalAction} from '@src/screens/myCommitment/addCommitment/redux/actions';
import {common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {IProps, IState} from './propState';
import styles from './styles';

class DaylyWeeklyCongratComponent extends React.Component<IProps> {
  state: IState = {
    miles: '',
    week: '',
  };

  _renderGoalText = () => {
    switch (this.props.addCommitmentReducer.goal) {
      case 1:
        return 'burn';
      case 2:
        return 'run';
      case 3:
        return 'bike';
      case 4:
        return 'walk';
      case 5:
        return 'physically visit';
      default:
        return '';
    }
  };

  _renderValueText = () => {
    switch (this.props.addCommitmentReducer.goal) {
      case 1:
        return 'calories';
      case 2:
        return this.props.addCommitmentReducer.unit;
      case 3:
        return this.props.addCommitmentReducer.unit;
      case 4:
        return 'steps';
      case 5:
        return 'times';
      default:
        return '';
    }
  };

  _renderValueSingularText = () => {
    switch (this.props.addCommitmentReducer.goal) {
      case 1:
        return 'calories';
      case 2:
        return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
      case 3:
        return this.props.addCommitmentReducer.unit.slice(0, this.props.addCommitmentReducer.unit.length - 1);
      case 4:
        return 'step';
      case 5:
        return 'time';
      default:
        return '';
    }
  };

  _gotoContract = () => {
    addCommitmentContractScreen(this.props.componentId);
  };

  _goBack = () => Navigation.pop(this.props.componentId);

  render() {
    return (
      <>
        <HeaderAddCommitmentComponent
          _goBack={this._goBack}
          nameButton="Edit guidelines"
          step={4}
          componentId={this.props.componentId}
          hasBackButton={true}
        />
        <ScrollView style={common.flex_1}>
          <View style={common.container}>
            <View style={styles.wrapCongrat}>
              <Image
                source={
                  this.props.commitment_type === System.COMMITMENT_TYPE.DAILY_WEEKLY
                    ? require('@src/assets/images/Group268.png')
                    : this.props.addCommitmentReducer.goal === 5
                    ? require('@src/assets/images/Group272.png')
                    : require('@src/assets/images/Group243.png')
                }
                style={{
                  width: this.props.addCommitmentReducer.goal === 5 ? ms(260) : ms(250),
                  height: this.props.addCommitmentReducer.goal === 5 ? ms(290) : ms(320),
                }}
                width={277}
                height={294}
              />
              <View style={common.flexColumn}>
                <Text style={[styles.title, common.mt20]}>Congratulations!</Text>
                <Image style={styles.titleImage} source={require('@src/assets/images/Rectangle_26.png')} />
              </View>
              <Text style={styles.textDefault}>
                Wow you’ve Pledged to {this._renderGoalText()}
                {this.props.addCommitmentReducer.location_name
                  ? ` ${this.props.addCommitmentReducer.location_name}`
                  : null}{' '}
                {this.props.addCommitmentReducer.unit === 'meters'
                  ? (parseFloat(this.props.addCommitmentReducer.target.toString()) / 0.000621371192).toFixed(0)
                  : this.props.addCommitmentReducer.target}{' '}
                {parseInt(this.props.addCommitmentReducer.target) > 1 ||
                (parseFloat(this.props.addCommitmentReducer.target.toString()) / 0.000621371192 > 1 &&
                  this.props.addCommitmentReducer.unit === 'meters')
                  ? this._renderValueText()
                  : this._renderValueSingularText()}{' '}
              </Text>
              <Text style={styles.textDefaultBelow}>
                {this.props.commitment_type === System.COMMITMENT_TYPE.DAILY_WEEKLY
                  ? `every ${this.props.addCommitmentReducer.target_time_unit
                      .toLocaleLowerCase()
                      .substring(
                        0,
                        this.props.addCommitmentReducer.target_time_unit.toLocaleLowerCase().length - 1,
                      )} for the next `
                  : 'in the next '}
                {this.props.addCommitmentReducer.target_time}{' '}
                {parseInt(this.props.addCommitmentReducer.target_time) > 1
                  ? this.props.addCommitmentReducer.target_time_unit.toLocaleLowerCase()
                  : this.props.addCommitmentReducer.target_time_unit
                      .toLocaleLowerCase()
                      .substring(0, this.props.addCommitmentReducer.target_time_unit.toLocaleLowerCase().length - 1)}
                !
              </Text>
            </View>
            <View style={styles.wrapBtn}>
              {/* <ButtonComponent text="Edit" clear={true} onPress={this._goBack} /> */}
              <ButtonComponent text="Set the stakes" onPress={this._gotoContract} />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({addCommitmentReducer: state.screens.myCommitments.addCommitment});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({chooseGoalAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DaylyWeeklyCongratComponent);
