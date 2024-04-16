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
      <h2
        data-isday={IsDay ? "true" : "false"}
        className="font-display text-3xl font-semibold text-slate-200 data-isday:text-slate-900"
      >
        {weatherInfo?.name}
      </h2>
      <p
        data-isday={IsDay ? "true" : "false"}
        className="font-display text-xl font-medium text-slate-200 data-isday:text-slate-900"
      >
        <span>{date.format("dddd")}</span>, &nbsp;
        <span>{date.format("MMMM")}</span> &nbsp;
        <span>{date.format("D")}</span>
      </p>
    </div>
  );
}
