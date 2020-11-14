interface IState {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  disabledPass: boolean;
  isChecked: boolean;
  viewTAC: boolean;
}

interface IDispatchToProps {
  signUpAction?: (first_name: string, last_name: string, email: string, password: string) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  isLoading: boolean;
}

export {IState, IProps};
