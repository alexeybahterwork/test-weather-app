import { Routes, Route } from "react-router";
import { lazy } from "react";

const WeatherForecastPage = lazy(() => import("./weather-forecast"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherForecastPage />} />
    </Routes>
  );
};
