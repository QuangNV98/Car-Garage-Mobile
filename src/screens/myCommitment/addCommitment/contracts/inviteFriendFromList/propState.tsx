interface IState {
  email: string;
  checkFriend: boolean;
  status: string;
  name: string;
}

interface IStateToProps {
  listFriend: any;
  account_email: string;
}

interface IDispatchToProps {
  inviteFriendAction?: () => void;
  offLoadingAction?: () => void;
  onLoadingAction?: () => void;
}
interface IProps extends IStateToProps, IDispatchToProps {
  modalStatus: boolean;
  hideModal: () => void;
  selectEmail: (email_friend: string, name_friend: string, email_status?: string) => void;
}

export {IState, IProps};
