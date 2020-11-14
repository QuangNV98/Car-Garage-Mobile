import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    marginBottom: ms(8),
    textAlign: 'center',
    color: colors.darkMain,
  },
  secText: {
    marginBottom: ms(30),
    marginHorizontal: ms(36),
    fontSize: ms(15),
    lineHeight: ms(20),
    textAlign: 'center',
    color: colors.eastBay,
    alignSelf: 'center',
  },
});

export default styles;
