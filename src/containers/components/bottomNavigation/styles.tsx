import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bottomNavigation: {
    height: ifIphoneX(ms(83), ms(63)),
    borderColor: colors.darkNude,
    borderWidth: ms(1),
    borderStyle: 'solid',
    zIndex: 1,
    paddingLeft: ms(5),
  },
  fullTabLabelStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(10),
  },
  btnCenter: {
    position: 'absolute',
    zIndex: 1,
    bottom: ifIphoneX(ms(100), ms(75)),
    borderRadius: ms(68),
    height: ms(68),
    width: ms(68),
    right: ms(15),
    backgroundColor: colors.silverTree,
  },
  iconAdd: {
    alignSelf: 'center',
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
    marginBottom: ms(5),
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(5),
  },
  modalGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ms(5),
    // marginVertical: ms(5),
  },
});

export default styles;
