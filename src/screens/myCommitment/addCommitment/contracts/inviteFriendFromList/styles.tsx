import {colors} from '@src/styles';
import {moderateScale, ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleImage: {
    width: ms(80),
    height: ms(15),
    position: 'absolute',
    bottom: ms(5),
    left: ms(30),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(34),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
  h_300: {
    height: ms(300),
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: moderateScale(15),
    borderRadius: 16,
    marginVertical: ms(5),
    shadowColor: 'rgba(131, 121, 108, 1)',
    shadowOffset: {
      width: 0,
      height: ms(9),
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 10,
    position: 'relative',
  },
});

export default styles;
