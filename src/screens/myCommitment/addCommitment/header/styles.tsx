import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {ifIphoneX} from '@src/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bgColor,
    paddingTop: ifIphoneX(ms(50), ms(25)),
  },
  progressBar: {
    position: 'relative',
    backgroundColor: colors.gray,
    borderRadius: 10,
    height: ms(4),
    marginHorizontal: ms(15),
    marginTop: ms(10),
  },
  percent: {
    position: 'absolute',
    left: 0,
    height: ms(4),
    borderRadius: 39,
    opacity: 0.82,
    backgroundColor: colors.silverTree,
  },
  wrapTextStep: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: ms(-10),
    marginHorizontal: ms(5),
  },
  wrapTextStepNoButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: ms(13),
    marginTop: ms(10),
  },
  textStep: {
    color: colors.darkGray,
    fontSize: ms(14),
    lineHeight: ms(17),
    marginRight: ms(15),
  },
});

export default styles;
