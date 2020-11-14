import {colors} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgColor,
    marginBottom: ms(38),
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
    width: ms(204),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.greyOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: ms(100),
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: ms(40),
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
    width: ms(329),
    minHeight: ms(234),
  },
  modalTile: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
    marginBottom: ms(16),
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(10),
  },
  modalValueChange: {
    fontSize: ms(15),
    lineHeight: ms(23),
    textAlign: 'center',
    paddingHorizontal: ms(50),
  },
  modalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ms(20),
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
    fontSize: ms(13),
    lineHeight: ms(27),
    color: colors.darkMain,
    marginRight: ms(120),
  },
  m_r_95: {
    marginRight: ms(95),
  },
  modalInput: {marginHorizontal: ms(15), marginTop: ms(30), marginBottom: ms(20)},
  deleteAccountView: {paddingHorizontal: ms(25), flexDirection: 'row', justifyContent: 'center', marginTop: ms(29)},
  cancleBtn: {
    marginRight: ms(10),
  },
  headerImageContainer: {
    marginTop: ms(34),
    marginBottom: ms(8),
    alignSelf: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: colors.white,
    borderStyle: 'solid',
    borderWidth: ms(4),
    borderRadius: 110,
  },
  headerImage: {
    width: ms(54),
    height: ms(54),
    borderRadius: 27,
    opacity: 0.7,
  },
  txtChangePhoto: {
    fontSize: s(13),
    lineHeight: vs(20),
    textAlign: 'center',
    color: colors.silverTree,
  },
  inputEmail: {
    marginHorizontal: ms(19),
  },
});

export default styles;
