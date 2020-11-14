interface IState {
  email: string;
}

interface IDispatchToProps {
  forgotPasswordAction?: (email: string) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  isLoading: boolean;
}

export {IState, IProps};
