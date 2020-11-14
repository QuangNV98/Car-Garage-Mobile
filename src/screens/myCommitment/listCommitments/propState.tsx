interface IStateToProps {
  fullname?: string;
  loadList?: boolean;
  countActive?: number;
  countFinish?: number;
  pageNumber?: number;
  listData?: IListData[];
  isUpdated?: boolean;
  status_name?: string;
  status?: {
    loading: boolean;
  };
}

interface IListData {
  id: number;
  goal_id: number;
  commitment_process: number;
  commitment_details_process: number;
  commitment_type: string;
  commitment_target: string;
}

interface IDispatchToProps {
  getListCommitmentAction?: (pageNumber: number, status: string) => void;
  setLoadCommitmentAction?: (loadList: boolean, pageNumber: number) => void;
  setListCommitmentAction?: (
    countActive: number,
    countFinish: number,
    listData: IListData[],
    pageNumber: number,
    loadList: boolean,
  ) => void;
  offUpdateDataAction?: () => void;
  onUpdateDataAction?: () => void;
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}
interface IState {
  refreshing: boolean;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId?: string;
}

export {IProps, IListData, IState};
