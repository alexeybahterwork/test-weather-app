import axios from "axios";
import { API_URL, YANDEX_WEATHER_KEY } from "../../config";

export const apiInstance = axios.create({
  baseURL: API_URL as string,
  headers: {"X-Yandex-API-Key": YANDEX_WEATHER_KEY}
});
