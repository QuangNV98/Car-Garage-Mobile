import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  account?: IActionState;
  listNotifications: any;
}

interface IDispatchToProps {
  onLoadingAction?: () => void;
  offLoadingAction?: () => void;
  addCardAction?: (card_id: string, four_digit_card: string) => void;
  getListNotificationsAction?: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
}

interface IState {
  modalStatus: boolean;
  item: any;
}

export {IProps, IState};
