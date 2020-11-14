import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: ms(40),
    marginLeft: ms(10),
    marginTop: ms(20),
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
    width: ms(140),
    height: ms(15),
    marginTop: ms(15),
    marginLeft: -ms(7),
    position: 'absolute',
    bottom: 0,
  },
  titleImgRight: {
    width: ms(160),
    height: ms(180),
    marginRight: '-8%',
  },
  rowForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectLocation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: ms(1),
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: ms(20),
    minHeight: ms(49),
  },
  selectLocationText: {
    marginLeft: ms(20),
    color: colors.darkGray,
  },
  selectSearchedLocationText: {
    marginLeft: ms(20),
    color: colors.darkMain,
  },
  textForm: {
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.eastBay,
  },
  textTime: {
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.eastBay,
    marginTop: ms(15),
  },
  switch: {
    borderRadius: 100,
    backgroundColor: colors.graySwitch,
    flexDirection: 'row',
    width: ms(200),
  },
  switchThumb: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: ms(90),
  },
  switchThumbActive: {
    backgroundColor: colors.silverTree,
    width: ms(110),
  },
  switchText: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(22),
    color: colors.eastBay,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  switchTextActive: {
    color: colors.white,
    paddingVertical: ms(16),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: ms(10),
    marginTop: ms(80),
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: ms(13),
    color: colors.darkMain,
    width: '100%',
    height: '100%',
  },
  inputWrapStyle: {
    width: ms(100),
  },
});

export default styles;
