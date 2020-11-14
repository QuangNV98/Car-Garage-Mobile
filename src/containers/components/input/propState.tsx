import {GestureResponderEvent, StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

interface IProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: ViewStyle;

  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  maxLength?: number;

  /** left icon */
  leftIconType?: string;
  leftIcon?: string;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  leftIconStyle?: TextStyle;
  leftIconOnPress?: (event: GestureResponderEvent) => void;
  leftIconOnPressIn?: (event: GestureResponderEvent) => void;
  leftIconOnPressOut?: (event: GestureResponderEvent) => void;

  /** right icon */
  rightIconType?: string;
  rightIcon?: string;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconStyle?: TextStyle;
  rightIconOnPressIn?: (event: GestureResponderEvent) => void;
  rightIconOnPressOut?: (event: GestureResponderEvent) => void;
  rightIconOnPress?: (event: GestureResponderEvent) => void;

  /** error message */
  errorMessage?: string;
  errorStye?: string;

  testID?: string;
}

export {IProps};
