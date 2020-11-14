import {GestureResponderEvent, StyleProp, TextStyle, ViewStyle} from 'react-native';

interface IProps {
  styleContainer?: ViewStyle;
  styleButton?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  disabled?: boolean;
  btnFull?: boolean;
  clear?: boolean;
  styleText?: StyleProp<TextStyle>;
  hasIcon?: boolean;
  iconName?: string;
  sizeIcon?: number;
  testID?: string;
}

export {IProps};
