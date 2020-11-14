import {colors} from '@src/styles';
import {ms, s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputStyle: {
    textAlign: 'center',
    fontSize: ms(16),
    color: colors.darkMain,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingRight: 0,
    marginRight: 0,
  },
  conditionText: {
    color: colors.eastBay,
    fontSize: ms(13),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  link: {
    fontSize: ms(13),
    color: colors.eastBay,
    marginLeft: -ms(10),
  },
  wrapCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(20),
    marginLeft: -ms(15),
  },

  wrapImg: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 20,
  },
  img: {
    width: ms(200),
    height: ms(200),
  },
  textSuccess: {
    fontSize: ms(15),
    lineHeight: ms(22),
    textAlign: 'center',
    color: colors.darkMain,
    marginTop: ms(20),
  },
  wrapSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(25),
  },
  labelSwitch: {
    fontSize: ms(15),
    color: 'rgba(131, 121, 108, 0.69)',
  },
  titleImage: {
    width: ms(120),
    height: ms(15),
    position: 'absolute',
    top: ms(15),
    right: '35%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'left',
    color: colors.darkMain,
    zIndex: 1,
    marginLeft: s(5),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: ms(15),
    marginTop: ms(20),
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(34),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
  modalTitleImage: {
    width: ms(140),
    height: ms(15),
    position: 'absolute',
    right: ms(5),
    bottom: ms(5),
  },
  viewTitle: {
    flexDirection: 'column',
  },
});

export default styles;
