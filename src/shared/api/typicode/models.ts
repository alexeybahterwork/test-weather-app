export type ForecastBasic = {
  id: string;
  lat: Info["lat"];
  lon: Info["lon"];
  countryName: Country["name"];
  localityName: Country["name"];
  provinceName: Country["name"];
  currentDayForecast: TodayForecast
  forecasts: ForecastDay[];
  now_dt: string;
  selected: boolean;
}

export interface ForecastDay {
  id: string;
  temp_max: string;
  temp_min: string;
  temp_avg: string;
  date: string;
  day_name: string;
  condition: Day["condition"];
  wind_speed: Day["wind_speed"];
  pressure_mm: Day["pressure_mm"];
  humidity: Day["humidity"];
  icon: string;
}

export interface TodayForecast {
  temp: string;
  feels_like: string;
  condition: Fact["condition"];
  wind_speed: Fact["wind_speed"];
  pressure_mm: Fact["pressure_mm"];
  humidity: Fact["humidity"];
  icon: Icon
};

export interface Forecast {
  now: number;
  now_dt: Date;
  info: Info;
  geo_object: GeoObject;
  yesterday: Yesterday;
  fact: Fact;
  forecasts: Forecast[];
}

export interface Fact {
  obs_time: number;
  uptime: number;
  temp: number;
  feels_like: number;
  icon: Icon;
  condition: Condition;
  cloudness: number;
  prec_type: number;
  prec_prob: number;
  prec_strength: number;
  is_thunder: boolean;
  wind_speed: number;
  wind_dir: WindDir;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  daytime: Daytime;
  polar: boolean;
  season: string;
  source: string;
  accum_prec: { [key: string]: number };
  soil_moisture: number;
  soil_temp: number;
  uv_index: number;
  wind_gust: number;
}

export type Condition = "clear" | "cloudy" | "overcast" | "partly-cloudy" |
  "drizzle" |
  "light-rain" |
  "rain" |
  "moderate-rain" |
  "heavy-rain" |
  "continuous-heavy-rain" |
  "showers" |
  "wet-snow" |
  "light-snow" |
  "snow" |
  "snow-showers" |
  "hail" |
  "thunderstorm" |
  "thunderstorm-with-rain" |
  "thunderstorm-with-hail"

export type Daytime = "d" | "n";

export type Icon = "skc_n" | "skc_d" | "bkn_d" | "bkn_n" | "ovc";

export type WindDir = "ne" | "e" | "se" | "s";

export interface Forecast {
  date: Date;
  date_ts: number;
  week: number;
  sunrise: string;
  sunset: string;
  rise_begin: string;
  set_end: string;
  moon_code: number;
  moon_text: string;
  parts: Parts;
  hours: Hour[];
  biomet?: Biomet;
}

export interface Biomet {
  index: number;
  condition: string;
}

export interface Hour {
  hour: string;
  hour_ts: number;
  temp: number;
  feels_like: number;
  icon: Icon;
  condition: Condition;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  is_thunder: boolean;
  wind_dir: WindDir;
  wind_speed: number;
  wind_gust: number;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  uv_index: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_period: number;
  prec_prob: number;
}

export interface Parts {
  night: Day;
  day: Day;
  day_short: Day;
  evening: Day;
  morning: Day;
  night_short: Day;
}

export interface Day {
  _source: string;
  temp_min?: number;
  temp_avg?: number;
  temp_max?: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: WindDir;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: Icon;
  condition: Condition;
  uv_index?: number;
  feels_like: number;
  daytime: Daytime;
  polar: boolean;
  fresh_snow_mm: number;
  temp?: number;
}

export interface GeoObject {
  district: Country | null;
  locality: Country | null;
  province: Country;
  country: Country;
}

export interface Country {
  id: number;
  name: string;
}

export interface Info {
  n: boolean;
  geoid: number;
  url: string;
  lat: number;
  lon: number;
  tzinfo: Tzinfo;
  def_pressure_mm: number;
  def_pressure_pa: number;
  slug: string;
  zoom: number;
  nr: boolean;
  ns: boolean;
  nsr: boolean;
  p: boolean;
  f: boolean;
  _h: boolean;
}

export interface Tzinfo {
  name: string;
  abbr: string;
  dst: boolean;
  offset: number;
}

export interface Yesterday {
  temp: number;
}

