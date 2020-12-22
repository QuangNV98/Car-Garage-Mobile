import {colors} from '@src/styles';
import {ms, vs, s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    // paddingHorizontal: ms(16),
    // paddingTop: ifIphoneX(ms(40), ms(25)),
    // paddingBottom: ms(10),
  },
  headerContainer: {
    backgroundColor: colors.bgColor,
    // marginBottom: ms(38),
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
    marginRight: ms(16),
  },
  m_r_95: {
    marginRight: ms(95),
  },
  content: {
    marginTop: vs(6),
  },
  contentText: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
    marginRight: ms(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ms(16),
    flex: 1,
  },
  headerText: {
    fontSize: ms(13),
    fontFamily: 'Poppins-SemiBold',
    lineHeight: ms(20),
    color: '#3B404A',
    flex: 9 / 10,
    marginRight: ms(13),
  },
  footer: {
    marginTop: ms(16),
  },
  headerImage: {
    width: ms(288),
    alignSelf: 'center',
    marginTop: vs(25),
  },
  listImage: {
    width: ms(5),
    height: ms(5),
    marginRight: ms(11),
  },
  listItemContainer: {
    backgroundColor: colors.bgColor,
    height: ms(55),
  },
  listItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(13),
    color: colors.darkMain,
    lineHeight: ms(22),
  },
});

export default styles;
