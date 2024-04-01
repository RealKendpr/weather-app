import { useContext } from "react";
import { WeatherContext } from "./context/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function GeoLocation({ time, tz }: { time: string; tz: string }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const date = dayjs(time).tz(tz);
  const weatherInfo = useContext(WeatherContext);

  return (
    <div>
      <div className="text-2xl font-bold">{weatherInfo?.name}</div>
      <div className="text-sm font-semibold">
        <span>{date.format("dddd")}</span>, &nbsp;
        <span>{date.format("MMMM")}</span> &nbsp;
        <span>{date.format("D")}</span>
      </div>
    </div>
  );
}
