import { PropsWithChildren } from "react";
import { forecastConditionIconPath } from "../../const";

type WeatherIconByNameProps = PropsWithChildren<{
  icon?: string;
  className?: string;
  size?: number;
}>;

export const WeatherIconByName = ({ icon, ...rest }: WeatherIconByNameProps) => {
  return (
    <>
      {icon && <img src={`${forecastConditionIconPath}${icon}.svg`} {...rest} alt="forecast" />}
    </>
  );
};
