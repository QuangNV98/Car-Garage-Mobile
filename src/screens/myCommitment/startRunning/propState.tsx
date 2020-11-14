interface IStateToProps {
  isStartTimer?: boolean;
  diffSecond?: number;
  diffMinute?: number;
  listProgressDetail: any;
  listDetailCheckIn: any;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
  dataCollectAction?: (goal_id: number, dataRunning: any, id: number) => void;
  toggleUpdateTimerAction?: (isStartTime: boolean) => void;
  getListProgressDetailAction?: (goal_id: number, created_at: Date, finish_at: Date) => void;
  getDetailCheckInAction?: (commitment_id: number) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
  item: any;
}

interface IState {
  countDownTimeMinute: number;
  countDownTimeSecond: number;
  isRunning: boolean;
  startTime: Date;
  item: any;
  isStartTimer: boolean;
  isModalProgress: boolean;
}

export {IProps, IState};
