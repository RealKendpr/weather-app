import { useEffect, useState } from "react";
import { GeoDataTypes, WeatherTypes, ForecastDataTypes } from "./types/type";
import { AdditionalInfo } from "./components/additionaInfo";
import { Status } from "./components/fetchStatus";
import { GeoLocation } from "./components/geoLocation";
import { IsDayContext, WeatherContext } from "./context/context";
import { Background } from "./components/background";
import { fetchGeo, fetchWeather, fetchForecast } from "./utils/api";
import { DaysForecast, HourlyForecast } from "./components/forecast";
import { WeatherDisplay } from "./components/weatherDisplay";
import { Header } from "./components/header";
import { GeoInfoSkeleton, WeatherDispSkeleton } from "./loading";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [geoInfo, setGeoInfo] = useState<GeoDataTypes | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes | null>(null);
  const [forecastInfo, setForecastInfo] = useState<ForecastDataTypes | null>(
    null,
  );

  const [status, setStatus] = useState<string>("Loading");
  const [errText, setErrText] = useState<string>("");

  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);

  const [mainHeight, setMainHeight] = useState(window.innerHeight);
  const [headerHeight, setHeaderHeight] = useState(0);

  const isWeatherInfo =
    weatherInfo !== null && weatherInfo !== undefined ? true : false;

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
      if (status != "Loading" || "Error") {
        await fetchForecast(
          localGeoInfo?.latitude,
          localGeoInfo?.longitude,
          setForecastInfo,
        );
      }
    };
    firstFetch();
  }, []);

  const refresh = () => {
    setStatus("Loading");
    setWeatherInfo(null);
    handleWeatherFetch(geoInfo);
  };

  const wideViewport = window.matchMedia("(min-width: 1024px)").matches;
  const loadingSkeleton = status == "Loading" || status == "Error";

  return (
    <IsDayContext.Provider value={isDay}>
      <WeatherContext.Provider value={weatherInfo}>
        {status == "Loading" || weatherInfo == null ? null : <Background />}
        <div
          data-error={status == "Error"}
          style={{
            gridTemplateRows: `auto minmax(${mainHeight}px, auto) minmax(100dvh, auto)`,
          }}
          className="grid min-h-dvh grid-cols-[minmax(375px,_1fr)] data-error:!max-h-dvh lg:block"
        >
          <Header
            isWeatherInfo={isWeatherInfo}
            refresh={refresh}
            mainHeight={mainHeight}
            setMainHeight={setMainHeight}
            setHeaderHeight={setHeaderHeight}
          />
          {status != "Error" ? (
            <>
              <main
                style={wideViewport ? { top: `${headerHeight}px` } : {}}
                className="grid grid-cols-[minmax(375px,_1fr)] grid-rows-[1fr_auto] gap-y-4 py-5 lg:fixed lg:bottom-0 lg:left-0 lg:w-[65%] lg:px-10"
              >
                <div className="mx-auto grid w-11/12 lg:w-3/5">
                  {loadingSkeleton ? (
                    <>
                      <GeoInfoSkeleton />
                      <WeatherDispSkeleton />
                    </>
                  ) : (
                    <>
                      <GeoLocation
                        time={geoInfo?.time_zone?.current_time}
                        tz={geoInfo?.time_zone?.name}
                      />
                      <WeatherDisplay isDay={isDay} weatherInfo={weatherInfo} />
                    </>
                  )}
                  <div className="flex flex-wrap justify-around gap-x-4">
                    <AdditionalInfo
                      name="Wind"
                      value={windSpeed}
                      unit="Kilometer per Hour"
                      shortUnit="km/h"
                      loading={loadingSkeleton}
                    />
                    <AdditionalInfo
                      name="Precipitation"
                      value={precipitation}
                      unit="Milimeter"
                      shortUnit="mm"
                      loading={loadingSkeleton}
                    />
                  </div>
                </div>
                <div className="mx-auto min-h-32 w-11/12 lg:mx-0 lg:w-full">
                  <HourlyForecast
                    forecast={forecastInfo}
                    geoInfo={geoInfo}
                    loading={loadingSkeleton}
                  />
                </div>
              </main>
              <aside
                style={
                  wideViewport
                    ? { paddingTop: `calc(${headerHeight}px + 1.5rem)` }
                    : {}
                }
                className="min-h-dvh bg-[hsl(0,0%,11%)] px-3 py-6 lg:ml-[65%] lg:w-[35%] lg:min-w-[min-content]"
              >
                <DaysForecast
                  forecast={forecastInfo}
                  geoInfo={geoInfo}
                  loading={loadingSkeleton}
                />
              </aside>
            </>
          ) : (
            <Status
              refresh={refresh}
              error={status == "Error"}
              text={`${errText}`}
            />
          )}
        </div>
      </WeatherContext.Provider>
    </IsDayContext.Provider>
  );
}

export default App;
