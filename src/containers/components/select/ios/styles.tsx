import {colors} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {flex: 1, backgroundColor: colors.greyOpacity},
  modalContent: {
    position: 'absolute',
    backgroundColor: colors.white,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonLeft: {
    margin: ms(10),
    fontSize: ms(20),
    color: colors.bunting,
  },
  modalButtonRight: {
    margin: ms(10),
    fontSize: ms(20),
    color: colors.mediumSlateBlue,
  },
  pickerItem: {
    fontSize: ms(20),
    color: colors.bunting,
  },
});

export default styles;
