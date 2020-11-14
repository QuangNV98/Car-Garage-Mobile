import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapCongrat: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: ms(10),
  },
  titleImage: {
    width: ms(220),
    height: ms(15),
    marginTop: ms(15),
    marginLeft: -ms(7),
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
  textDefault: {
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.eastBay,
    textAlign: 'center',
    marginTop: ms(18),
  },
  textDefaultBelow: {
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.eastBay,
    textAlign: 'center',
    marginBottom: ms(30),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ms(15),
  },
});

export default styles;
