interface IState {
  email: string;
  password: string;
  disabledPass: boolean;
}

interface IDispatchToProps {
  logInAction?: (username: string, password: string) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  isLoading: boolean;
}

export {IState, IProps};
