import { Card, Typography } from "antd";
import styles from "./styles.module.scss";
import { forecastModel } from "entities/forecast";
import { ForecastItem } from "../forecast-item";

const { Title } = Typography;

export const ForecastList = () => {
  const forecast = forecastModel.getCurrentForecast();
  const forecastStatus = forecastModel.getForecastStatus();

  return (
    <>
      <div className={styles.root}>
        <Card className={styles.forecast} loading={forecastStatus === "loading"}>
          <Title style={{ margin: 0 }} level={4}>Прогноз на 7 дней</Title>
          <div className={styles.forecast_briefly_day}>
            {forecast?.forecasts?.map(forecast => (
              <ForecastItem key={forecast.id} item={forecast} />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
