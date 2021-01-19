interface IProps extends IDispatchToProps {
  componentId: string;
  avatar_img: string;
  region: any;
}

interface IDispatchToProps {
  logOutAction?: () => void;
}
interface IState {
  region: any
}

export {IProps, IState};
