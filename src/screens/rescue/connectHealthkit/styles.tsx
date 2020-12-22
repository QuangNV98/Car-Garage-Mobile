import {colors} from '@src/styles';
import {ms, vs, s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    flexDirection: 'column',
  },
  wrapImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(14),
  },
  image: {
    width: vs(140),
    height: s(120),
    margin: ms(15),
  },
  headerContainer: {
    backgroundColor: colors.bgColor,
  },
  headerLeftTouch: {
    flex: 1,
    justifyContent: 'center',
  },
  headerCenter: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.darkMain,
  },
  viewContainer: {
    marginLeft: ms(21),
    marginTop: vs(18),
  },
  m_r_95: {
    marginRight: ms(95),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    color: colors.darkMain,
    marginTop: vs(18),
    alignSelf: 'center',
  },
  titleSub: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    color: colors.darkMain,
    alignSelf: 'center',
    zIndex: 1,
  },
  textContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.darkMain,
    marginTop: vs(16),
  },
  titleImage: {
    width: ms(167),
    height: ms(15),
    marginTop: ms(10),
    marginLeft: ms(15),
    position: 'absolute',
    bottom: 0,
  },
  buttonConnect: {
    marginBottom: vs(30),
    marginTop: vs(60),
  },
});

export default styles;
