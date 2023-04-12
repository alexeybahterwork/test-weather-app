const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || "";
};

export const API_URL = getEnvVar("VITE_YANDEX_FORECAST_API_URL");
export const YANDEX_WEATHER_KEY = getEnvVar("VITE_YANDEX_WEATHER_KEY");

export const NODE_ENV = getEnvVar("VITE_NODE_ENV");

export const isDevEnv = NODE_ENV === "development";
export const isProdEnv = NODE_ENV === "production";
