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
}

interface IState {
  status: string;
  status_id: number;
}

export {IProps, IState};
