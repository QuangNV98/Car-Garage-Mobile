interface IState {
  repeate_password: string;
  new_password: string;
}

interface IDispatchToProps {
  createNewPasswordAction?: (email: string, new_password: string) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  accountInfo: {
    id: number;
  };
  email: string;
  isLoading: boolean;
}

export {IState, IProps};
