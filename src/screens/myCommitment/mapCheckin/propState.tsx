interface IState {
  locationName: string;
  locationPlaces: any;
  locationCompared: any;
  isModalVisible: boolean;
  checkIn: boolean;
}
interface IDispatchToProps {
  checkInLocationAction?: (id: number) => void;
  isCheckInAction?: (isCheckIn: boolean) => void;
}
interface IProps extends IDispatchToProps {
  componentId: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  item: any;
  isCheckIn: boolean;
}

export {IState, IProps};
