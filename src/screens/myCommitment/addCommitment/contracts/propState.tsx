import IActionState from '@src/screens/myCommitment/addCommitment/redux/state';

interface IState {
  modalInviteStatus: boolean;
  modalListStatus: boolean;
  amount_fine: string;
  stake_to: string;
  email_friend: string;
  email_status: string;
  name_friend: string;
  timezone: string;
}

interface IDispatchToProps {
  inviteFriendAction?: () => void;
  stakeAppAction?: (
    amount_fine: number,
    stake_to: string,
    email_friend: string,
    name_friend: string,
    timezone: string,
  ) => void;
  addCommitmentAction?: (componentId: string) => void;
}

interface IStateToProps {
  addCommitment: IActionState;
  account_credit_card: object[];
  account_has_friend: boolean;
  isLoading: boolean;
}
interface IProps extends IDispatchToProps, IStateToProps {
  componentId: string;
}

export {IState, IProps};
