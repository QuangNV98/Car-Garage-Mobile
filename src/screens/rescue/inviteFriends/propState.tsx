interface IProps extends IDispatchToProps {
  componentId: string;
  email_account: string;
  isLoading: boolean;
}
interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}

interface IState {
  email: string;
  name: string;
}

export {IProps, IState};
