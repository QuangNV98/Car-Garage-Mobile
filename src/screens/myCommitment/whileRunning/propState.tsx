import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  account?: IActionState;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
  addCardAction?: (card_id: string, four_digit_card: string) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
}

interface IState {
  addCommitment: IActionState;
}

export {IProps, IState};
