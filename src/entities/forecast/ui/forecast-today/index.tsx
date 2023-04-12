import { Card, Skeleton, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import { RiCelsiusFill } from "react-icons/ri";
import { TbDropletFilled, TbTemperature, TbWind } from "react-icons/tb";
import { WeatherIconByName } from "../../../../shared/ui/weather-icon-by-condition-type";
import { conditionNames } from "shared/const";
import { forecastModel } from "entities/forecast";

const { Text, Title } = Typography;

export const ForecastToday = () => {
  const forecast = forecastModel.getCurrentForecast();
  const forecastStatus = forecastModel.getForecastStatus();

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.root} loading={forecastStatus === "loading"}>
          <div className={styles.location_info}>
            <Space align="center" size={145}>
              <Text>{forecast.lat}, {forecast.lon}</Text>
            </Space>
            <Title style={{ margin: 0 }} level={4}>{forecast.localityName}, {forecast.countryName}</Title>
            <Text type="secondary">Сейчас {forecast.now_dt}</Text>
          </div>

          <div className={styles.weather_info}>
            <div className={styles.weather_info_main}>
              <Title style={{ margin: 0 }} level={1}>{forecast?.currentDayForecast?.temp}</Title>
              <RiCelsiusFill size={34} />
              <WeatherIconByName icon={forecast?.currentDayForecast?.icon}
                                 className={styles.weather_info_main_icon_condition} />
              <div className={styles.weather_info_condition}>
                <Text
                  className={styles.weather_info_condition_title}>{conditionNames[forecast?.currentDayForecast?.condition || "clear"]}</Text>
                <Text>
                  Ощущается как {forecast?.currentDayForecast?.feels_like}
                  <RiCelsiusFill size={14} />
                </Text>
              </div>
            </div>

            <div className={styles.weather_info_secondary}>
              <div><TbWind size={22} /><Text>{forecast?.currentDayForecast?.wind_speed} м/с</Text></div>
              <div><TbDropletFilled size={22} /><Text>{forecast?.currentDayForecast?.humidity}%</Text></div>
              <div><TbTemperature size={22} /><Text>{forecast?.currentDayForecast?.pressure_mm} мм.рт.ст.</Text></div>
            </div>
          </div>

          <Skeleton className={styles.root} loading={forecastStatus === "loading"} active>
          </Skeleton>
        </Card>
      </div>
    </>
  );
};
