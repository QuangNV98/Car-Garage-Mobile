import {moderateScale, ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {Dimensions, StyleSheet} from 'react-native';
import colors from './colors';
import fontWeights from './fontWeights';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export default StyleSheet.create({
  colorPrimary: {
    color: colors.silverTree,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: ms(16),
    paddingTop: ifIphoneX(ms(44), ms(25)),
    paddingBottom: ms(10),
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: ms(15),
    fontWeight: 'bold',
    color: colors.darkMain,
    textAlign: 'center',
  },
  bottomFixed: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: ms(20),
  },
  inputContainer: {
    flexDirection: 'row',
    margin: moderateScale(10),
    padding: moderateScale(5),
    width: SCREEN_WIDTH - ms(50),
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  icon: {
    marginLeft: ms(10),
    marginRight: ms(10),
    alignSelf: 'center',
    minWidth: ms(20),
    height: ms(20),
    fontSize: ms(20),
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: ms(20),
    marginLeft: ms(10),
    textAlign: 'left',
    height: ms(35),
  },
  backIcon: {
    width: ms(25),
    height: ms(25),
  },
  p_hori_5: {
    paddingHorizontal: ms(5),
  },
  m_l_10: {
    marginLeft: ms(10),
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: ms(10),
    marginTop: ms(10),
  },
  m_0: {
    margin: 0,
  },
  m_hori_0: {
    marginHorizontal: 0,
  },
  m_hori_10: {
    marginHorizontal: ms(10),
  },
  m_hori_15: {
    marginHorizontal: ms(15),
  },
  m_hori_30: {
    marginHorizontal: ms(30),
  },
  flex_0: {
    flex: 0,
  },
  flex_1: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  flexColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSeftCenter: {
    alignSelf: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  pd5: {
    padding: moderateScale(5),
  },
  pd10: {
    padding: moderateScale(10),
  },
  pd15: {
    padding: moderateScale(15),
  },
  pd20: {
    padding: moderateScale(20),
  },
  pl0: {
    paddingLeft: 0,
  },
  pl5: {
    paddingLeft: ms(5),
  },
  pl10: {
    paddingLeft: ms(10),
  },
  pl20: {
    paddingLeft: ms(20),
  },
  pt20: {
    paddingTop: ms(20),
  },
  pt0: {
    paddingTop: ms(0),
  },
  pt10: {
    paddingTop: ms(10),
  },
  pv10: {
    paddingVertical: ms(10),
  },
  noPadding: {
    padding: 0,
  },
  pb0: {
    paddingBottom: 0,
  },
  py10: {
    paddingVertical: ms(10),
  },
  py15: {
    paddingVertical: ms(15),
  },
  py5: {
    paddingVertical: ms(5),
  },
  py3: {
    paddingVertical: ms(3),
  },
  py0: {
    paddingVertical: 0,
  },
  px30: {
    paddingHorizontal: ms(30),
  },
  px20: {
    paddingHorizontal: ms(20),
  },
  px0: {
    paddingHorizontal: 0,
  },
  pr5: {},
  pr10: {
    paddingRight: ms(10),
  },
  pr0: {
    paddingRight: 0,
  },
  pr3: {
    paddingRight: ms(3),
  },
  m5: {
    margin: moderateScale(5),
  },
  m10: {
    margin: moderateScale(10),
  },
  ml10: {
    marginLeft: ms(10),
  },
  ml5: {
    marginLeft: ms(5),
  },
  ml20: {
    marginLeft: ms(20),
  },
  mt0: {
    marginTop: 0,
  },
  mt5: {
    marginTop: ms(5),
  },
  mt10: {
    marginTop: ms(10),
  },
  mt15: {
    marginTop: ms(15),
  },
  mt20: {
    marginTop: ms(20),
  },
  mt30: {
    marginTop: ms(30),
  },
  mt40: {
    marginTop: ms(40),
  },
  mb0: {
    marginBottom: 0,
  },
  mb20: {
    marginBottom: ms(20),
  },
  mb25: {
    marginBottom: ms(25),
  },
  mb30: {
    marginBottom: ms(30),
  },
  mb5: {
    marginBottom: ms(5),
  },
  mb10: {
    marginBottom: ms(10),
  },
  mb15: {
    marginBottom: ms(15),
  },
  mr0: {
    marginRight: 0,
  },
  mr5: {
    marginRight: ms(5),
  },
  mr10: {
    marginRight: ms(10),
  },
  mr20: {
    marginRight: ms(20),
  },
  mx20: {
    marginHorizontal: ms(20),
  },
  mx15: {
    marginHorizontal: ms(15),
  },
  mx10: {
    marginHorizontal: ms(10),
  },
  mx5: {
    marginHorizontal: ms(5),
  },
  my5: {
    marginVertical: ms(5),
  },
  my10: {
    marginVertical: ms(10),
  },
  my20: {
    marginVertical: ms(20),
  },
  w_100: {
    width: ms(100),
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  btnBlue: {
    backgroundColor: colors.white,
    borderColor: colors.silverTree,
    marginTop: ms(-2),
  },
  relative: {
    position: 'relative',
  },
  wrapTextLink: {
    paddingVertical: ms(8),
    width: 'auto',
  },
  textLink: {
    fontFamily: 'Poppins-Semibold',
    fontSize: ms(13),
    lineHeight: ms(20),
    textAlign: 'right',
    color: colors.silverTree,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: moderateScale(30),
    borderRadius: 16,
    marginVertical: ms(5),
    shadowColor: 'rgba(131, 121, 108, 1)',
    shadowOffset: {
      width: 0,
      height: ms(9),
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 10,
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    right: ms(5),
    top: ms(5),
    width: ms(40),
    height: ms(40),
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: ms(24),
    lineHeight: ms(28),
    textAlign: 'center',
    color: colors.darkMain,
    marginVertical: ms(15),
  },
  h_300: {
    height: 300,
  },

  semiBold: {
    fontWeight: fontWeights.medium,
  },
});
