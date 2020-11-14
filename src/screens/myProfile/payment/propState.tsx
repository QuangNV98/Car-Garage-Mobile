import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  account?: IActionState;
}

interface IDispatchToProps {
  removeCardAction?: (card_id: string) => void;
}

interface IState {
  isEdit: boolean;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
}

export {IProps, IState};
