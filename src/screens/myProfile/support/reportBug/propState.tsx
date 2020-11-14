interface IProps extends IDispatchToProps {
  componentId: string;
  currentSection: number;
  isLoading: boolean;
}

interface IState {
  report: string;
  img: any;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}

export {IProps, IState};
