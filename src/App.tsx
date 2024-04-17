import { useRef, useEffect, useState } from "react";
import { RefObject } from "react";
import { GeoDataTypes, WeatherTypes, ForecastDataTypes } from "./types/type";
import { AdditionalInfo } from "./utils/additionaInfo";
import { Status } from "./fetchStatus";
import { Buttons } from "./utils/buttons";
import { GeoLocation } from "./geoLocation";
import { IsDayContext, WeatherContext } from "./context/context";
import { Background } from "./utils/background";
import { fetchGeo, fetchWeather, fetchForecast } from "./utils/api";
import { DaysForecast, HourlyForecast } from "./forecast";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import localizedFormat from "dayjs/plugin/localizedFormat";

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);

  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes | null>(null);
  const [geoInfo, setGeoInfo] = useState<GeoDataTypes | null>(null);
  const [forecastInfo, setForecastInfo] = useState<ForecastDataTypes | null>(
    null,
  );

  const [status, setStatus] = useState<string>("Loading");
  const [errText, setErrText] = useState<string>("");

  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);

  const [mainHeight, setMainHeight] = useState(window.innerHeight);
  const header: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // const uuid = crypto.randomUUID();
  const isWeatherInfo = weatherInfo !== undefined || null ? true : false;
  const currentHour = dayjs(geoInfo?.time_zone.current_time)
    .tz(geoInfo?.time_zone.name)
    .hour();
  const isDay = !(currentHour >= 5 && currentHour < 17) ? false : true;

  const handleWeatherFetch = async (
    geoInfo: GeoDataTypes | null | undefined,
  ) => {
    if (geoInfo == null) {
      setErrText("Failed To Establish Your Area");
      setStatus("Error");
    } else if (geoInfo?.latitude == null && geoInfo.longitude == null) {
      setErrText("Failed To Establish Your Area");
      setStatus("Error");
    } else
      await fetchWeather(
        geoInfo.latitude,
        geoInfo.longitude,
        setWeatherInfo,
        setPrecipitation,
        setWindSpeed,
        setStatus,
        setErrText,
      );
  };

  useEffect(() => {
    const firstFetch = async () => {
      const localGeoInfo = await fetchGeo(setErrText, setStatus, setGeoInfo);
      await handleWeatherFetch(localGeoInfo);
      await fetchForecast(
        localGeoInfo?.latitude,
        localGeoInfo?.longitude,
        setForecastInfo,
      );
    };
    firstFetch();
  }, []);

  const refresh = () => {
    setStatus("Loading");
    handleWeatherFetch(geoInfo);
  };

  useEffect(() => {
    const handleMainHeightResize = () => {
      const headerHeight = header?.current?.clientHeight;
      setMainHeight(window.innerHeight - (headerHeight || 0));
    };
    window.addEventListener("resize", handleMainHeightResize);
    handleMainHeightResize();
    return () => {
      window.removeEventListener("resize", handleMainHeightResize);
    };
  }, [mainHeight, header]);

  // setTimeout(() => {
  //   handleFetch();
  // }, 60000);

  return (
    <IsDayContext.Provider value={isDay}>
      <WeatherContext.Provider value={weatherInfo}>
        {geoInfo?.time_zone && <Background></Background>}
        <div
          style={{
            gridTemplateRows: `auto minmax(${mainHeight}px, auto) minmax(100dvh, auto)`,
          }}
          className="grid min-h-dvh grid-cols-[minmax(375px,_1fr)] md:grid-cols-[1fr_minmax(400px,_auto)] md:!grid-rows-[auto_1fr]"
        >
          <header
            ref={header}
            className="flex w-full items-center justify-between bg-slate-600 px-2 py-2 md:col-span-2"
          >
            <h1 className="text-lg font-bold text-slate-200">
              Simple Weather App
            </h1>
            <Buttons weatherInfo={isWeatherInfo} action={refresh}></Buttons>
          </header>
          <main className="grid grid-cols-[minmax(375px,_1fr)] grid-rows-[1fr_auto] gap-y-4 py-5 md:px-10">
            <div className="mx-auto grid w-11/12 lg:w-3/5">
              {geoInfo?.time_zone && (
                <GeoLocation
                  time={geoInfo.time_zone.current_time}
                  tz={geoInfo.time_zone.name}
                ></GeoLocation>
              )}
              <div>
                <h3
                  data-isday={isDay ? "true" : "false"}
                  className="text-center font-display text-[5.5rem] font-bold leading-tight text-slate-200 data-isday:text-slate-900"
                >
                  {weatherInfo?.main.temp}&deg;c
                </h3>
                <div className="flex flex-col items-center">
                  <div
                    data-isday={isDay ? "true" : "false"}
                    className="flex items-center gap-1 font-display text-xl font-semibold text-slate-200 data-isday:text-slate-900"
                  >
                    <span>
                      <svg
                        aria-labelledby="max-min"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <title id="max-min">
                          Minimum to Maximum Temperature
                        </title>
                        <path
                          data-isday={isDay ? "true" : "false"}
                          className="stroke-slate-300 data-isday:stroke-slate-900"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 20V10m0 10l-3-3m3 3l3-3m5-13v10m0-10l3 3m-3-3l-3 3"
                        ></path>
                      </svg>
                    </span>
                    <div>
                      {weatherInfo?.main.temp_min ===
                      weatherInfo?.main.temp_max ? (
                        <>{weatherInfo?.main.temp_max}&deg;</>
                      ) : (
                        <>
                          {weatherInfo?.main.temp_min}&deg; &mdash;{" "}
                          {weatherInfo?.main.temp_max}&deg;
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    data-isday={isDay ? "true" : "false"}
                    className="font-display text-xl font-semibold text-slate-200 data-isday:text-slate-900"
                  >
                    {weatherInfo?.weather[0].main}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-around gap-x-4">
                <AdditionalInfo
                  name="Wind"
                  value={windSpeed}
                  unit="Kilometer per Hour"
                  shortUnit="km/h"
                ></AdditionalInfo>
                <AdditionalInfo
                  name="Precipitation"
                  value={precipitation}
                  unit="Milimeter"
                  shortUnit="mm"
                ></AdditionalInfo>
              </div>
            </div>
            <div className="mx-auto min-h-32 w-11/12 lg:mx-0 lg:w-full">
              <HourlyForecast
                forecast={forecastInfo}
                geoInfo={geoInfo}
              ></HourlyForecast>
            </div>
          </main>
          <aside className="bg-[hsl(0,0%,11%)] px-3 py-6">
            <DaysForecast
              forecast={forecastInfo}
              geoInfo={geoInfo}
            ></DaysForecast>
          </aside>
        </div>
      </WeatherContext.Provider>
      <Status
        status={status}
        text={
          status === "Loading"
            ? "Loading..."
            : status === "Error"
              ? `${errText}`
              : ""
        }
      ></Status>
    </IsDayContext.Provider>
  );
}

export default App;
