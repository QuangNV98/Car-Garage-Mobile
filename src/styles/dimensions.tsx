import {Dimensions, Platform} from 'react-native';
import {moderateScale, ms} from './scalingUtils';

const {width} = Dimensions.get('window');

export const indent = moderateScale(16);
export const halfIndent = moderateScale(indent / 2);
export const doubleIndent = moderateScale(indent * 2);

export const verticalIndent = ms(indent);
export const halfVerticalIndent = ms(indent / 2);

export const borderRadius = 4;

export const iconSize = moderateScale(28);
export const bigIconSize = moderateScale(40);
export const iconMargin = Platform.OS === 'android' ? 16 : 10;

export const length = width / 3 - (indent + moderateScale(halfIndent / 1.5));

export const headerMaxHeight = Platform.OS === 'ios' ? ms(297) : ms(296);
export const headerMinHeight = Platform.OS === 'ios' ? ms(110) : ms(107);

export const containerWidth = Dimensions.get('window').width - indent * 2;

export const appBarHeight = Platform.OS === 'ios' ? 44 : 56;
export const statusBarHeight = Platform.OS === 'ios' ? 36 : 0;
export const headerHeight = appBarHeight + statusBarHeight;
