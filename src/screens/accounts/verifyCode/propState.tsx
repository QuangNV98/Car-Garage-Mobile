interface IState {
  code: string;
  errorMessage: string;
}

interface IDispatchToProps {
  verifyCodeAction?: (email: string, code: string) => void;
  resendCodeAction?: (email: string) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  email: string;
  errorMess: string;
  isLoading: boolean;
}

export {IState, IProps};
