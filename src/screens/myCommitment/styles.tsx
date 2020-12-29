import {colors, fontSizes} from '@src/styles';
import {ms, s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: ms(54),
    height: ms(54),
    borderRadius: 27,
  },
  circleText: {
    fontSize: ms(12),
    textAlign: 'center',
    color: colors.darkMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    color: colors.darkMain,
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: ms(20),
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: ms(2),
      height: ms(4),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: ms(16),
  },
  itemLeft: {
    paddingRight: ms(20),
    borderRightColor: colors.grey,
    borderRightWidth: ms(1),
    flex: 1,
  },
  itemRight: {
    paddingLeft: ms(20),
    flex: 1,
  },
  itemSubtext: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: ms(14),
    color: colors.darkMain,
  },

  // imgBravo: {
  //   width: 20,
  //   height: 20,
  // },
  numberCount: {
    fontFamily: 'Poppins',
    fontSize: ms(24),
    lineHeight: ms(32),
    color: colors.silverTree,
    marginTop: ms(7),
    fontWeight: '500',
  },
  listTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(16),
    lineHeight: ms(24),
    color: colors.darkMain,
    opacity: 0.33,
    // marginBottom: 10,
  },
  wrapItemTitle: {
    flexDirection: 'row',
    // flex: 1,
    paddingRight: ms(20),
  },
  itemTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(19),
    color: colors.darkMain,
  },
  imgTitle: {
    width: ms(16),
    height: ms(16),
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomColor: '#E3E0DC',
    // borderBottomWidth: ms(1),
    // borderStyle: 'dashed',
    paddingBottom: ms(10),
  },

  borderDashed: {
    borderColor: '#C0C5CF',
    borderWidth: ms(2),
    borderStyle: 'dotted',
    width: s(285),
    borderRadius: 2,
  },

  itemBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: ms(20),
  },
  itemTopLeft: {
    flex: 1,
    paddingRight: ms(10),
  },
  itemTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextDetails: {
    fontSize: ms(15),
    color: colors.eastBay,
    opacity: 0.58,
    marginTop: ms(8),
  },
  itemTextDate: {
    fontSize: ms(13),
    color: colors.darkMain,
    opacity: 0.58,
    textAlign: 'left',
    paddingBottom: ms(15),
  },
  wrapCircle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleLabel: {
    fontSize: ms(10),
    color: colors.eastBay,
    marginTop: ms(3),
  },
  itemBottomText: {
    fontSize: ms(15),
    color: '#8E9096',
  },
  itemBottomName: {
    fontSize: ms(15),
    color: colors.darkMain,
    fontFamily: 'Poppins-Bold',
  },
  list: {
    paddingHorizontal: ms(15),
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  listNoPledge: {
    paddingHorizontal: ms(15),
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoPledge: {
    fontSize: ms(14),
    color: colors.darkGray,
    fontFamily: 'Poppins',
  },
  dash: {
    width: '100%',
    height: ms(1),
  },

  btnView: {
    marginBottom: ms(18),
  },
  btnViewContainer: {
    paddingVertical: 7,
  },
  textView: {
    color: colors.white,
    fontSize: ms(14),
  },
  wrapListTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ms(25),
    marginHorizontal: ms(5),
  },
  selectCommitments: {
    position: 'relative',
  },

  selectWrap: {
    marginRight: 10,
  },
  selectText: {
    color: colors.silverTree,
    fontSize: fontSizes.small,
    fontWeight: '500',
  },
  selectDropdown: {
    backgroundColor: colors.silverTree,
    borderRadius: ms(16),
    width: ms(136),
    height: ms(126),
    overflow: 'hidden',
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  dropdownTextStyle: {
    color: colors.white,
    fontSize: fontSizes.small,
    fontWeight: '500',
    backgroundColor: colors.silverTree,
    textAlign: 'right',
  },
  itemSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingRight: ms(40),
    borderWidth: 0,
    paddingVertical: ms(10),
    paddingHorizontal: ms(10),
    borderBottomWidth: 0,
    backgroundColor: colors.silverTree,
    color: colors.white,
  },
  textSelect: {
    color: colors.white,
    fontSize: fontSizes.small,
    fontWeight: '500',
    textAlign: 'right',
  },
  iconSelect: {
    position: 'absolute',
    right: 15,
  },
  titleImage: {
    width: ms(77),
    height: ms(15),
    position: 'absolute',
    top: ms(20),
  },

  modalContainer: {
    flex: 1,
    backgroundColor: colors.greyOpacity,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: ms(43),
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
  modalTile: {
    fontFamily: 'Poppins',
    fontSize: ms(15),
    lineHeight: ms(22),
    textAlign: 'center',
    color: colors.darkMain,
    // marginHorizontal: ms(47),
  },
  modalBtnClose: {
    alignItems: 'flex-end',
    padding: ms(5),
  },
  modalGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(5),
    marginVertical: ms(5),
  },
  itemTime: {
    fontSize: ms(12),
    color: colors.darkMain,
    opacity: 0.3,
    marginTop: (10),
  },
  itemContainer: {
    marginBottom: ms(20),
    flexDirection: 'row',
  },
  leftItem: {
    paddingTop: (5),
  },
  rightItem: {
    paddingLeft: s(20),
    flex: 1,
  },
  itemIconLeft: {
    width: s(40),
    height: (40),
    borderRadius: 20,
  },
  itemTextContent: {
    color: colors.eastBay,
    textAlign: 'left',
  },
  itemTextContentUser: {
    color: colors.silverTree,
    textAlign: 'left',
  },
});

export default styles;
