import { ForecastDataTypes, GeoDataTypes } from "./types/type";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function HourlyForecast({
  forecast,
  geoInfo,
}: {
  forecast: ForecastDataTypes | null | undefined;
  geoInfo: GeoDataTypes | null | undefined;
}) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const listItem = forecast?.list.map((i) => {
    return i;
  });
  const currentHour = dayjs(geoInfo?.time_zone.current_time)
    .tz(geoInfo?.time_zone.name)
    .hour();
  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");
  const todayForecast = listItem?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );

  const nowIndicator = (dt: number) => {
    return dt >= currentHour && dt <= currentHour + 3;
  };

  return (
    <div className="mt-8">
      <p>Today</p>
      <div className="flex gap-4 overflow-auto text-center">
        {todayForecast?.map((i) => (
          <div key={i.dt} className="bg-slate-300 p-4">
            {nowIndicator(handlTime(i.dt_txt).hour()) ? (
              <div>now</div>
            ) : (
              <div>{parseHour(i.dt_txt)}</div>
            )}
            <img
              src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@4x.png`}
              alt=""
            />
            <div>{i.main.temp}&deg;c</div>
          </div>
        ))}
      </div>
    </div>
  );
}
