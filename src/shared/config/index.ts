const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || "";
};

export const NODE_ENV = getEnvVar("VITE_NODE_ENV");
export const LOCAL_API_URL = getEnvVar("VITE_LOCAL_API_URL");
export const NETLIFY_API_URL = getEnvVar("VITE_NETLIFY_API_URL");

export const isDevEnv = NODE_ENV === "development";
export const isProdEnv = NODE_ENV === "production";

export const API_URL = isDevEnv ? LOCAL_API_URL : `${NETLIFY_API_URL}/api`;
export const YANDEX_WEATHER_KEY = getEnvVar("VITE_YANDEX_WEATHER_KEY");
