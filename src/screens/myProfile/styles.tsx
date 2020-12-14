import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerImageContainer: {
    marginVertical: ms(34),
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
    width: ms(110),
    height: ms(110),
    borderRadius: 55,
  },
  listItemContainer: {
    backgroundColor: colors.bgColor,
    height: ms(55),
  },
  listItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    color: colors.darkMain,
    lineHeight: ms(22),
  },
  menuBottomContainer: {
    marginVertical: ms(40),
  },
  menuBottomButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 76,
    width: ms(180),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuBottomText: {
    color: colors.black,
    fontSize: ms(13),
    lineHeight: ms(20),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.greyOpacity,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: ms(43),
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
    fontFamily: 'Poppins',
    fontSize: ms(15),
    lineHeight: ms(22),
    textAlign: 'center',
    color: colors.darkMain,
    // marginHorizontal: ms(47),
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(5),
  },
  modalGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(5),
    marginVertical: ms(5),
  },
  map: {
    height: 600,
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  markerSize: {
    width: ms(25),
    height: ms(25),
  },
});

export default styles;
