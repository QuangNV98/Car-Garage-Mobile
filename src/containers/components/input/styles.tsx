import {colors, fontSizes} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // width:"100%",
    marginTop: ms(10),
  },
  inputWrap: {
    borderColor: colors.darkNude,
    borderWidth: ms(1),
    borderRadius: ms(10),
    backgroundColor: colors.white,
    paddingHorizontal: ms(20),
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(49),
    position: 'relative',
    zIndex: 10,
  },
  inputStyles: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(13),
    // lineHeight: ms(19),
    flex: 1,
    // width:"100%",
    color: colors.darkMain,
    // backgroundColor:"red",
    marginTop: ms(-1),
    paddingVertical: ms(13.5),
    // height: ms(49),
  },
  iconLeftStyles: {
    width: ms(40),
    height: ms(49),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftIconStyle: {
    color: colors.darkGray,
  },
  iconRightStyles: {
    width: ms(40),
    height: ms(49),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightIconStyle: {
    color: colors.darkGray,
  },
  errorText: {
    color: colors.white,
    fontSize: fontSizes.verySmall,
  },
  wrapError: {
    position: 'relative',
    right: 0,
    bottom: 10,
    zIndex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  errorContent: {
    backgroundColor: colors.red,
    borderRadius: ms(10),
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingTop: 8,
    paddingBottom: 3,
    paddingHorizontal: 10,
  },
});

export default styles;
