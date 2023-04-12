import { configureStore } from "@reduxjs/toolkit";

import { forecastModel } from "entities/forecast";

export const store = configureStore({
  reducer: {
    forecasts: forecastModel.reducer,
  },
});
