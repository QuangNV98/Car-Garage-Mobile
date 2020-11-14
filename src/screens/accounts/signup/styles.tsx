import {colors} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    marginTop: ifIphoneX(ms(112.57), ms(20)),
    marginBottom: ms(16),
    textAlign: 'center',
    color: colors.darkMain,
  },
  text: {
    margin: ms(10),
    fontSize: ms(13),
    color: colors.dark,
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ms(5),
    marginLeft: -ms(15),
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingRight: 0,
    marginRight: 0,
  },
  conditionText: {
    color: colors.eastBay,
    fontSize: ms(13),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  link: {
    fontSize: ms(13),
    color: colors.silverTree,
    marginLeft: -ms(13),
    textDecorationLine: 'underline',
  },
  bottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: ms(15),
    textAlign: 'center',
    color: colors.darkMain,
  },
  modal: {
    marginTop: 50,
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingLeft: ms(25),
    paddingRight: ms(25),

    borderRadius: 16,
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
  titleModal: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(23),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: colors.bgColor,
  },
  intro: {
    fontSize: ms(11),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(22),
    opacity: 0.58,
    color: '#485162',
    marginTop: vs(14),
  },
  titleContentModal: {
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
  btnClose: {
    alignSelf: 'flex-end',
    marginTop: ms(20),
    marginRight: ms(20),
  },
  img: {
    alignSelf: 'center',
    width: ms(130),
    height: ms(39.43),
  },
  bottomFixed: {
    backgroundColor: colors.bgColor,
    paddingBottom: ms(25),
    // marginTop: ifIphoneX(ms(179), ms(101)),
  },
});

export default styles;
