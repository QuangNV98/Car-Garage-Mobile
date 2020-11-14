import {colors} from '@src/styles';
import {moderateScale, ms, s, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: ms(40),
    marginLeft: ms(10),
    // marginTop: ms(24),
  },
  viewTitle: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    color: colors.darkMain,
  },
  titleImage: {
    width: ms(135),
    height: ms(15),
    marginTop: ms(15),
    marginLeft: -ms(7),
    position: 'absolute',
    bottom: 0,
  },
  item: {
    marginHorizontal: ms(6),
    marginBottom: ms(10),
    padding: ms(22),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemLeft: {
    paddingLeft: ms(28),
    flexDirection: 'column',
  },
  itemTitle: {
    fontFamily: 'Poppins-Bold',
    lineHeight: ms(23),
    fontSize: ms(15),
    color: colors.darkMain,
  },
  itemText: {
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.manatee,
    paddingTop: ms(8),
  },
  imgRight: {
    width: ms(146.62),
    height: ms(150),
    marginRight: '-15%',
  },
  imgIcon: {
    width: ms(12),
    height: ms(12),
    marginLeft: ms(12),
  },
  headerImage: {
    width: ms(220),
    height: ms(200),
    alignSelf: 'center',
    marginLeft: s(60),
    marginTop: vs(-50),
    marginBottom: vs(-20),
  },
  text: {
    marginTop: ms(16),
    fontSize: ms(13),
    textAlign: 'center',
    color: colors.eastBay,
    marginBottom: ms(25),
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: moderateScale(25),
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
  modal: {
    width: ms(288),
    alignSelf: 'center',
    height: ms(402),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleImageModal: {
    width: ms(110),
    height: ms(15),
    position: 'absolute',
    bottom: ms(5),
    left: ms(5),
  },
  titleModal: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
});

export default styles;
