import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(24),
    marginTop: ms(70),
    marginBottom: ms(13),
    textAlign: 'center',
    color: colors.darkMain,
  },
  secText: {
    width: ms(200),
    margin: ms(10),
    fontSize: ms(13),
    lineHeight: ms(20),
    textAlign: 'center',
    color: colors.black,
    alignSelf: 'center',
  },
  text: {
    marginRight: ms(10),
    fontSize: ms(13),
    color: colors.logan,
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    alignSelf: 'center',
    width: ms(130),
    height: ms(39.43),
  },
});

export default styles;
