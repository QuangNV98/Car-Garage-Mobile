import {colors} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
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
  listItemContainer: {
    backgroundColor: colors.bgColor,
    height: ms(55),
  },
  listItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(13),
    color: colors.darkMain,
    lineHeight: ms(20),
  },
  listItemTextRight: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(13),
    color: colors.manatee,
    lineHeight: ms(20),
    textAlign: 'right',
  },
  modalContainer: {flex: 1, backgroundColor: colors.greyOpacity, justifyContent: 'center'},
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: ms(16),
    borderRadius: 16,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'column',
    padding: ms(10),
  },
  modalTile: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
    color: colors.darkMain,
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(5),
  },
  modalValueChange: {
    height: 36,
    borderWidth: 0,
    width: 66,
    fontFamily: 'Poppins-Regular',
    fontSize: ms(24),
    lineHeight: ms(36),
    // marginHorizontal: ms(25),
    textAlign: 'center',
  },
  modalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ms(26),
    marginBottom: ms(14),
  },
  modalViewTouch: {
    width: ms(50),
    height: ms(50),
    alignItems: 'center',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
  },
  checkBoxText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
    fontSize: ms(18),
    lineHeight: ms(27),
    color: colors.darkMain,
    marginRight: ms(170),
  },
  m_r_95: {
    marginRight: ms(145),
  },
  btnSave: {
    marginTop: ms(0),
    marginBottom: ms(22),
  },
  switchSmall: {
    width: ms(120),
    borderRadius: ms(50),
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    height: ms(46),
    alignSelf: 'center',
    // justifyContent:'center',
    marginBottom: vs(19),
  },
  switchThumbSmall: {
    borderRadius: ms(30),
    width: ms(60),
    // height: ms(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumb: {
    borderRadius: ms(50),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbSmallActive: {
    backgroundColor: colors.silverTree,
    width: ms(60),
    borderRadius: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchTextSmall: {
    fontSize: ms(13),
    color: colors.eastBay,
    textAlign: 'center',
  },
  switchTextSmallActive: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
