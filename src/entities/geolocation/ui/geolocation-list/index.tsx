import { Card, List, Typography } from "antd";
import styles from "./styles.module.scss";
import { forecastModel } from "entities/forecast";
import { GeolocationRow } from "entities/geolocation";
import { ForecastBasic } from "../../../../shared/api";

const { Title } = Typography;

export const GeolocationList = () => {
  const forecasts = forecastModel.getForecasts();
  const forecastStatus = forecastModel.getForecastStatus();

  if (!forecasts.length && !forecasts.length) return <></>;
  return (
    <>
      <div className={styles.forecast}>
        <Card loading={forecastStatus === "loading"}>
          <List
            header={<Title level={4} style={{ margin: 0, padding: 0 }}>Список мест</Title>}
            itemLayout="horizontal"
            dataSource={forecasts}
            renderItem={(forecast: ForecastBasic) => (
              <GeolocationRow forecast={forecast} />
            )}
          />
        </Card>
      </div>
    </>
  );
};
