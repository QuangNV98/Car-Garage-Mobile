import IActionState from '@src/screens/myCommitment/addCommitment/redux/state';

interface IState {
  card_number: string;
  card_cvc: string;
  card_valid_from: string;
  zip_code: string;
  isPaymentSuccess: boolean;
  // isChecked: boolean;
}

interface IStateToProps {
  addCommitment: IActionState;
  account: {
    first_name: string;
    last_name: string;
    id: number;
  };
  isLoading: boolean;
}

interface IDispatchToProps {
  addCommitmentAction?: (componentId: string) => void;
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
  addCardAction?: (id: number, number: number) => void;
  paymentAction?: (id: number, number: number) => void;
}

interface IProps extends IDispatchToProps, IStateToProps {
  componentId: string;
}

export {IState, IProps};
