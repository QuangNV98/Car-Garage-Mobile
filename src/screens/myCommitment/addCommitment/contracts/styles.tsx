import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  conditionText: {
    color: colors.bunting,
    fontSize: ms(13),
    lineHeight: ms(20),
    marginTop: -ms(2),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  customText: {
    marginHorizontal: ms(30),
    fontSize: ms(13),
    lineHeight: ms(20),
    textAlign: 'right',
    color: colors.silverTree,
    textDecorationLine: 'underline',
  },
  text: {
    marginRight: ms(30),
    fontSize: ms(13),
    color: colors.logan,
  },
  listFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(20),
    maxWidth: '90%',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  w_180: {
    width: ms(180),
  },
  titleImage: {
    width: ms(80),
    height: ms(15),
    marginTop: ms(15),
    position: 'absolute',
    top: 0,
    left: 18,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    textAlign: 'left',
    marginHorizontal: ms(18),
    color: colors.darkMain,
    zIndex: 1,
  },
  textDefault: {
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.eastBay,
    textAlign: 'left',
    // marginRight: '28%',
    marginTop: ms(13),
    marginLeft: ms(18),
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: ms(40),
  },
  wrapBtnNoStake: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: ms(160),
  },
  inputContainer: {
    // marginTop: ms(10),
  },
  inputLabel: {
    fontFamily: 'Poppins-Bold',
    color: colors.eastBay,
    // marginBottom: ms(5),
    fontWeight: 'normal',
  },
});

export default styles;
