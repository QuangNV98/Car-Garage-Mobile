import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signText: {
    fontFamily: 'Poppins-Bold',
    margin: ms(10),
    marginLeft: 0,
    color: colors.mediumSlateBlue,
    fontSize: ms(20),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
    color: colors.darkMain,
    marginTop: ifIphoneX(ms(165.57), ms(150.57)),
  },
  secText: {
    marginTop: ms(13),
    fontSize: ms(16),
    lineHeight: ms(24),
    textAlign: 'center',
    color: colors.eastBay,
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: 'red',
    marginBottom: ms(38),
  },
  bottomFixed: {
    backgroundColor: colors.bgColor,
    paddingBottom: ms(25),
  },
  img: {
    alignSelf: 'center',
    width: ms(130),
    height: ms(39.43),
  },
});

export default styles;
