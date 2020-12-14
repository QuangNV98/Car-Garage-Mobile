interface IProps extends IDispatchToProps {
  componentId: string;
  avatar_img: string;
}

interface IDispatchToProps {
  logOutAction?: () => void;
}
interface IState {
  avatar_img: string;
  showConfirmLogout: boolean;
  region: any
}

export {IProps, IState};
