import {colors} from '@src/styles';
import {moderateScale, ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: ms(10),
    minWidth: ms(114),
  },
  btnContainer: {
    minWidth: ms(114),
    minHeight: ms(56),
    borderWidth: ms(1),
    alignItems: 'center',
    paddingVertical: ms(15),
    backgroundColor: colors.silverTree,
    borderColor: colors.silverTree,
    borderRadius: moderateScale(76),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: colors.white,
    fontSize: ms(16),
    lineHeight: ms(24),
  },
});

export default styles;
