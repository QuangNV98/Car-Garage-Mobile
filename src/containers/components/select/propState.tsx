import {ViewStyle} from 'react-native';

interface IProps {
  placeholder?: string;
  data: {id: number | string; text: string}[];
  onValueChange: (value: string | number) => void;
  value: string | number;
  styleContainer?: ViewStyle;
}

interface IState {
  modalStatus: boolean;
  value: string | number;
}

export {IProps, IState};
