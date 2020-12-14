interface IStateToProps {
  fullname: string;
  countActive: number;
  countFinish: number;
  status_id: number;
  status_name: string;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
  avatar_img: string;
}

interface IDispatchToProps {
  getListCommitmentAction?: (pageNumber: number, status: string) => void;
  saveCommitmentStatusAction?: (status: any) => void;
  logOutAction?: () => void;
}

interface IState {
  showConfirmLogout: boolean;
  user: any
}

export {IProps, IState};
