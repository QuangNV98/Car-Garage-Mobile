import {colors, fontWeights} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
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
  btnShowDetails: {
    marginTop: vs(20),
    width: ms(200),
    alignSelf: 'center',
    paddingVertical: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    paddingLeft: ms(10),
    color: colors.silverTree,
    textDecorationLine: 'underline',
    textDecorationColor: colors.silverTree,
  },
  methodWrap: {
    marginVertical: vs(20),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodName: {
    fontWeight: 'bold',
    paddingLeft: ms(10),
    fontSize: ms(32),
    color: colors.darkMain,
  },
  formTextLast: {
    marginTop: 10,
    paddingHorizontal: ms(10),
    fontSize: ms(10),
    color: colors.manatee,
    textAlign: 'center',
  },
  modalBody: {
    marginVertical: ms(30),
  },
  modalTitle: {
    fontSize: ms(32),
    fontWeight: fontWeights.medium,
  },
  modalUsername: {
    color: colors.red,
    fontWeight: fontWeights.medium,
    fontSize: ms(24),
    marginVertical: ms(15),
  },
  modalFiled: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(30),
  },
  modalFieldTitle: {
    fontSize: ms(12),
    fontWeight: fontWeights.medium,
    color: colors.manatee,
    marginBottom: vs(15),
  },
  modalFieldText: {
    fontSize: ms(14),
    fontWeight: fontWeights.medium,
    color: colors.darkMain,
  },
  fieldNumber: {
    fontWeight: '600',
    fontSize: ms(18),
  },
  wrapTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
    paddingTop: ms(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  totalStake: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalLost: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalNumber: {
    color: colors.white,
    textAlign: 'center',
  },
  totalTitle: {
    textAlign: 'center',
    marginTop: ms(10),
  },
  textLink: {
    color: colors.silverTree,
    textDecorationLine: 'underline',
    textDecorationColor: colors.silverTree,
    fontSize: ms(10),
  },
  modalWrap: {
    margin: 0,
    borderRadius: 0,
    backgroundColor: colors.bgColor,
  },
  modalContainer: {
    flex: 1,
    marginTop: ms(0),
    padding: ms(15),
    paddingTop: vs(50),
    backgroundColor: colors.bgColor,
  },
  closeIcon: {
    marginTop: vs(20),
    left: 0,
    marginLeft: s(7),
  },
  iconItem: {
    width: ms(40),
    height: ms(40),
    marginBottom: ms(-10),
  },
  itemTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    padding: ms(20),
    borderRadius: 16,
    shadowColor: 'rgba(131, 121, 108, 1)',
    shadowOffset: {
      width: 0,
      height: ms(9),
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 10,
  },
  textDefault: {
    fontSize: ms(13),
    textAlign: 'center',
    marginTop: vs(20),
  },
  moneyNumber: {
    textAlign: 'center',
    fontSize: ms(24),
    fontWeight: fontWeights.medium,
    color: colors.darkMain,
    marginVertical: vs(10),
  },
  userName: {
    color: colors.silverTree,
    textDecorationLine: 'underline',
    textDecorationColor: colors.silverTree,
    fontWeight: fontWeights.bold,
  },
  itemBottom: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: ms(20),
    backgroundColor: 'white',
    padding: ms(20),
    borderRadius: ms(16),
    shadowColor: 'rgba(131, 121, 108, 1)',
    shadowOffset: {
      width: 0,
      height: ms(9),
    },
    shadowOpacity: 0.13,
    shadowRadius: ms(14),
    elevation: ms(0),
    flexDirection: 'row',
  },
  itemBottomEach: {
    flex: 1,
  },
  itemBottomTitle: {
    fontWeight: fontWeights.medium,
    color: colors.darkMain,
    paddingBottom: ms(5),
    fontSize: ms(13),
  },
  itemBottomNumber: {
    fontWeight: fontWeights.medium,
    fontSize: ms(24),
  },
  itemBottomEachRight: {
    paddingLeft: s(20),
    // borderLeftColor: '#c0c5cf',
    // borderLeftWidth: 1,
    // borderStyle: 'dashed'
  },
  line: {
    borderStyle: 'dashed',
    borderRightColor: '#c0c5cf',
    borderRightWidth: 1,
    height: '100%',
  },
  titlePayout: {
    alignItems: 'center',
    marginTop: vs(50),
  },
});

export default styles;
