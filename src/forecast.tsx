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
  const currentHour = dayjs(geoInfo?.time_zone.current_time)
    .tz(geoInfo?.time_zone.name)
    .hour();
  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseLocalHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");
  const todayForecast = forecast?.list?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );

  const nowIndicator = (dt: number) =>
    currentHour >= dt - 1 && currentHour <= dt + 1;

  return (
    <div className="w-full">
      <p className="mb-2 text-lg font-bold text-slate-300">Today</p>
      <div className="flex flex-grow-0 gap-4 overflow-auto text-center">
        {todayForecast?.map((i, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md border border-slate-500 p-2 before:absolute before:left-0 before:top-0 before:-z-[2] before:h-full before:w-full before:bg-slate-500 before:opacity-40  before:content-['']"
          >
            <div className="text-[.9rem] font-medium text-slate-300">
              {nowIndicator(handlTime(i.dt_txt).hour()) ? (
                <>now</>
              ) : (
                <>{parseLocalHour(i.dt_txt)}</>
              )}
            </div>
            <div className="mx-auto w-2/3">
              <img
                src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@4x.png`}
                alt={i.weather[0].description}
              />
            </div>
            <p className="text-[.9rem] font-medium text-slate-300">
              {i.main.temp}&deg;c
            </p>
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
            accumulator = { ...accumulator, [forecastDate]: [] };
          }
          accumulator[forecastDate] = [...accumulator[forecastDate], i];
        }
        return accumulator;
      },
      {},
    );

  const minMaxForecast: {
    max: ForecastListTypes;
  }[] = Object.values(groupedDaysForecast).map((i: ForecastListTypes[]) => {
    const maxTemp: number = Math.max(...i.map((x) => x.main.temp));

    const maxTempObj: ForecastListTypes = i.filter(
      (x) => x.main.temp === maxTemp,
    )[0];

    return { max: maxTempObj };
  });

  return (
    <div className="grid gap-6">
      <div>Next 5 Days</div>
      {minMaxForecast.map((i, index) => {
        return (
          <div key={index} className="bg-slate-400">
            <div>
              <div>{handlTime(i.max.dt_txt).format("dddd")}</div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${i.max.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p>{i.max.weather[0].description}</p>
              </div>
              <div>{i.max.main.temp}&deg;</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
