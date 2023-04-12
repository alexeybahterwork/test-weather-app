import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const addPositiveSymbolForTemp = (temp: number | undefined) => (temp && temp >= 0 ? `+${temp}` : `${temp}`);

const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;

export const shortenedDayNameByDate = (date: Date) => {
  const dayName: string = format(new Date(date), "EEEEEE", { locale: ru });
  return capitalize(dayName);
};
