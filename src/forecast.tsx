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

  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");
  const todayForecast = listItem?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );
  return (
    <div className="mt-8">
      <p>Today</p>
      <div className="flex gap-4 overflow-auto text-center">
        {todayForecast?.map((i) => (
          <div key={i.dt} className="bg-slate-300 p-4">
            <div>time_zone: {parseHour(i.dt_txt)}</div>
            <div>time_zone: {parseDate(i.dt_txt)}</div>
            <div>UTC: {i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div>
            <div>UTC: {i.dt_txt.split(" ")[0]}</div>
            <div>{i.main.temp}&deg;c</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* <div>{time(i.dt)  currentHour && time(i.dt) +  ? time(i.dt) : "now"}</div> */
/* <div>{time(i.dt)}</div> */
/* <div>{i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div> */

// const todayForecast = listItem.filter(
//   (i) => i.dt_txt.split(" ")[0] == todayDate.format("YYYY-MM-DD"),
// );

// const forecast = await fetchForecast(
//   localGeoInfo?.latitude,
//   localGeoInfo?.longitude,
// );
// console.log(forecast);
