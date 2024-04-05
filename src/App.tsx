import { useEffect, useState } from "react";
import { GeoDataTypes, WeatherTypes } from "./types/type";
import { AdditionalInfo } from "./utils/additionaInfo";
import { Status } from "./fetchStatus";
import { Buttons } from "./utils/buttons";
import { GeoLocation } from "./geoLocation";
import { IsDayContext, WeatherContext } from "./context/context";
import { Background } from "./utils/background";
import { fetchGeo, fetchWeather } from "./utils/api";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import localizedFormat from "dayjs/plugin/localizedFormat";

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);

  const [weatherInfo, setWeatherInfo] = useState<
    WeatherTypes | null | undefined
  >(null);
  const [geoInfo, setGeoInfo] = useState<GeoDataTypes | null | undefined>(null);

  const [status, setStatus] = useState<string>("Loading");
  const [errText, setErrText] = useState<string>("");

  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);

  // const uuid = crypto.randomUUID();
  const isWeatherInfo = weatherInfo !== undefined || null ? true : false;
  const isDay =
    dayjs(geoInfo?.time_zone.current_time).tz(geoInfo?.time_zone.name).hour() >=
    18
      ? false
      : true;

  const handleWeatherFetch = (geoInfo: GeoDataTypes | null | undefined) => {
    if (geoInfo == null) {
      setErrText("Failed To Establish Your Area");
      setStatus("Error");
    } else if (geoInfo?.latitude == null && geoInfo.longitude == null) {
      setErrText("Failed To Establish Your Area");
      setStatus("Error");
    } else
      fetchWeather(
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
      handleWeatherFetch(localGeoInfo);
    };
    firstFetch();
  }, []);

  const refresh = () => {
    setStatus("Loading");
    handleWeatherFetch(geoInfo);
  };

  // setTimeout(() => {
  //   handleFetch();
  // }, 60000);

  return (
    <>
      <IsDayContext.Provider value={isDay}>
        <div className="grid min-h-screen w-full place-items-center">
          <WeatherContext.Provider value={weatherInfo}>
            {geoInfo?.time_zone && <Background></Background>}
            <div className="grid gap-12">
              {geoInfo?.time_zone && (
                <GeoLocation
                  time={geoInfo.time_zone.current_time}
                  tz={geoInfo.time_zone.name}
                ></GeoLocation>
              )}
              <div>
                <div
                  data-isDay={isDay ? "true" : "false"}
                  className="data-isDay:text-slate-900 text-center text-5xl font-bold text-slate-600"
                >
                  {weatherInfo?.main.temp} &deg;c
                </div>
                <div
                  data-isDay={isDay ? "true" : "false"}
                  className="data-isDay:text-slate-900 text-center font-semibold text-slate-600"
                >
                  {weatherInfo?.weather[0].main}
                </div>
                {/* {weatherInfo?.weather.map((weather) => (
                <div key={weather.id} className="text-center">
                {weather.description}
                </div>
              ))} */}
              </div>
              <div className="flex gap-4">
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
          </WeatherContext.Provider>
          <Buttons weatherInfo={isWeatherInfo} action={refresh}></Buttons>
        </div>
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
    </>
  );
}

export default App;
