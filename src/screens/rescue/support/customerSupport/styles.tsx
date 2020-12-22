import {colors} from '@src/styles';
import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingLeft: ms(16),
    paddingRight: ms(16),
  },
  headerContainer: {
    backgroundColor: colors.bgColor,
  },
  headerLeftTouch: {
    flex: 1,
    justifyContent: 'center',
  },
  headerCenter: {
    fontFamily: 'Poppins-Bold',
    fontSize: ms(15),
    lineHeight: ms(23),
    color: colors.darkMain,
  },
  m_r_95: {
    marginRight: ms(95),
  },
  content: {
    marginTop: vs(6),
  },
  headerText: {
    fontSize: ms(13),
    fontFamily: 'Poppins-Regular',
    lineHeight: ms(19),
    color: colors.darkMain,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: ms(34),
  },
  containerStyleInput: {
    marginTop: ms(10),
  },
  containerStyleInputArea: {
    marginTop: ms(10),
    height: ms(230),
    borderColor: colors.darkNude,
    borderWidth: ms(1),
    borderRadius: ms(10),
    backgroundColor: colors.white,
    paddingHorizontal: ms(20),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  textInputArea: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(15),
    color: colors.darkMain,
    alignSelf: 'flex-start',
    paddingTop: ms(15),
    height: ms(230),
  },
  submitBtn: {
    marginBottom: ms(30),
    width: '100%',
  },
});

export default styles;
