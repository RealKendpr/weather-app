import {
  ForecastDataTypes,
  ForecastListTypes,
  GeoDataTypes,
} from "./types/type";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function HourlyForecast({
  forecast,
  geoInfo,
}: {
  forecast: ForecastDataTypes | null | undefined;
  geoInfo: GeoDataTypes | null | undefined;
}) {
  const listItem = forecast?.list.map((i) => {
    return i;
  });
  const currentHour = dayjs(geoInfo?.time_zone.current_time)
    .tz(geoInfo?.time_zone.name)
    .hour();
  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseLocalHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");
  const todayForecast = listItem?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );

  const nowIndicator = (dt: number) => {
    return currentHour >= dt - 1 && currentHour <= dt + 1;
    // return dt >= currentHour && dt <= currentHour + 3;
    // return dt === currentHour && dt < currentHour + 3;

    //* this is what its supposed to do:
    //? -return true if the currentHour is within range of dt, dt => currentHour < dt
    //? -return true if the currentHour is inside dt
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
              <div>{parseLocalHour(i.dt_txt)}</div>
            )}
            <div>{parseLocalHour(i.dt_txt)}</div>
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

export function DaysForecast({
  forecast,
  geoInfo,
}: {
  forecast: ForecastDataTypes | null;
  geoInfo: GeoDataTypes | null;
}) {
  if (forecast == null) {
    return;
  }
  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseLocalDate = (date: string) => handlTime(date).format("YYYY-MM-DD");

  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const groupedDaysForecast: { [key: string]: ForecastListTypes[] } =
    forecast.list.reduce(
      (
        accumulator: { [key: string]: ForecastListTypes[] },
        i: ForecastListTypes,
      ) => {
        const forecastDate: string = parseLocalDate(i.dt_txt);

        if (forecastDate !== todayDate.format("YYYY-MM-DD")) {
          if (!accumulator[forecastDate]) {
            accumulator[forecastDate] = [];
          }
          accumulator[forecastDate].push(i);
        }
        return accumulator;
      },
      {},
    );

  const minMaxForecast: {
    min: ForecastListTypes;
    max: ForecastListTypes;
  }[] = Object.values(groupedDaysForecast).map((i: ForecastListTypes[]) => {
    const minTemp: number = Math.min(...i.map((x) => x.main.temp));
    const maxTemp: number = Math.max(...i.map((x) => x.main.temp));

    const minObj: ForecastListTypes = i.filter(
      (x) => x.main.temp === minTemp,
    )[0];
    const maxObj: ForecastListTypes = i.filter(
      (x) => x.main.temp === maxTemp,
    )[0];

    return { min: minObj, max: maxObj };
  });

  return (
    <div className="grid gap-6">
      <div>Next 5 Days</div>
      {minMaxForecast.map((i, index) => {
        return (
          <div key={index} className="bg-slate-400">
            <div>
              <div>Min</div>
              <div>{i.min.dt_txt}</div>
              <div>{i.min.main.temp}&deg;</div>
            </div>
            <div>
              <div>Max</div>
              <div>{i.max.dt_txt}</div>
              <div>{i.max.main.temp}&deg;</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
