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
        data-isday={IsDay ? "true" : "false"}
        className="data-isday:text-slate-900 font-display text-3xl font-semibold text-slate-300"
      >
        {weatherInfo?.name}
      </div>
      <div
        data-isday={IsDay ? "true" : "false"}
        className="data-isday:text-slate-900 font-display text-xl font-medium text-slate-300"
      >
        <span>{date.format("dddd")}</span>, &nbsp;
        <span>{date.format("MMMM")}</span> &nbsp;
        <span>{date.format("D")}</span>
      </div>
    </div>
  );
}
