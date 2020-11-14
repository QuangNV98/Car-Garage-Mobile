import Geolocation, {GeolocationError, GeolocationResponse} from '@react-native-community/geolocation';

const getCurrentPosition = () => {
  try {
    return new Promise(
      (resolve: (position: GeolocationResponse) => void, reject: (error: GeolocationError) => void) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      },
    );
  } catch (error) {
    throw error;
  }
};

export default {getCurrentPosition};
