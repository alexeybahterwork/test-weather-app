import { createAsyncThunk, createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ForecastBasic, typicodeApi } from "shared/api";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { addPositiveSymbolForTemp, shortenedDayNameByDate } from "shared/utils";

export type Params = {
  latitude: number;
  longitude: number;
};

type ForecastData = Partial<ForecastBasic>

export interface IStatus {
  name: "idle" | "loading" | "error" | "succeeded";
}

export const getWeatherForecastAsync = createAsyncThunk(
  "forecast/getWeatherForecast",
  async (params: Params) => {
    const response = await typicodeApi.forecast.getForecastList(params);
    return response.data;
  }
);

export const initialState: {
  data: ForecastBasic[];
  defaultForecast: ForecastData | null;
  currentForecast: ForecastData;
  status: IStatus;
} = {
  data: [],
  currentForecast: {},
  defaultForecast: null,
  status: {
    name: "idle"
  }
};

export const forecastModel = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    updateForecastNameById: (state, { payload: { id, name } }: PayloadAction<{ id: string, name: string }>) => {
      const forecast = state.data.find(forecast => forecast.id === id);

      if (!forecast) {
        return;
      }

      forecast.localityName = name;

      if (state.currentForecast.id === id) {
        state.currentForecast = forecast;
      }
    },
    deleteForecastById: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter(forecast => forecast.id !== payload);

      if (state.defaultForecast && state.currentForecast.id === payload) {
        state.currentForecast = state.defaultForecast;
      }
    },
    setCurrentForecast: (state, { payload }: PayloadAction<ForecastBasic>) => {
      state.currentForecast = { ...payload, selected: true };

      state.data = state.data.map(forecast => {
        if (payload.id === forecast.id) {
          return { ...forecast, selected: true };
        }

        return { ...forecast, selected: false };
      });
    },
    setDefaultForecast: (state, { payload }: PayloadAction<ForecastBasic>) => {
      state.defaultForecast = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherForecastAsync.rejected, (state) => {
        state.status.name = "error";
      })
      .addCase(getWeatherForecastAsync.pending, (state) => {
        state.status.name = "loading";
      })
      .addCase(getWeatherForecastAsync.fulfilled, (state, { payload }) => {
        const {
          info: { lat, lon },
          geo_object: {
            country,
            locality,
            province
          },
          fact: {
            temp,
            feels_like,
            condition,
            wind_speed,
            pressure_mm,
            humidity,
            icon
          },
          now_dt,
          forecasts
        } = payload;

        const preparedForecastDays = forecasts.map(({
                                                      date,
                                                      parts: {
                                                        day: {
                                                          temp_min,
                                                          temp_max,
                                                          temp_avg,
                                                          condition,
                                                          wind_speed,
                                                          pressure_mm,
                                                          humidity,
                                                          icon
                                                        }
                                                      }
                                                    }) => ({
          id: nanoid(),
          date: format(new Date(date), "dd MMMM", { locale: ru }),
          day_name: shortenedDayNameByDate(date),
          temp_min: addPositiveSymbolForTemp(temp_min),
          temp_max: addPositiveSymbolForTemp(temp_max),
          temp_avg: addPositiveSymbolForTemp(temp_avg),
          condition,
          wind_speed,
          pressure_mm,
          humidity,
          icon
        }));

        const forecast: ForecastBasic = {
          id: nanoid(),
          lat,
          lon,
          countryName: country?.name || "Неизвестно",
          localityName: locality?.name || "Неизвестно",
          provinceName: province?.name,
          now_dt: format(new Date(now_dt), "dd MMMM", { locale: ru }),
          selected: true,
          currentDayForecast: {
            temp: addPositiveSymbolForTemp(temp),
            feels_like: addPositiveSymbolForTemp(feels_like),
            condition,
            wind_speed,
            pressure_mm,
            humidity,
            icon
          },
          forecasts: preparedForecastDays
        };

        if (!state.defaultForecast) {
          state.defaultForecast = forecast;
        } else {
          state.data = [...state.data.map(forecast => ({ ...forecast, selected: false })), forecast];
        }
        state.currentForecast = forecast;
        state.status.name = "succeeded";
      });
  }
});

export const {
  deleteForecastById,
  updateForecastNameById,
  setCurrentForecast
} = forecastModel.actions;

export const getForecasts = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.forecasts.data,
      (
        forecasts: RootState["forecasts"]["data"]
      ) => forecasts
    )
  );

export const getForecastStatus = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.forecasts.status,
      (
        status: RootState["forecasts"]["status"]
      ) => status.name
    )
  );

export const getCurrentForecast = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.forecasts.currentForecast,
      (
        currentForecast: RootState["forecasts"]["currentForecast"]
      ) => {
        return currentForecast;
      }
    )
  );

export const reducer = forecastModel.reducer;
