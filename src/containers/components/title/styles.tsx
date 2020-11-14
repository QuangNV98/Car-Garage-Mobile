import {colors} from '@src/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {},
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    zIndex: 10,
    color: colors.darkMain,
  },
  underLine: {
    zIndex: 9,
    position: 'relative',
    height: 15,
    width: 123,
    left: -15,
    top: -18,
  },
});

export default styles;
