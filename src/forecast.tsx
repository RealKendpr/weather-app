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
  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const currentHour = todayDate.tz(geoInfo?.time_zone.name).hour();

  const parseLocalHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");
  const todayForecast = forecast?.list?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );

  const nowIndicator = (dt: string) =>
    currentHour >= handlTime(dt).subtract(1, "hour").hour() &&
    currentHour <= handlTime(dt).add(1, "hour").hour();

  return (
    <>
      <h2 className="mb-2 text-lg font-bold text-slate-300">Today</h2>
      <div className="flex gap-5 overflow-auto text-center">
        {todayForecast?.map((i, index) => (
          <div
            key={index}
            className="relative min-w-16 flex-grow overflow-hidden rounded-md border border-slate-500 p-2 before:absolute before:left-0 before:top-0 before:-z-[2] before:h-full before:w-full before:bg-slate-500  before:opacity-40 before:content-['']"
          >
            <div className="text-[.9rem] font-medium text-slate-300">
              {nowIndicator(i.dt_txt) ? (
                <>now</>
              ) : (
                <>{parseLocalHour(i.dt_txt)}</>
              )}
            </div>
            <div className="mx-auto w-2/3">
              <img
                className="pointer-events-none selection:select-none"
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
    </>
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
    <div className="min-h-dvh bg-slate-400 px-3 py-6">
      <h2 className="mb-2 font-display text-lg font-bold text-slate-300">
        Next 5 Days
      </h2>
      <div>
        {minMaxForecast.map((i, index) => {
          return (
            <div
              key={index}
              className="relative grid w-full grid-cols-3 items-center justify-items-center px-2 py-5 after:absolute after:bottom-0 after:h-px after:w-full after:bg-slate-300 after:opacity-40 after:content-['']"
            >
              <p className="justify-self-start font-display text-base">
                {handlTime(i.max.dt_txt).format("dddd")}
              </p>
              <figure className="flex w-[90%] items-center justify-start">
                <div className="w-10">
                  <img
                    // className="mb-[-10px]"
                    className="pointer-events-none selection:select-none"
                    src={`https://openweathermap.org/img/wn/${i.max.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <figcaption className="text-clip whitespace-nowrap font-display text-xs">
                  {i.max.weather[0].description
                    .toLowerCase()
                    .replace(/\b\w/g, (s) => s.toUpperCase())}
                </figcaption>
              </figure>
              <p className="justify-self-end font-display text-3xl font-bold">
                {i.max.main.temp}&deg;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
