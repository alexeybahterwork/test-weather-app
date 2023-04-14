import { Button, Card, Form, InputNumber, Typography } from "antd";
import styles from "./styles.module.scss";
import { forecastModel } from "entities/forecast";
import { useDispatch } from "react-redux";
import { getWeatherForecastAsync } from "../../../forecast/model";

const { Title } = Typography;

export const GeolocationForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const forecastStatus = forecastModel.getForecastStatus();

  const onFinish = ({ lat: latitude, lon: longitude }: { lat: string, lon: string }) => {
    dispatch(getWeatherForecastAsync({ latitude: Number(latitude), longitude: Number(longitude) }));
    form.resetFields();
  };

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.root} loading={forecastStatus === "idle"}>
          <Title style={{ marginBottom: 10 }} level={4}>Найти новое место</Title>
          <Form
            form={form}
            name="geolocation"
            labelCol={{ flex: "90px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Широта"
              name="lat"
              rules={[{ required: true, message: "Please input latitude!" }]}
            >
              <InputNumber style={{ width: 200 }} min="-90" max="90" step="1" stringMode />
            </Form.Item>

            <Form.Item
              label="Долгота"
              name="lon"
              rules={[{ required: true, message: "Please input longitude!" }]}
            >
              <InputNumber style={{ width: 200 }} min="-180" max="180" step="1" stringMode />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Найти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
