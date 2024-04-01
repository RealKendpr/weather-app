import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { GeoDataTypes, WeatherTypes } from "./types/type";
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
  const [geoInfo, setGeoInfo] = useState<GeoDataTypes>();

  const [failedFetch, setFailedFetch] = useState(false);
  const [errText, setErrText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);

  // const uuid = crypto.randomUUID();
  const isWeatherInfo = weatherInfo !== undefined || null ? true : false;
  const isDay =
    dayjs(geoInfo?.time_zone.current_time).tz(geoInfo?.time_zone.name).hour() >=
    18
      ? false
      : true;

  const fetchGeo = async () => {
    const geoKey: string = apiKey.geoKey;
    try {
      const geoResponse = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${geoKey}`,
      );
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        setGeoInfo(geoData);
        return await geoData;
      } else if (geoResponse.status === 429) {
        throw new Error(
          "The data request limit of this application has exceeded",
        );
      } else {
        throw new Error("Failed To Establish Your Area");
      }
    } catch (err) {
      setErrText(err as string);
      setFailedFetch(true);
      setLoading(false);
    }
  };

  const fetchWeather = async (latitude: string, longitude: string) => {
    const weatherKey: string = apiKey.weatherKey;
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`,
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
      } else {
        throw new Error("Failed To Fetch The Weather Information");
      }
    } catch (err) {
      setErrText(err as string);
      setFailedFetch(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleFirstFetch = async () => {
      const geoData = await fetchGeo();
      fetchWeather(geoData.latitude, geoData.longitude);
    };
    handleFirstFetch();
  }, []);

  const refresh = () => {
    setLoading(true);
    fetchWeather(geoInfo?.latitude ?? "", geoInfo?.longitude ?? "");
  };

  // setTimeout(() => {
  //   handleFetch();
  // }, 60000);

  return (
    <>
      <div className="grid min-h-screen w-full place-items-center">
        <WeatherContext.Provider value={weatherInfo}>
          {geoInfo?.time_zone && <Background isDay={isDay}></Background>}
          <div className="grid gap-12">
            {geoInfo?.time_zone && (
              <GeoLocation
                time={geoInfo.time_zone.current_time}
                tz={geoInfo.time_zone.name}
              ></GeoLocation>
            )}
            <div>
              <div className="text-center text-5xl font-bold">
                {weatherInfo?.main.temp} &deg;c
              </div>
              <div className="text-center">{weatherInfo?.weather[0].main}</div>
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
      <Status status={loading} text="Loading..."></Status>
      <Status status={failedFetch} text={`${errText}`}></Status>
    </>
  );
}

export default App;
