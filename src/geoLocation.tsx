import { useContext } from "react";
import { IsDayContext, WeatherContext } from "./context/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function GeoLocation({ time, tz }: { time: string; tz: string }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const date = dayjs(time).tz(tz);
  const IsDay = useContext(IsDayContext);
  const weatherInfo = useContext(WeatherContext);

  return (
    <div>
      <div
        data-isDay={IsDay ? "true" : "false"}
        className="data-isDay:text-slate-900 text-2xl font-bold text-slate-600"
      >
        {weatherInfo?.name}
      </div>
      <div
        data-isDay={IsDay ? "true" : "false"}
        className="data-isDay:text-slate-900 text-sm font-semibold text-slate-600"
      >
        <span>{date.format("dddd")}</span>, &nbsp;
        <span>{date.format("MMMM")}</span> &nbsp;
        <span>{date.format("D")}</span>
      </div>
    </div>
  );
}
