interface IProps extends IDispatchToProps, IStateToProps {
  componentId: string;
}

interface IStateToProps {
  date_of_birth?: Date;
  weight?: number;
  height?: number;
  gender?: boolean;
  original_date_of_birth?: Date;
  original_weight?: number;
  original_height?: number;
  original_gender?: boolean;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
}
interface IState {
  showModalDateOfBirth: boolean;
  showModalWeight: boolean;
  showModalHeight: boolean;
  showModalGender: boolean;
  dateOfBirth: Date;
  weight: number;
  height: number;
  gender: boolean;
}

export {IProps, IState};
