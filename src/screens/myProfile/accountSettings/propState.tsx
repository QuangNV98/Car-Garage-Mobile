import {Image, CropRect} from 'react-native-image-crop-picker';

interface IProps extends IDispatchToProps, IStateToProps {
  componentId: string;
}

interface IDispatchToProps {
  changePasswordAction?: (current_password: string, new_password: string) => void;
  changeEmailAction?: (new_email: string) => void;
  changeFirstNameAction?: (new_first_name: string) => void;
  changeLastNameAction?: (new_last_name: string) => void;
  deleteAccountAction?: () => void;
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}

interface IStateToProps {
  email: string;
  first_name: string;
  last_name: string;
  avatar_img: string;
}

interface IState {
  showModalEmail: boolean;
  showModalFirstName: boolean;
  showModalLastName: boolean;
  showModalChangePass: boolean;
  showModalDeleteAccount: boolean;
  current_password: string;
  new_password: string;
  repeat_password: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: Image;
  avatar_img: string;
}

export {IProps, IState};
