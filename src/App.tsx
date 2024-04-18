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
    handleWeatherFetch(geoInfo);
  };

  const loadingSkeleton = status == "Loading" || status == "Error";

  return (
    <IsDayContext.Provider value={isDay}>
      <WeatherContext.Provider value={weatherInfo}>
        {status == "Loading" || weatherInfo == null ? null : <Background />}
        <div
          style={{
            gridTemplateRows: `auto minmax(${mainHeight}px, auto) minmax(100dvh, auto)`,
          }}
          data-error={status == "Error"}
          className="grid min-h-dvh grid-cols-[minmax(375px,_1fr)] data-error:!max-h-dvh md:grid-cols-[1fr_minmax(400px,_auto)] md:!grid-rows-[auto_1fr]"
        >
          <Header
            isWeatherInfo={isWeatherInfo}
            refresh={refresh}
            mainHeight={mainHeight}
            setMainHeight={setMainHeight}
          />
          {status != "Error" ? (
            <>
              <main className="grid grid-cols-[minmax(375px,_1fr)] grid-rows-[1fr_auto] gap-y-4 py-5 md:px-10">
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
              <aside className="bg-[hsl(0,0%,11%)] px-3 py-6">
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
