import { Layout, Spin, Typography } from "antd";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { forecastModel } from "entities/forecast";
import { useGeolocation } from "../../shared/hooks";
import { Forecast } from "../../features/forecast";
import { useEffect } from "react";
import { getWeatherForecastAsync } from "../../entities/forecast/model";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const { geolocation, geolocationError } = useGeolocation();

  const forecastStatus = forecastModel.getForecastStatus();

  useEffect(() => {
    if (geolocation && forecastStatus === "idle") {
      dispatch(getWeatherForecastAsync(geolocation));
    }
  }, [dispatch, forecastStatus, geolocation]);

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div className="logo" />
        <Title level={3} style={{ lineHeight: "2.7em" }}>
          Weather App
        </Title>
      </Header>

      <Content className={styles.content}>
        {geolocation && <Forecast />}

        {(!geolocation && !geolocationError) &&
          <Spin className={styles.content_loading} delay={300} size={"default"} />
        }

        {geolocationError && (
          <div className={styles.content_geolocation_error}>
            <Title level={4}>Приложение не может определить
              геопозицию. Разрешите доступ к данными геопозиции</Title>
          </div>
        )}

      </Content>
      <Footer className={styles.footer}>Weather App</Footer>
    </Layout>
  );
};

export default WeatherForecast;
