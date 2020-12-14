import {colors, fontSizes} from '@src/styles';
import {ms, s} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 15
  },
  title: {
    fontSize: 16, 
    fontWeight: '600'
  }
  
});

export default styles;
