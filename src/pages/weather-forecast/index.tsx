import { Layout, Spin } from "antd";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { forecastModel } from "entities/forecast";
import { useGeolocation } from "../../shared/hooks";
import { Forecast } from "../../features/forecast";
import { useEffect } from "react";
import { getWeatherForecastAsync } from "../../entities/forecast/model";

const { Header, Footer, Content } = Layout;

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const geolocation = useGeolocation();

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
        Weather App
      </Header>

      <Content className={styles.content}>
        {geolocation && <Forecast />}
        {(!geolocation && forecastStatus === "loading") &&
          <Spin delay={300} className="overlay" size="large" />
        }
      </Content>
      <Footer className={styles.footer}>Weather App</Footer>
    </Layout>
  );
};

export default WeatherForecast;
