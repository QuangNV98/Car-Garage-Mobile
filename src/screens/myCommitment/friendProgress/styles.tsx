import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerLeftTouch: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomRowContainer: {
    margin: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleImage: {
    width: ms(180),
    height: ms(15),
    position: 'absolute',
    top: ms(18),
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: ms(13),
    color: colors.darkMain,
    opacity: 0.5,
  },
  viewCircleFirst: {
    marginTop: ms(20),
    borderRadius: 250,
    // borderWidth: ms(1),
    borderColor: colors.grey,
    // width: Dimensions.get('screen').width - ms(50),
    // height: Dimensions.get('screen').width - ms(50),
    alignSelf: 'center',
  },
  viewCircleSecond: {
    // marginTop: ms(20),
    borderRadius: 250,
    // borderWidth: ms(1),
    borderColor: colors.silverTree,
    // width: Dimensions.get('screen').width - ms(90),
    // height: Dimensions.get('screen').width - ms(90),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AnimatedCircularProgress: {alignItems: 'center', marginTop: ms(20), justifyContent: 'center'},
  viewTextFill: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  font40: {
    fontSize: ms(40),
  },
  fontBold: {fontFamily: 'Poppins-Bold', height: 'auto', width: 100, textAlign: 'center'},
  bottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: ms(15),
    textAlign: 'center',
    color: colors.darkMain,
  },
  bottomSheetItem: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {},
  itemLeftDate: {
    fontSize: ms(13),
    marginBottom: ms(10),
  },
  itemLeftnumber: {
    fontSize: ms(11),
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imgUp: {
    width: 15,
    height: 25,
  },
  itemRightNumber: {
    fontWeight: 'bold',
    fontSize: ms(15),
    color: colors.greenMain,
    marginLeft: 10,
  },
  boxContent: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: ms(-20),
  },
  titleField: {
    fontSize: ms(13),
    lineHeight: ms(20),
    textAlign: 'center',
    color: colors.manatee,
    marginBottom: 5,
  },
  fieldText: {
    fontSize: ms(15),
    lineHeight: ms(23),
    textAlign: 'center',
    color: colors.darkMain,
    fontWeight: 'bold',
  },
  bottomCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitText: {
    color: '#485162',
    fontSize: ms(13),
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
    // marginBottom: ms(5),
  },
  goalText: {
    color: '#3B404A',
    fontSize: ms(28),
    // lineHeight: ms(30),
    fontFamily: 'Poppins-Light',
    // marginBottom: ms(5),
  },
  remainingText: {
    color: colors.manatee,
    fontSize: ms(12),
    lineHeight: ms(18),
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
