import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewTitle: {
    backgroundColor: colors.bgColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ms(26),
    // paddingBottom: ms(22),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(30),
    color: colors.darkMain,
  },
  titleImage: {
    width: ms(103),
    height: ms(15),
    bottom: ms(6),
    left: '18%',
    position: 'absolute',
  },
  item: {
    marginHorizontal: 0,
    marginBottom: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: ms(2),
      height: ms(4),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: ms(84),
  },
  itemLeft: {
    paddingLeft: ms(28),
    flexDirection: 'column',
  },
  itemTitle: {
    fontFamily: 'Poppins-Bold',
    lineHeight: ms(23),
    fontSize: ms(15),
    color: colors.darkMain,
  },
  itemText: {
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.manatee,
  },
  imgRight: {
    width: ms(84),
    height: ms(84),
    borderRadius: 16,
  },
  headerLeftTouch: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
