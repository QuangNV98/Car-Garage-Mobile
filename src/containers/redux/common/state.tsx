export default interface IActionState {
  isLoading: boolean;
  errorMess: string;
  isUpdated: boolean;
  componentId: string;
  timer: boolean;
  diffMinute: number;
  diffSecond: number;
  isCheckIn: boolean;
  status: {
    status_id: number;
    status_name: string;
    loading: boolean;
  };
}
