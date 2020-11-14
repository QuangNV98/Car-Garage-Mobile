import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  account?: IActionState;
  addCommitment?: {
    goal: number;
  };
  isLoading: boolean;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
}
interface IDispatchToProps {
  paymentAction?: (card_id: string, four_digit_card: string) => void;
  addCommitmentAction: (componentId: string) => void;
}
interface IState {
  isCheck: boolean;
  four_digit_card: string;
  card_id: string;
}

export {IProps, IState};
