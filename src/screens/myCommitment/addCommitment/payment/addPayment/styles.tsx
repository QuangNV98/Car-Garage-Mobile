import {colors} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerCenter: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(22),
    color: colors.darkMain,
  },
  headerLeftTouch: {
    flex: ms(1),
    justifyContent: 'center',
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: ms(15),
    color: colors.darkMain,
  },
  viewTitle: {
    flexDirection: 'column',
    marginBottom: ms(20),
    marginTop: ms(0),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'left',
    color: colors.darkMain,
    zIndex: 1,
  },
  titleImage: {
    width: ms(120),
    height: ms(15),
    position: 'absolute',
    top: ms(15),
    right: '35%',
  },
  wrapCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(20),
    marginLeft: -ms(15),
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
  buttonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: ms(15),
    backgroundColor: colors.bgColor,
    paddingBottom: vs(24),
  },
});

export default styles;
