import { PropsWithChildren } from "react";
import { Typography } from "antd";

import styles from "./styles.module.scss";
import { WeatherIconByName } from "../../../../shared/ui/weather-icon-by-condition-type";
import { conditionNames } from "shared/const";
import { RiCelsiusFill } from "react-icons/ri";
import { ForecastDay } from "../../../../shared/api";
import { TbDropletFilled, TbTemperature, TbWind } from "react-icons/tb";

export type ForecastItemProps = PropsWithChildren<{
  item: ForecastDay;
}>

const { Text } = Typography;

export const ForecastItem = ({ item }: ForecastItemProps) => {
  const {
    id,
    date,
    temp_avg,
    temp_max,
    temp_min,
    day_name,
    condition,
    pressure_mm,
    humidity,
    wind_speed,
    icon
  } = item;

  return (
    <div key={id} className={styles.forecast_briefly_day_item}>
      <Text className={styles.forecast_briefly_day_item_name}>{day_name}</Text>
      <Text className={styles.forecast_briefly_day_item_time}>{date}</Text>
      <WeatherIconByName icon={icon} className={styles.forecast_briefly_day_item_icon} />
      <div className={styles.forecast_briefly_day_item_condition}>{conditionNames[condition]}</div>
      <div className={styles.forecast_briefly_day_item_temp}>
        <Text>Avg: {temp_avg}</Text>
        <RiCelsiusFill size={14} />
      </div>
      <div className={styles.forecast_briefly_day_item_temp}>
        <Text>Min: {temp_min}</Text>
        <RiCelsiusFill size={14} />
      </div>
      <div className={styles.forecast_briefly_day_item_temp}>
        <Text>Max: {temp_max}</Text>
        <RiCelsiusFill size={14} />
      </div>
        <div className={styles.forecast_briefly_day_item_indicator}><TbWind size={22} /><Text>{wind_speed} м/с</Text></div>
        <div className={styles.forecast_briefly_day_item_indicator}><TbDropletFilled size={22} /><Text>{humidity}%</Text></div>
        <div className={styles.forecast_briefly_day_item_indicator}><TbTemperature size={22} /><Text>{pressure_mm} мм.рт.ст.</Text></div>

    </div>
  );
};
