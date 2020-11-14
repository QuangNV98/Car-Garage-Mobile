import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    top: ifIphoneX(ms(50), ms(20)),
    left: ms(15),
    right: ms(15),
    zIndex: 10,
  },
  boxBottom: {
    position: 'absolute',
    bottom: ms(30),
    left: ms(15),
    right: ms(15),
    zIndex: 10,
    padding: ms(16),
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
  selectLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: ms(1),
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: ms(20),
    height: ms(49),
  },
  selectLocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  selectLocationText: {
    color: colors.darkMain,
  },
  searchButton: {
    width: '90%',
    // marginLeft: '10%',
  },
  markerSize: {
    width: ms(25),
    height: ms(25),
  },
  btnBack: {
    marginRight: '5%',
  },
  btnClose: {
    alignItems: 'flex-end',
    paddingLeft: ms(20),
  },
});

export default styles;
