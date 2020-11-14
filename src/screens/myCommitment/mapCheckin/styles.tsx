import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    color: colors.darkMain,
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boxTop: {
    position: 'absolute',
    top: ms(20),
    left: ms(15),
    right: ms(15),
    zIndex: 10,
  },
  leftIcon: {
    width: ms(50),
    paddingLeft: ms(20),
  },
  rightIcon: {
    width: ms(50),
    paddingRight: ms(20),
  },
  boxBottom: {
    position: 'absolute',
    bottom: ms(30),
    left: ms(15),
    right: ms(15),
    zIndex: 10,
    // height: 84,
    padding: ms(25),
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginVertical: ms(5),
    shadowColor: 'rgba(131, 121, 108, 1)',
    shadowOffset: {
      width: 0,
      height: ms(9),
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 10,
  },
  textBoxBottom: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    color: colors.darkMain,
    paddingLeft: ms(10),
  },
  modalContainer: {
    minHeight: ms(200),
    backgroundColor: colors.nude,
    padding: ms(25),
    borderRadius: 16,
    marginVertical: ms(5),
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
  modalClose: {
    position: 'absolute',
    right: ms(5),
    top: ms(5),
    width: ms(40),
    height: ms(40),
  },
  img: {
    height: ms(55),
    width: ms(55),
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(28),
    textAlign: 'center',
    color: colors.darkMain,
    marginVertical: ms(15),
  },
  modalText: {
    fontSize: ms(13),
    lineHeight: ms(17),
    color: colors.darkMain,
    textAlign: 'center',
  },
  markerSize: {
    width: ms(25),
    height: ms(25),
  },
});

export default styles;
