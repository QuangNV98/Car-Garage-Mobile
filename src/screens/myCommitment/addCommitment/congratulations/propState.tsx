interface IState {
  miles: string;
  week: string;
}

interface IProps {
  componentId: string;
  addCommitmentReducer: {
    goal: number;
    target_time: string;
    target: string;
    target_time_unit: string;
    location_name: string;
    unit: string;
  };
  commitment_type: string;
}

export {IState, IProps};
