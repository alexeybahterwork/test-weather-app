import { ForecastList, ForecastToday } from "entities/forecast";
import { GeolocationForm, GeolocationList } from "../../entities/geolocation";

export const Forecast = () => {
  return (
    <>
      <ForecastToday />
      <ForecastList />
      <GeolocationForm />
      <GeolocationList />
    </>
  );
};
