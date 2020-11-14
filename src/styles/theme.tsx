import { ms } from '@src/styles/scalingUtils';
import { ifIphoneX } from '@src/utils';
import { Platform } from 'react-native';
import colors from './colors';

export default {
  Header: {
    statusBarProps: {
      backgroundColor: colors.bgColor,
    },
    containerStyle: {
      backgroundColor: colors.bgColor,
      height: Platform.OS === 'android' ? ms(45) : ifIphoneX(ms(80), ms(65)),
      paddingTop: Platform.OS === 'android' ? 0 : ifIphoneX(ms(30), ms(15)),
      paddingHorizontal: ms(20),
    },
  },
};
