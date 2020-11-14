import {colors} from '@src/styles';
import {moderateScale, ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export {SCREEN_WIDTH};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapCarousel: {
    justifyContent: 'center',
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: ms(26),
    lineHeight: ms(36),
    color: colors.darkMain,
    textAlign: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: ms(14.5),
    lineHeight: ms(22.5),
    color: colors.eastBay,
    textAlign: 'center',
  },
  dotContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: ms(54),
  },
  wrapDot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotActive: {
    width: ms(8),
    height: ms(8),
    borderRadius: moderateScale(6),
    marginHorizontal: ms(4),
    backgroundColor: colors.silverTree,
  },
  dot: {
    backgroundColor: colors.silverTreeOpacity,
    width: ms(8),
    height: ms(8),
    borderRadius: moderateScale(6),
    marginHorizontal: ms(4),
  },
  btnClear: {
    backgroundColor: 'transparent',
  },
  textSkip: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(13),
    lineHeight: ms(20),
    color: colors.darkGray,
  },
  wrapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(15),
  },
  slideImgFirst: {
    width: ms(302),
    height: ms(252.24),
  },
  slideImgSecond: {
    width: ms(268.5),
    height: ms(258.73),
  },
  slideImgLast: {
    width: ms(283.54),
    height: ms(268.72),
  },
  slideImgWellcome: {
    width: ifIphoneX(ms(287), ms(200)),
    height: ifIphoneX(ms(360.74), ms(263.56)),
  },
  bottomFixed: {
    // justifyContent: 'flex-end',
    backgroundColor: colors.bgColor,
    // marginTop: ms(10)
    paddingBottom: ms(25),
  },
  titleImageFirst: {
    width: ms(140),
    height: ms(20),
    position: 'absolute',
    right: ms(0),
    bottom: ms(2),
  },
  titleImageSecond: {
    width: ms(255),
    height: ms(15),
    position: 'absolute',
    bottom: ms(5),
    right: ms(3),
  },
  titleImageLast: {
    width: ms(115),
    height: ms(15),
    position: 'absolute',
    bottom: ms(5),
    right: ms(125),
  },
  titleImageWellcome: {
    width: ms(140),
    height: ms(20),
    position: 'absolute',
    right: ms(148),
    bottom: ms(0),
  },
  viewTitle: {
    flexDirection: 'column',
    // marginTop: ms(83.76),
    marginBottom: ms(14),
  },
});

export default styles;
