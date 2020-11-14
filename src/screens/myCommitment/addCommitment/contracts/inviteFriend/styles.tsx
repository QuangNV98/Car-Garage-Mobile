import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerImage: {
    width: ms(150),
    height: ms(150),
    alignSelf: 'center',
  },
  text: {
    fontSize: ms(14),
    textAlign: 'center',
    color: colors.eastBay,
  },
  itemFriend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapAvatar: {
    width: ms(30),
    height: ms(30),
    borderRadius: 15,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  checkboxLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    color: colors.eastBay,
    flex: 1,
  },
  checkBoxFriend: {
    backgroundColor: 'transparent',
    flex: 1,
    borderColor: 'transparent',
    justifyContent: 'space-between',
    padding: 0,
  },
  titleImage: {
    width: ms(80),
    height: ms(15),
    position: 'absolute',
    bottom: ms(5),
    left: ms(22),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    lineHeight: ms(34),
    textAlign: 'center',
    color: colors.darkMain,
    zIndex: 1,
  },
});

export default styles;
