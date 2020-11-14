import {colors} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  headerContainer: {
    height: vs(50),
    marginTop: vs(100),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImages: {
    alignSelf: 'center',
    width: s(60),
    height: vs(60),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: s(24),
    marginTop: vs(30),
    textAlign: 'center',
    color: colors.bunting,
    width: s(288),
  },
  secText: {
    width: SCREEN_WIDTH - s(100),
    margin: ms(10),
    fontSize: s(13),
    lineHeight: vs(20),
    textAlign: 'center',
    color: colors.black,
    alignSelf: 'center',
  },
  inputPassword: {
    width: s(288),
    height: vs(49),
  },
  btnSubmit: {
    width: s(288),
  },
  img: {
    alignSelf: 'center',
    width: ms(130),
    height: ms(39.43),
  },
});

export default styles;
