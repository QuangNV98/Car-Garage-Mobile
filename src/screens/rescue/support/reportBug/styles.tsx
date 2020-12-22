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
    marginLeft: ms(16),
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

  contentTextMedium: {
    fontSize: ms(11),
    lineHeight: ms(22),
    marginRight: ms(16),
    marginTop: vs(10),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: colors.darkMain,
  },

  headerText: {
    fontSize: ms(13),
    fontFamily: 'Poppins-Regular',
    color: colors.darkMain,
    textAlign: 'center',
    fontWeight: '600',
  },

  containerStyleInput: {
    marginTop: ms(10),
  },
  containerStyleInputArea: {
    marginTop: ms(10),
    height: ms(230),
    borderColor: colors.darkNude,
    borderWidth: ms(1),
    borderRadius: ms(10),
    backgroundColor: colors.white,
    paddingHorizontal: ms(20),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  textInputArea: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    color: colors.darkMain,
    alignSelf: 'flex-start',
    paddingTop: ms(15),
    height: 230,
  },

  boxAttach: {
    marginTop: ms(15),
  },
  attachTitle: {
    fontWeight: '400',
    fontSize: ms(13),
    marginBottom: ms(10),
  },
  boxImgAttach: {
    width: ms(50),
    height: ms(50),
    position: 'relative',
    backgroundColor: colors.gray,
    borderRadius: ms(10),
    marginRight: ms(5),
  },
  imgAttach: {
    width: 51,
    height: 51,
    borderRadius: ms(10),
  },
  iconClose: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  submitBtn: {
    marginBottom: ms(30),
    width: '100%',
  },
});

export default styles;
