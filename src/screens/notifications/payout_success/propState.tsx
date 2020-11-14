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
  commitmentId: number;
  name: string;
  item: any;
}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  modalStatus: boolean;
  modalBillStatus: boolean;
  data: {
    data: {
      amount_received: number;
      amount_stake: number;
    };
  };
}

export {IProps, IState};
