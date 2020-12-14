import IActionState from '@src/containers/redux/account/state';

interface IStateToProps {
  // account?: IActionState;
  // listNotifications: any;
}

interface IDispatchToProps {
  // onLoadingAction?: () => void;
  // offLoadingAction?: () => void;
  // addCardAction?: (card_id: string, four_digit_card: string) => void;
  // getListNotificationsAction?: () => void;
  getListTransactionsFixingAction?: () => void,
  getListTransactionsCompletedAction?: () => void,
  getListTransactionsGuaranteeAction?: () => void,
}

interface IProps extends IStateToProps, IDispatchToProps {
  componentId: string;
  fixingTrans: any;
  completedTrans: any;
  guaranteeTrans: any;
}

interface IState {
  status: boolean;
  tabView: any;
}

export {IProps, IState};
