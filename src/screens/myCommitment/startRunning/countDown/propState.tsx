interface IState {
  countDownTimeMinute: string;
  countDownTimeSecond: string;
}

interface IProps {
  startCountDown: boolean;
  countDownTimeMinute: number;
  countDownTimeSecond: number;
  item: any;
}

export {IState, IProps};
