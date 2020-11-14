import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    marginTop: ifIphoneX(ms(165.57), ms(120.57)),
    marginBottom: ms(26),
    textAlign: 'center',
    color: colors.darkMain,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: ms(13),
    lineHeight: ms(19.5),
    color: colors.dark,
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ms(7),
  },
  forgotView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: ms(8),
    marginRight: ms(2),
  },
  img: {
    alignSelf: 'center',
    width: ms(130),
    height: ms(39.43),
  },
  bottomFixed: {
    backgroundColor: colors.bgColor,
    paddingBottom: ms(25),
  },
});

export default styles;
