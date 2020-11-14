interface IState {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  locationName: string;
  locationPlaces: any;
  locationCompared: any;
  isModalVisible: boolean;
}
interface IDispatchToProps {
  offLoadingAction?: () => void;
  onLoadingAction?: () => void;
}
interface IProps extends IDispatchToProps {
  componentId: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  target: number;
  target_time: number;
  locationName: string;

}

export {IState, IProps};
