// import Langs from '@Helpers/Langs';
// import {Picker} from '@react-native-community/picker';
// import {View} from 'native-base';
// import PropTypes from 'prop-types';
// import React, {PureComponent} from 'react';
// import Styles from '../../Style';

// class SelectAndroidComponent extends PureComponent {
//   state = {
//     selectedSubjectIndex: -1,
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const objChange = {};
//     if (nextProps.selectedSubjectIndex != prevState.selectedSubjectIndex) {
//       objChange.selectedSubjectIndex = nextProps.selectedSubjectIndex;
//     }
//     return Object.keys(objChange).length === 0 ? null : objChange;
//   }

//   render() {
//     return (
//       <View style={Styles.pickerContainer}>
//         <Picker
//           selectedValue={this.state.selectedSubjectIndex}
//           style={Styles.priceSelect}
//           onValueChange={this.props.onValueChange}>
//           <Picker.Item label={Langs.t('selectSubject')} value={-2} />
//           {this.props.subjects && this.props.subjects.length > 0
//             ? this.props.subjects.map((item, index) => <Picker.Item label={item.subject_name} value={index} />)
//             : null}
//         </Picker>
//       </View>
//     );
//   }
// }

// SelectAndroidComponent.propTypes = {
//   subjects: PropTypes.array,
//   onValueChange: PropTypes.func,
//   selectedSubjectIndex: PropTypes.any,
// };

// export default SelectAndroidComponent;
