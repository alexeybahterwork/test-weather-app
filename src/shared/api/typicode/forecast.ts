import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type { Forecast } from "./models";

const locale = "ru_RU";
const BASE_URL = "/v2/forecast";

// export type GetTasksListParams = {
//   userId?: number;
//   completed?: boolean;
// };

export type GetForecastListParams = {
  latitude: number;
  longitude: number;
  // lang?: string;
};

// export const getTasksList = (
//   params?: GetTasksListParams
// ): AxiosPromise<Forecast> => {
//   return apiInstance.get(BASE_URL, { params });
// };

export const getForecastList = (
  params: GetForecastListParams
): AxiosPromise<Forecast> => {
  return apiInstance.get(BASE_URL, {  params: {lat: params.latitude, lon: params.longitude, lang: locale} });
};
export type GetTaskByIdParams = {
  taskId: number;
};

export const getTaskById = ({
  taskId,
  ...params
}: GetTaskByIdParams): AxiosPromise<Forecast> => {
  return apiInstance.get(`${BASE_URL}/${taskId}`, { params });
};
