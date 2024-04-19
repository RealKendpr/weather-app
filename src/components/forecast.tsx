import {
  ForecastDataTypes,
  ForecastListTypes,
  GeoDataTypes,
} from "../types/type";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DaysForecastSkeleton, HourlyForecastSkeleton } from "../loading";

dayjs.extend(utc);
dayjs.extend(timezone);

export function HourlyForecast({
  forecast,
  geoInfo,
  loading,
}: {
  forecast: ForecastDataTypes | null | undefined;
  geoInfo: GeoDataTypes | null | undefined;
  loading: boolean;
}) {
  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const currentHour = todayDate.tz(geoInfo?.time_zone.name).hour();

  const parseLocalHour = (hour: string) => handlTime(hour).format("HH:mm");
  const parseDate = (date: string) => handlTime(date).format("YYYY-MM-DD");

  const todayForecast = forecast?.list?.filter(
    (i) => parseDate(i.dt_txt) == todayDate.format("YYYY-MM-DD"),
  );

  const forecastToShow = () => {
    if (todayForecast != null && todayForecast?.length >= 3) {
      return todayForecast;
    } else {
      const tomorrowForecast = forecast?.list.filter(
        (i) =>
          parseDate(i.dt_txt) == todayDate.add(1, "day").format("YYYY-MM-DD"),
      );
      return tomorrowForecast
        ? todayForecast?.concat(tomorrowForecast?.slice(0, 3))
        : todayForecast;
    }
  };

  const forecastLoading = loading || forecastToShow() == null || undefined;

  const nowIndicator = (dt: string) => {
    if (handlTime(dt).hour() != 0) {
      return (
        currentHour >= handlTime(dt).subtract(1, "hour").hour() &&
        currentHour <= handlTime(dt).add(1, "hour").hour()
      );
    } else {
      return (
        currentHour <= handlTime(dt).add(1, "hour").hour() ||
        currentHour == handlTime(dt).hour(23).hour()
      );
    }
  };

  return (
    <>
      <h2 className="mb-2 text-xl font-bold text-slate-100">Today</h2>
      <div
        data-forecastloading={forecastLoading ? "true" : "false"}
        className="flex snap-x snap-mandatory gap-5 overflow-auto pb-4 text-center data-forecastloading:overflow-x-hidden"
      >
        {forecastLoading
          ? Array.from({ length: 8 }, (_, i) => (
              <HourlyForecastSkeleton key={i} />
            ))
          : forecastToShow()?.map((i, index) => (
              <div
                data-nowindicator={nowIndicator(i.dt_txt) ? "now" : "notnow"}
                key={index}
                className="relative max-h-32 min-w-28 max-w-28 flex-grow-0 snap-start overflow-hidden rounded-md border border-slate-500 bg-gray-400 p-2 font-semibold text-[hsl(0,0%,11%)] data-nowindicator:snap-center data-nowindicator:bg-[#b6a63e]"
              >
                <div className="text-[.9rem]">
                  {nowIndicator(i.dt_txt) ? (
                    <>now</>
                  ) : (
                    <>{parseLocalHour(i.dt_txt)}</>
                  )}
                </div>
                <div className="mx-auto grid min-h-[62px] w-2/3 items-center">
                  <img
                    loading="lazy"
                    className="pointer-events-none selection:select-none"
                    src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@4x.png`}
                    alt={i.weather[0].description}
                  />
                </div>
                <p className="text-[.9rem]">{i.main.temp}&deg;c</p>
              </div>
            ))}
      </div>
    </>
  );
}

export function DaysForecast({
  forecast,
  geoInfo,
  loading,
}: {
  forecast: ForecastDataTypes | null | undefined;
  geoInfo: GeoDataTypes | null | undefined;
  loading: boolean;
}) {
  const handlTime = (time: string) => dayjs(time).tz(geoInfo?.time_zone.name);
  const parseLocalDate = (date: string) => handlTime(date).format("YYYY-MM-DD");

  const todayDate = dayjs(geoInfo?.time_zone.current_time);

  const groupedDaysForecast: { [key: string]: ForecastListTypes[] } =
    forecast?.list?.reduce(
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
    ) as { [key: string]: ForecastListTypes[] };

  const minMaxForecast: {
    max: ForecastListTypes;
  }[] = groupedDaysForecast
    ? Object.values(groupedDaysForecast).map((i: ForecastListTypes[]) => {
        const maxTemp: number = Math.max(...i.map((x) => x.main.temp));

        const maxTempObj: ForecastListTypes = i.filter(
          (x) => x.main.temp === maxTemp,
        )[0];

        return { max: maxTempObj };
      })
    : [];

  const daysForecastLoading =
    loading || minMaxForecast.length < 1 || minMaxForecast == undefined;

  return (
    <>
      <h2 className="mb-2 font-display text-xl font-bold text-slate-200">
        Next 5 Days
      </h2>
      <div>
        {daysForecastLoading
          ? Array.from({ length: 5 }, (_, i) => (
              <DaysForecastSkeleton key={i} />
            ))
          : minMaxForecast.map((i, index) => {
              return (
                <div
                  key={index}
                  className="relative grid w-full grid-cols-3 items-center justify-items-center px-2 pb-8 pt-4 text-gray-400 after:absolute after:bottom-0 after:h-px after:w-full after:bg-white after:opacity-20 after:content-['']"
                >
                  <p className="justify-self-start font-display text-base ">
                    {handlTime(i.max.dt_txt).format("dddd")}
                  </p>
                  <figure className="flex w-[90%] items-center justify-self-start">
                    <div className="w-10 flex-shrink-0">
                      <img
                        loading="lazy"
                        className="pointer-events-none selection:select-none"
                        src={`https://openweathermap.org/img/wn/${i.max.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    <figcaption className="text-clip whitespace-nowrap font-display text-[clamp(.75rem,_50%,_1rem)] text-[#b6a63e]">
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
    </>
  );
}
