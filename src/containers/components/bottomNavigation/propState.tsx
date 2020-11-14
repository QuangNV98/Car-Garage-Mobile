interface IProps {
  componentId: string;
  activeTab: string;
  showAddCommitments?: boolean;
  hasPaymentFailed?: boolean;
}
interface IState {
  showConfirmLogout: boolean;
}

export {IProps, IState};
