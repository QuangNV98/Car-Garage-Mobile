import {colors} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: ms(5),
    // marginTop: ms(34),
  },
  viewTitle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // marginVertical: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    color: colors.darkMain,
    zIndex: 1,
  },
  titleImage: {
    width: ms(175),
    height: ms(12),
    position: 'absolute',
    top: ms(15),
    left: '-5%',
  },
  titleImgRight: {
    width: ms(146.62),
    height: ms(145),
    marginRight: '-15%',
  },
  switch: {
    borderRadius: 104,
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    width: ms(130),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(46),
    marginTop: ms(15),
  },
  switchThumb: {
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbActive: {
    backgroundColor: colors.silverTree,
  },
  switchText: {
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.eastBay,
    textAlign: 'center',
  },
  switchTextActive: {
    color: colors.white,
    paddingVertical: ms(13),
    fontSize: ms(13),
    lineHeight: ms(20),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: ms(10),
    marginTop: ms(60),
  },
  textFor: {
    marginHorizontal: ms(10),
    marginTop: ms(15),
    fontSize: ms(13),
    lineHeight: ms(20),
  },
  viewFor: {
    flex: 1,
    flexDirection: 'column',
    // marginHorizontal: ms(5),
    alignItems: 'flex-start',
  },
  viewForNext: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: ms(20),
  },
  viewWeek: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  w_80: {
    width: ms(80),
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

  switchSmall: {
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    width: ms(160),
    borderRadius: ms(50),
    height: ms(46),
    marginTop: 15,
    marginHorizontal: 15,
  },
  switchThumbSmall: {
    borderRadius: ms(50),
    width: ms(77),
    height: ms(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbSmallActive: {
    backgroundColor: colors.silverTree,
    width: ms(77),
  },
  switchTextSmall: {
    fontSize: ms(11),
    color: colors.eastBay,
    textAlign: 'center',
  },
  switchTextSmallActive: {
    color: colors.white,
  },
});

export default styles;
