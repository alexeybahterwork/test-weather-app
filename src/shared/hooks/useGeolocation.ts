import { useEffect, useState } from "react";

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export const useGeolocation = () => {
  const [location, setGeolocation] = useState<Geolocation>();
  const [locationError, setGeolocationError] = useState<GeolocationPositionError>();

  let mounted = true;
  let watchId: number;

  const onEvent = (event: GeolocationPosition) => {
    if (mounted) {
      setGeolocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude
      });
    }
  };
  const onError = (error: GeolocationPositionError) => {
    setGeolocationError(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onError);
    watchId = navigator.geolocation.watchPosition(onEvent, onError);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};
