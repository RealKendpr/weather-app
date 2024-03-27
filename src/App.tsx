import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { WeatherTypes } from "./types/type";
import { AdditionalInfo } from "./utils/additionaInfo";
import { Loading } from "./loading";
import { Buttons } from "./utils/buttons";
import { GeoLocation } from "./geoLocation";
import { WeatherContext } from "./context/context";
import { Background } from "./utils/background";

function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();
  const [loading, setLoading] = useState(false);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const api_key: string = apiKey.key;
  const uuid = crypto.randomUUID();
  const isWeatherInfo = weatherInfo !== undefined || null ? true : false;

  const handleFetch = async () => {
    setLoading(true);
    await fetch("https://api.techniknews.net/ipgeo/")
      .then((geo) => geo.json())
      .then((data) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${api_key}&units=metric`,
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
      });
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const refresh = () => {
    handleFetch();
  };

  // setTimeout(() => {
  //   handleFetch();
  // }, 60000);

  return (
    <div className="grid h-screen w-full place-items-center">
      <Background></Background>
      <WeatherContext.Provider value={weatherInfo}>
        <div className="grid gap-12">
          <GeoLocation></GeoLocation>
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
              title="Wind"
              value={windSpeed}
              unit="Kilometer per Hour"
              shortUnit="km/h"
            ></AdditionalInfo>
            <AdditionalInfo
              title="Precipitation"
              value={precipitation}
              unit="Milimeter"
              shortUnit="mm"
            ></AdditionalInfo>
          </div>
        </div>
      </WeatherContext.Provider>
      <Loading loading={loading}></Loading>
      <Buttons weatherInfo={isWeatherInfo} action={refresh}></Buttons>
    </div>
  );
}

export default App;
