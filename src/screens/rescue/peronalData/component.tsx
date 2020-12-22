import DateTimePicker from '@react-native-community/datetimepicker';
import {RootState} from '@src/boot/rootReducers';
import ButtonComponent from '@src/containers/components/button';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import moment from 'moment';
import React, {useState} from 'react';
import {Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox, Header, ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {IProps, IState} from './propState';
import {updateDateOfBirth, updateGender, updateHeight, updateWeight} from './services';
import styles from './styles';
import InputComponent from '@src/containers/components/input';

export default function PersonalDataComponent(props: IProps) {
  let weight: TextInput = null;

  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    date_of_birth: new Date(state.account.date_of_birth),
    weight: state.account.weight,
    height: state.account.height,
    gender: state.account.gender,
    original_date_of_birth: new Date(state.account.date_of_birth),
    original_weight: state.account.weight,
    original_height: state.account.height,
    original_gender: state.account.gender,
    dateBirth: state.account.date_of_birth,

    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));
  const [state, setState] = useState<IState>({
    showModalDateOfBirth: false,
    showModalGender: false,
    showModalHeight: false,
    showModalWeight: false,
    dateOfBirth: props.date_of_birth,
    weight: props.weight,
    height: props.height,
    gender: props.gender,
    weight_unit: props.weight_unit,
  });
  const _goBack = () => Navigation.pop(props.componentId);

  const _toggleModalDateOfBirth = () =>
    setState((state: IState) => ({
      ...state,
      showModalDateOfBirth: !state.showModalDateOfBirth,
      dateOfBirth: props.original_date_of_birth,
    }));

  const _toggleModalWeight = () =>
    setState((state: IState) => ({...state, showModalWeight: !state.showModalWeight, weight: props.original_weight}));

  const _toggleModalHeight = () =>
    setState((state: IState) => ({...state, showModalHeight: !state.showModalHeight, height: props.original_height}));

  const _toggleModalGender = () =>
    setState((state: IState) => ({...state, showModalGender: !state.showModalGender, gender: props.original_gender}));

  const _decreaseWeight = () => setState((state: IState) => ({...state, weight: state.weight - 1}));

  const _decreaseHeight = () => setState((state: IState) => ({...state, height: state.height - 1}));

  const _increaseWeight = () => setState((state: IState) => ({...state, weight: state.weight + 1}));

  const _increaseHeight = () => setState((state: IState) => ({...state, height: state.height + 1}));

  const _changeGenderMale = () => setState((state: IState) => ({...state, gender: true}));

  const _changeGenderFemale = () => setState((state: IState) => ({...state, gender: false}));

  const onDateChange = (event, selectedDate) => {
    setState((state: IState) => ({...state, dateOfBirth: selectedDate}));
  };

  const account = useSelector((state: RootState) => state.account);

  const _saveDateOfBirth = async () => {
    setState((state: IState) => ({...state, showModalDateOfBirth: !state.showModalDateOfBirth}));
    props.onLoadingAction();
    await updateDateOfBirth(state.dateOfBirth);
    account.date_of_birth = state.dateOfBirth;
    props.offLoadingAction();
  };

  const _saveWeight = async () => {
    setState((state: IState) => ({...state, showModalWeight: !state.showModalWeight}));
    props.onLoadingAction();
    await updateWeight(state.weight);
    account.weight = state.weight;
    props.offLoadingAction();
  };

  const _saveHeight = async () => {
    setState((state: IState) => ({...state, showModalHeight: !state.showModalHeight}));
    props.onLoadingAction();
    await updateHeight(state.height);
    account.height = state.height;
    props.offLoadingAction();
  };

  const _saveGender = async () => {
    setState((state: IState) => ({...state, showModalGender: !state.showModalGender}));
    props.onLoadingAction();
    await updateGender(state.gender);
    account.gender = state.gender;
    props.offLoadingAction();
  };

  const _onChangeText = (value: string, controlFocus?: TextInput) => (evt: any) => {
    if (evt && controlFocus) {
      controlFocus.focus();
    }
    setState((state: IState) => ({...state, [value]: parseInt(evt)}));
  };

  const chooseWeightUnit = (unit: string) => () => {
    setState((state: IState) => ({...state, weight_unit: unit}));
    console.log(state.weight_unit, 'weight');
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
          text: 'Personal Data',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      <ScrollView style={styles.container}>
        <ListItem
          title="Weight"
          rightTitle={props.weight ? props.weight.toString() + ' lbs' : null}
          bottomDivider={true}
          containerStyle={styles.listItemContainer}
          titleStyle={styles.listItemText}
          rightTitleStyle={styles.listItemTextRight}
          onPress={_toggleModalWeight}
        />
        <ListItem
          title="Height"
          rightTitle={props.height ? props.height.toString() + ' cm' : null}
          bottomDivider={true}
          containerStyle={styles.listItemContainer}
          titleStyle={styles.listItemText}
          rightTitleStyle={styles.listItemTextRight}
          onPress={_toggleModalHeight}
        />
        <ListItem
          title="Gender"
          rightTitle={props.gender === true ? 'Male' : props.gender === false ? 'Female' : null}
          bottomDivider={true}
          containerStyle={styles.listItemContainer}
          titleStyle={styles.listItemText}
          rightTitleStyle={styles.listItemTextRight}
          onPress={_toggleModalGender}
        />
        <ListItem
          title="Date of Birth"
          rightTitle={
            !props.dateBirth ? null : props.date_of_birth ? moment(props.date_of_birth).format('MM/DD/YYYY') : null
          }
          bottomDivider={true}
          containerStyle={styles.listItemContainer}
          titleStyle={styles.listItemText}
          rightTitleStyle={styles.listItemTextRight}
          onPress={_toggleModalDateOfBirth}
        />
      </ScrollView>
      {/* Modal change date of birth */}
      <Modal animationType="fade" transparent={true} visible={state.showModalDateOfBirth}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalDateOfBirth}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Date of Birth</Text>
            <DateTimePicker
              value={state.dateOfBirth}
              mode="date"
              locale="en"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
            <ButtonComponent styleContainer={styles.btnSave} text="Save" onPress={_saveDateOfBirth} />
          </View>
        </View>
      </Modal>
      {/* Modal change weight */}
      <Modal animationType="fade" transparent={true} visible={state.showModalWeight}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalWeight}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Weight</Text>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalViewTouch}
                onPress={state.weight === 0 || !state.weight ? null : _decreaseWeight}>
                <IconIonic name="ios-remove-circle-outline" size={ms(50)} color={colors.eastBay} />
              </TouchableOpacity>
              {/* <Text style={styles.modalValueChange}>{state.weight ? state.weight : 0}</Text> */}
              <TextInput
                ref={(input) => (weight = input)}
                autoCapitalize="none"
                value={state.weight ? state.weight.toString() : '0'}
                placeholder=""
                onChangeText={_onChangeText('weight')}
                style={styles.modalValueChange}
                keyboardType="number-pad"
              />
              <TouchableOpacity style={styles.modalViewTouch} onPress={_increaseWeight}>
                <IconIonic name="ios-add-circle-outline" size={ms(50)} color={colors.eastBay} />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.switchSmall}>
              <TouchableOpacity
                style={
                  state.weight_unit === 'lb'
                    ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                    : [styles.switchThumb]
                }
                onPress={chooseWeightUnit('lb')}>
                <Text
                  style={
                    state.weight_unit === 'lb'
                      ? [styles.switchTextSmall, styles.switchTextSmallActive]
                      : [styles.switchTextSmall]
                  }>
                  lb
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  state.weight_unit === 'kg'
                    ? [styles.switchThumbSmall, styles.switchThumbSmallActive]
                    : [styles.switchThumb]
                }
                onPress={chooseWeightUnit('kg')}>
                <Text
                  style={
                    state.weight_unit === 'kg'
                      ? [styles.switchTextSmall, styles.switchTextSmallActive]
                      : [styles.switchTextSmall]
                  }>
                  kg
                </Text>
              </TouchableOpacity>
            </View> */}
            <ButtonComponent styleContainer={styles.btnSave} text="Save" onPress={_saveWeight} />
          </View>
        </View>
      </Modal>
      {/* Modal change height */}
      <Modal animationType="fade" transparent={true} visible={state.showModalHeight}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalHeight}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Height</Text>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalViewTouch}
                onPress={state.height === 0 || !state.height ? null : _decreaseHeight}>
                <IconIonic name="ios-remove-circle-outline" size={ms(50)} color={colors.eastBay} />
              </TouchableOpacity>
              <Text style={styles.modalValueChange}>{state.height ? state.height : 0}</Text>
              <TouchableOpacity style={styles.modalViewTouch} onPress={_increaseHeight}>
                <IconIonic name="ios-add-circle-outline" size={ms(50)} color={colors.eastBay} />
              </TouchableOpacity>
            </View>
            <ButtonComponent styleContainer={styles.btnSave} text="Save" onPress={_saveHeight} />
          </View>
        </View>
      </Modal>
      {/* Modal change gender */}
      <Modal animationType="fade" transparent={true} visible={state.showModalGender}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalBtnClose} onPress={_toggleModalGender}>
              <Icon name="times" size={ms(20)} color={colors.silverTree} />
            </TouchableOpacity>
            <Text style={styles.modalTile}>Gender</Text>
            <View style={common.alignItemsCenter}>
              <CheckBox
                title="Male"
                checkedIcon={<IconIonic name="ios-checkmark-circle" size={ms(34)} color={colors.silverTree} />}
                uncheckedIcon={<IconIonic name="ios-radio-button-off" size={ms(34)} color={colors.darkNude} />}
                checked={state.gender === true}
                iconRight={true}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkBoxText}
                onPress={_changeGenderMale}
              />
              <CheckBox
                title="Female"
                checkedIcon={<IconIonic name="ios-checkmark-circle" size={ms(34)} color={colors.silverTree} />}
                uncheckedIcon={<IconIonic name="ios-radio-button-off" size={ms(34)} color={colors.darkNude} />}
                checked={state.gender === false}
                iconRight={true}
                containerStyle={styles.checkboxContainer}
                textStyle={[styles.checkBoxText, styles.m_r_95]}
                onPress={_changeGenderFemale}
              />
            </View>
            <ButtonComponent styleContainer={styles.btnSave} text="Save" onPress={_saveGender} />
          </View>
        </View>
      </Modal>
    </>
  );
}
