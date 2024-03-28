import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { TimeZoneTypes, WeatherTypes } from "./types/type";
import { AdditionalInfo } from "./utils/additionaInfo";
import { Status } from "./fetchStatus";
import { Buttons } from "./utils/buttons";
import { GeoLocation } from "./geoLocation";
import { WeatherContext } from "./context/context";
import { Background } from "./utils/background";

import dayjs, { tz } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();

  const [failedFetch, setFailedFetch] = useState(false);
  const [errText, setErrText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [time, setTime] = useState<TimeZoneTypes>();

  const uuid = crypto.randomUUID();
  const isWeatherInfo = weatherInfo !== undefined || null ? true : false;
  const isDay =
    dayjs(time?.current_time).tz(time?.name).hour() >= 18 ? false : true;

  const handleFetch = async () => {
    const weatherKey: string = apiKey.weatherKey;
    const geoKey: string = apiKey.geoKey;

    await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${geoKey}`)
      .then((geo) => geo.json())
      .then((data) => {
        setTime(data.time_zone);
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${weatherKey}&units=metric`,
        );
      })
      .then((weather) => weather.json())
      .then((data) => {
        setWeatherInfo(data);
        "rain" in data
          ? setPrecipitation(data.rain["1h"])
          : "snow" in data
            ? setPrecipitation(data.snow["1h"])
            : null;
        setWindSpeed(data.wind.speed);
        setLoading(false);
      })
      .catch((err) => {
        setErrText(err);
        setFailedFetch(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const refresh = () => {
    setLoading(true);
    handleFetch();
  };

  // setTimeout(() => {
  //   handleFetch();
  // }, 60000);

  return (
    <>
      <div className="grid min-h-screen w-full place-items-center">
        {time && <Background isDay={isDay}></Background>}
        <WeatherContext.Provider value={weatherInfo}>
          <div className="grid gap-12">
            {time && (
              <GeoLocation
                time={time.current_time}
                tz={time.name}
              ></GeoLocation>
            )}
            <div>
              {weatherInfo &&
                weatherInfo.weather.map((weather) => (
                  <div key={uuid}>
                    <div className="flex justify-center">
                      {/* <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                    alt=""
                  /> */}
                    </div>
                    <div className="text-center text-5xl font-bold">
                      {weatherInfo?.main.temp} &deg;c
                    </div>
                    <div className="text-center">{weather.description}</div>
                  </div>
                ))}
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
      <Status status={loading} text="Loading..."></Status>
      <Status status={failedFetch} text={`${errText}`}></Status>
    </>
  );
}

export default App;
