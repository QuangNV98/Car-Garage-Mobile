import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  account?: IActionState;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
  updateCardAction?: (card_id: string, four_digit_card: string) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
}

interface IState {
  card_number: string;
  card_cvc: string;
  card_valid_from: string;
  zip_code: string;
  loading: boolean;
  // isChecked: boolean;
}

export {IProps, IState};
