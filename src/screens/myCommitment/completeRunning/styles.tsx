import {colors, fontWeights} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerCenter: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(22),
    color: colors.darkMain,
  },
  headerLeftTouch: {
    flex: ms(1),
    justifyContent: 'center',
  },
  subTitle: {
    marginTop: ms(20),
    fontFamily: 'Poppins-Medium',
    fontSize: ms(18),
    lineHeight: ms(30),
    color: colors.darkMain,
    textAlign: 'center',
  },
  wrapDuration: {
    marginVertical: ms(20),
  },
  durationNumber: {
    fontFamily: 'Poppins-Semibold',
    fontSize: ms(26),
    color: colors.darkMain,
    textAlign: 'center',
  },
  durationText: {
    fontSize: ms(16),
    color: colors.darkMain,
    textAlign: 'center',
  },
  underLine: {
    top: ms(-60),
    left: ms(20),
  },
});

export default styles;
