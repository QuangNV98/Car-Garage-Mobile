import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface IProps {
  placeholder: string;
  data: {id: number | string; text: string}[];
  modalStatus: boolean;
  value: string | number;
  hideModal: () => void;
  selectedValue: (value: string | number) => void;
}

interface IState {
  value: string | number;
}

export default function ModalIOSComponent(props: IProps) {
  const [state, setState] = useState<IState>({
    value: -1,
  });

  useEffect(() => {
    if (state.value !== props.value) {
      setState((state) => ({
        ...state,
        value: props.value,
      }));
    }
  }, [props.value]);

  const _onValueChange = (value: string | number) => {
    setState((state) => ({
      ...state,
      value,
    }));
  };

  const _selectedValue = () => {
    props.selectedValue(state.value);
    props.hideModal();
  };

  const _hideModal = () => {
    props.hideModal();
    setState((state) => ({
      ...state,
      value: props.value,
    }));
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.modalStatus}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalButton}>
            <TouchableOpacity onPress={_hideModal}>
              <Text style={styles.modalButtonLeft}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_selectedValue}>
              <Text style={styles.modalButtonRight}>Select</Text>
            </TouchableOpacity>
          </View>
          <Picker selectedValue={state.value} itemStyle={styles.pickerItem} onValueChange={_onValueChange}>
            {props.placeholder ? <Picker.Item label={props.placeholder} value={-1} /> : null}
            {props.data && props.data.length > 0
              ? props.data.map((item, index) => <Picker.Item key={`item_${index}`} label={item.text} value={item.id} />)
              : null}
          </Picker>
        </View>
      </View>
    </Modal>
  );
}
