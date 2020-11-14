import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
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
    fontSize: ms(15),
    color: colors.darkMain,
    lineHeight: ms(22),
  },
  listItemTextRight: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    color: colors.manatee,
    lineHeight: ms(22),
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
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(10),
  },
  modalValueChange: {
    fontSize: ms(24),
    lineHeight: ms(36),
    textAlign: 'center',
    paddingHorizontal: ms(30),
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
});

export default styles;
