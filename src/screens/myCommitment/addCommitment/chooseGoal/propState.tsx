interface IState {
  chooseGoal: number;
  target: number;
  target_time: number;
  target_time_unit: string;
  lat: number;
  lng: number;
  locationName: string;
  isShowSetupCommit: boolean;
  modalStatus: boolean;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
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
  clearAddCommitmentAction?: () => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
}

export {IState, IProps};
