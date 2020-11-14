interface IState {
  countDownTimeHour: string;
  countDownTimeMinute: string;
  countDownTimeSecond: string;
  isModal: boolean;
  isModalProgress: boolean;
}

interface IStateToProps {
  addCommitmentReducer: {
    target_time: string;
    target: string;
    target_time_unit: string;
    goal: number;
    commitment_type: string;
    unit: string;
    start_date: Date;
  };
  listProgressDetail: any;
  listDetailCheckIn: any;
}

interface IDispatchToProps {
  clearAddCommitmentAction?: () => void;
  getListProgressDetailAction?: (goal_id: number, created_at: Date, finish_at: Date) => void;
  getDetailCheckInAction?: (commitment_id: number) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
  item: {
    id: number;
    goal_id: number;
    commitment_details_process: number;
    commitment_details_target: number;
    commitment_process: number;
    commitment_target: number;
    commitment_target_time: number;
    commitment_type: string;
    count_active: number;
    count_finish: number;
    commitment_target_time_unit: string;
    created_at: Date;
    finish_at: Date;
    unit: string;
    status: string;
  };
  goal_id: number;
}

export {IState, IProps};
