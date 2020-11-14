import {colors, fontWeights, fontSizes} from '@src/styles';
import {ms, s, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: fontWeights.bold,
    fontSize: 24,
    color: colors.darkMain,
    marginVertical: vs(20),
  },
  itemContainer: {
    marginBottom: ms(20),
    flexDirection: 'row',
  },
  leftItem: {
    paddingTop: vs(5),
  },
  rightItem: {
    paddingLeft: s(20),
    flex: 1,
  },
  itemIconLeft: {
    width: s(40),
    height: vs(40),
    borderRadius: 20,
  },
  itemTextContent: {
    fontWeight: fontWeights.medium,
    color: colors.eastBay,
    textAlign: 'left',
  },
  itemTextContentUser: {
    fontWeight: fontWeights.medium,
    color: colors.silverTree,
    textAlign: 'left',
  },
  itemText: {
    fontSize: ms(14),
  },
  itemTime: {
    fontWeight: fontWeights.semiBold,
    fontSize: ms(12),
    color: colors.darkMain,
    opacity: 0.3,
    marginTop: vs(10),
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
  },
  closeIcon: {
    marginTop: vs(20),
    left: 0,
    marginLeft: s(7),
  },
  modalBody: {
    marginTop: vs(30),
  },
  iconItem: {
    width: ms(40),
    height: ms(40),
    marginBottom: ms(-10),
  },
  itemTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(20),
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
  },
  line: {
    borderStyle: 'dashed',
    borderRightColor: '#c0c5cf',
    borderRightWidth: 1,
    height: '100%',
  },
  btnView: {
    // marginVertical: 0,
  },
  btnViewContainer: {
    height: vs(32),
    paddingVertical: vs(12),
    paddingHorizontal: s(15),
  },
  textView: {
    fontSize: ms(14),
    // color: colors.silverTree
  },
});

export default styles;
