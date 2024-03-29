import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { TimeZoneTypes, WeatherTypes } from "./types/type";
import { AdditionalInfo } from "./utils/additionaInfo";
import { Status } from "./fetchStatus";
import { Buttons } from "./utils/buttons";
import { GeoLocation } from "./geoLocation";
import { WeatherContext } from "./context/context";
import { Background } from "./utils/background";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import localizedFormat from "dayjs/plugin/localizedFormat";

function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // dayjs.extend(localizedFormat);
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

    try {
      const geoResponse = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${geoKey}`,
      );
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();

        setTime(geoData.time_zone);

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${weatherKey}&units=metric`,
        );

        if (weatherResponse.ok) {
          const weatherData = await weatherResponse.json();

          setWeatherInfo(weatherData);

          "rain" in weatherData
            ? setPrecipitation(weatherData.rain["1h"])
            : "snow" in weatherData
              ? setPrecipitation(weatherData.snow["1h"])
              : null;

          setWindSpeed(weatherData.wind.speed);
          setLoading(false);
        }
        throw new Error("Failed To Fetch The Weather Information");
      }
      throw new Error("Failed To Establish Your Area");
    } catch (err) {
      setErrText(err as string);
      setFailedFetch(true);
      setLoading(false);
    }
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
        <WeatherContext.Provider value={weatherInfo}>
          {time && <Background isDay={isDay}></Background>}
          <div className="grid gap-12">
            {time && (
              <GeoLocation
                time={time.current_time}
                tz={time.name}
              ></GeoLocation>
            )}
            <div>
              {weatherInfo?.weather.map((weather) => (
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
