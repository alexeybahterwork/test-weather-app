import { PropsWithChildren, useState } from "react";
import { Button, Input, List, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { ForecastBasic } from "../../../../shared/api";
import { deleteForecastById, setCurrentForecast, updateForecastNameById } from "../../../forecast/model";
import { clsx } from "clsx";
import styles from "./styles.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type GeolocationRowProps = PropsWithChildren<{
  forecast: ForecastBasic;
}>

const { Text } = Typography;

export const GeolocationRow = ({ forecast }: GeolocationRowProps) => {
  const [editingGeolocationID, setEditingGeolocationID] = useState<string | null>(null);
  const [editingGeolocationName, setEditingGeolocationName] = useState<string>("");

  const dispatch = useDispatch();

  const onSelectForecast = () => {
    dispatch(setCurrentForecast(forecast));
  };

  const onDeleteForecast = (id: string) => {
    dispatch(deleteForecastById(id));
  };

  const onEditForecastNane = () => {
    setEditingGeolocationID(forecast.id);
    setEditingGeolocationName(forecast.localityName);
  };

  const onUpdateForecastName = async (changedGeolocationName: string | null) => {
    if (!changedGeolocationName) return;

    editingGeolocationID && dispatch(updateForecastNameById({ id: editingGeolocationID, name: editingGeolocationName }));

    if (editingGeolocationID !== null) setEditingGeolocationID(null);
  };

  return (
    <>
      <List.Item
        className={clsx([forecast.selected && styles.row_selected, styles.row])}
      >
        {editingGeolocationID === forecast.id ? (
          <>
            <Space style={{ width: "100%" }}>
              <Input
                autoFocus
                value={editingGeolocationName}
                onChange={(e) => setEditingGeolocationName(e.target.value)}
              />
              <Button type="primary" onClick={() => onUpdateForecastName(editingGeolocationName)}>Изменить</Button>
            </Space>
          </>
        ) : (
          <Text>{forecast.localityName}</Text>
        )}
        {!(editingGeolocationID === forecast.id) && (
          <Space>
            {!forecast.selected && <Button type="dashed" onClick={onSelectForecast}>Выбрать</Button>}
            <Button
              onClick={onEditForecastNane}
              icon={<EditOutlined />}
            />
            <Button onClick={() => onDeleteForecast(forecast.id)} danger icon={<DeleteOutlined />} />
          </Space>
        )}
      </List.Item>
    </>
  );
};
