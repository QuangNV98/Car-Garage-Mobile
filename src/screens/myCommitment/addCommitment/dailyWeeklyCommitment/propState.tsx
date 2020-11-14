interface IState {
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
  showModalDateOfBirth: boolean;
  startDate: Date;
  confirmDate: Date;
  unit: string;
}

interface IDispatchToProps {
  chooseGoalAction?: (
    goal: number,
    target: number,
    target_time: number,
    target_time_unit: string,
    lat: number,
    long: number,
    location_name: string,
    commitment_type: string,
    start_date: Date,
    unit: string,
  ) => void;
}

interface IProps extends IDispatchToProps {
  componentId: string;
  chooseGoal: number;
}

export {IState, IProps};
