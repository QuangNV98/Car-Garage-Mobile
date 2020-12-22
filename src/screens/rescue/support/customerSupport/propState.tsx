interface IProps extends IDispatchToProps {
  componentId: string;
  isLoading: boolean;
}

interface IState {
  question: string;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}

export {IProps, IState};
