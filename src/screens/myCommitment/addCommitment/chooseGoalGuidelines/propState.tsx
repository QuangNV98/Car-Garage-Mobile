interface IState {
  isModal: boolean;
}

interface IDispatchToProps {
  chooseGoalAction?: (
    goal: number,
    target: number,
    target_time: number,
    target_time_unit: string,
    lat: number,
    long: number,
  ) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  chooseGoal: number;
  isModal: boolean;
}

export {IState, IProps};
