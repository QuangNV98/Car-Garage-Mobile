import {colors} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
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
    marginLeft: ms(17),
    marginRight: ms(17),
  },
  m_r_95: {
    marginRight: ms(95),
  },
  intro: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
    marginTop: vs(14),
  },
  title: {
    fontSize: ms(13),
    fontFamily: 'Poppins-SemiBold',
    lineHeight: ms(20),
    color: '#3B404A',
    marginTop: vs(20),
  },
  content: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
    marginTop: vs(10),
  },
  contentSub: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
  },
  contentFooter: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
    marginTop: vs(10),
    marginBottom: vs(30),
  },
});

export default styles;
