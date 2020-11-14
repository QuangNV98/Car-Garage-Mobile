import {colors} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: ms(5),
    // marginTop: ms(20),
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
    zIndex: 1,
  },
  titleImage: {
    width: ms(130),
    height: ms(15),
    position: 'absolute',
    top: ms(15),
    left: -ms(10),
  },
  titleImgRight: {
    width: ms(146.62),
    height: ms(145),
    marginRight: '-12%',
  },
  switch: {
    borderRadius: 100,
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    width: ms(200),
  },
  switchSmall: {
    width: ms(160),
    borderRadius: ms(50),
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    height: ms(46),
    marginTop: 15,
  },
  switchThumb: {
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbSmall: {
    borderRadius: ms(50),
    width: ms(77),
    height: ms(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbActive: {
    backgroundColor: colors.silverTree,
    width: ms(110),
  },
  switchThumbSmallActive: {
    backgroundColor: colors.silverTree,
    width: ms(77),
  },
  switchText: {
    // fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(22),
    color: colors.eastBay,
    textAlign: 'center',
  },
  switchTextSmall: {
    fontSize: ms(11),
    color: colors.eastBay,
    textAlign: 'center',
  },
  switchTextSmallActive: {
    color: colors.white,
  },
  switchTextActive: {
    color: colors.white,
    paddingVertical: ms(16),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: ms(5),
    marginTop: ms(60),
  },
  viewInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: ms(20),
  },
  viewContent: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: ms(5),
  },
  viewInputGroupText: {
    marginHorizontal: ms(20),
    marginTop: ms(15),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.greyOpacity,
    justifyContent: 'center',
  },
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
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(10),
  },
  modalTile: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'center',
  },
  btnStartDate: {
    width: s(130),
    height: vs(50),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#D0D4DC',
    borderWidth: 1,
    marginLeft: s(10),
    flexDirection: 'row',
  },
  iconStartDate: {
    paddingLeft: 5,
    color: colors.silverTree,
  },
  w_120: {
    width: ms(120),
    // height: ms(49)
  },
  w_100: {
    width: ms(95),
    // height: ms(49)
  },
});

export default styles;
