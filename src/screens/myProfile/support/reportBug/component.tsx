import {ms, vs} from '@src/styles/scalingUtils';
import React, {useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import {Header, Icon as IconM} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {IProps} from './propState';
import styles from './styles';
import {IState} from './propState';
import {colors, common} from '@src/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '@src/containers/components/button';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker, {Image as IMG} from 'react-native-image-crop-picker';
import moment from 'moment';
import {reportABug} from '../services';
import {useDispatch, useSelector} from 'react-redux';
import {offLoadingAction, onLoadingAction} from '@src/containers/redux/common/actions';
import {RootState} from '@src/boot/rootReducers';
import {validation} from '@src/utils';

export default function SupportReportComponent(props: IProps) {
  const _goBack = () => Navigation.pop(props.componentId);
  const scrollViewRef = useRef();
  let report: TextInput = null;
  let ActionSheetSelectPhoto: ActionSheet = null;

  const dispatch = useDispatch();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isLoading: state.common.isLoading,
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));

  const [state, setState] = useState<IState>({
    report: '',
    img: null,
  });

  const _onChangeText = (value: string, controlFocus?: TextInput) => (evt: any) => {
    if (evt && controlFocus) {
      controlFocus.focus();
    }
    setState((state: IState) => ({...state, [value]: evt}));
  };

  const validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateName(state.report)) {
      isValid = 'Please enter a valid question';
      controlFocus = report;
    }

    if (!state.img) {
      isValid = 'Please attach the image of the bug';
      controlFocus = null;
    }

    return {isValid, controlFocus};
  };

  const _submitBug = async () => {
    const {isValid, controlFocus} = validate();
    if (!isValid) {
      const formData = new FormData();
      formData.append('img', state.img as any);
      formData.append('report', state.report);
      props.onLoadingAction();
      await reportABug(formData)
        .then((response) => {
          if (response && response.data) {
            Alert.alert('Success', 'We’ve received your message and will get back to you shortly');
          } else {
            Alert.alert('Error', 'Server is busy');
          }
        })
        .catch(() => {
          return;
        });
      props.offLoadingAction();
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  const _uploadBugs = (index) => {
    switch (index) {
      case 0:
        ImagePicker.openCamera({
          compressImageQuality: 0.1,
        }).then(async (image) => {
          // const formData = new FormData();
          const img = {
            uri: (image as IMG).path,
            type: (image as IMG).mime || 'image/jpeg',
            name: (image as IMG).filename || moment(new Date()).format('hmmssMMDDYY') + '.jpg',
          };

          setState((state: IState) => ({...state, img}));

          // formData.append('img', img as any);
          // formData.append('report', state.report);
          // // props.onLoadingAction();
          // await reportABug(formData)
          //   .then((response) => {
          //     if (response && response.data) {
          //       return;
          //     } else {
          //       Alert.alert('Error', 'Server is busy');
          //     }
          //   })
          //   .catch(() => {
          //     return;
          //   });
          // props.offLoadingAction();
        });
        break;
      case 1:
        ImagePicker.openPicker({
          multiple: false,
          mediaType: 'photo',
          compressImageQuality: 0.1,
        })
          .then(async (image) => {
            // const formData = new FormData();
            const img = {
              uri: (image as IMG).path,
              type: (image as IMG).mime || 'image/jpeg',
              name: (image as IMG).filename || moment(new Date()).format('hmmssMMDDYY') + '.jpg',
            };

            setState((state: IState) => ({...state, img}));

            // formData.append('img', img as any);
            // formData.append('report', state.report);
            // props.onLoadingAction();
            // await reportABug(formData)
            //   .then((response) => {
            //     if (response && response.data) {
            //       return;
            //     } else {
            //       Alert.alert('Error', 'Server is busy');
            //     }
            //   })
            //   .catch(() => {
            //     return;
            //   });
            // props.offLoadingAction();
          })
          .catch(() => {
            return;
          });
        break;
      default:
        break;
    }
  };

  const onPressAddPhotoBtn = () => {
    ActionSheetSelectPhoto.show();
  };

  const removeImg = () => {
    setState((state: IState) => ({...state, img: null}));
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={_goBack} style={styles.headerLeftTouch}>
            <Icon name="chevron-left" size={ms(20)} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Report a bug',
          style: styles.headerCenter,
        }}
        containerStyle={styles.headerContainer}
      />
      <ScrollView style={styles.container} ref={scrollViewRef}>
        <View style={styles.viewContainer}>
          <Text style={styles.headerText}>Found a mistake? Have any suggestions?</Text>
          <Text style={styles.headerText}>Feel free to reach out below</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerStyleInputArea}>
              <TextInput
                ref={(input) => (report = input)}
                value={state.report}
                autoCapitalize="none"
                placeholder="Describe the problem"
                onChangeText={_onChangeText('report')}
                multiline={true}
                numberOfLines={10}
                style={styles.textInputArea}
                maxLength={500}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.boxAttach}>
            <Text style={styles.attachTitle}>Attached files</Text>
            <View style={common.flexRow}>
              {!state.img ? (
                <TouchableOpacity style={common.mr5} onPress={onPressAddPhotoBtn}>
                  <Image source={require('@src/assets/images/btn-add-file.png')} />
                </TouchableOpacity>
              ) : (
                <View style={styles.boxImgAttach}>
                  <Image source={{uri: state.img.uri}} style={styles.imgAttach} />
                  <IconM
                    type="ionicon"
                    name="ios-close-circle"
                    color="#C0C5CF"
                    containerStyle={styles.iconClose}
                    onPress={removeImg}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center', flex: 1}}>
        <ButtonComponent
          btnFull={true}
          text="Submit"
          styleContainer={styles.submitBtn}
          onPress={_submitBug}
          disabled={props.isLoading}
        />
      </View>
      <ActionSheet
        ref={(o) => (ActionSheetSelectPhoto = o)}
        title={'Select photo'}
        options={['Take Photo...', 'Choose from Library...', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={_uploadBugs}
        on={true}
      />
    </>
  );
}
