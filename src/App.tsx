import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { WeatherTypes } from "./types/type";

function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();
  const api_key: string = apiKey.key;
  const uuid = crypto.randomUUID();

  const geoLocation = async () => {
    await fetch("https://api.techniknews.net/ipgeo/")
      .then((geo) => geo.json())
      .then((data) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${api_key}&units=metric`
        );
      })
      .then((weather) => weather.json())
      .then((data) => {
        console.log(data);

        setWeatherInfo(data);
      });
  };

  const userLang = navigator.language;

  const currentDate = new Date();
  const day = currentDate.toLocaleString(userLang, { weekday: "long" });
  const month = currentDate.toLocaleString(userLang, { month: "long" });
  const date = currentDate.getDate();

  useEffect(() => {
    geoLocation();
  }, []);

  const handleClick = async () => {
    await geoLocation();
  };

  return (
    <>
      <button
        className="bg-gray-50 font-bold px-4 py-1 disabled:bg-slate-600"
        disabled={weatherInfo === undefined || weatherInfo === null}
        onClick={handleClick}
      >
        Get Weather
      </button>
      <div>{weatherInfo?.name}</div>
      <div>
        <span>{day}</span>, &nbsp;
        <span>{month}</span> &nbsp;
        <span>{date}</span>
      </div>
      <div>{weatherInfo?.main.temp}</div>
      {weatherInfo &&
        weatherInfo.weather.map((weather) => (
          <div key={uuid}>
            <div>{weather.description}</div>
            {/* <div className="text">{weather.main}</div> */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
          </div>
        ))}
      <div>
        Wind:&nbsp;
        {weatherInfo?.wind.speed} <abbr title="Kilometers per Hour">km/h</abbr>
      </div>

      {weatherInfo !== undefined && "rain" in weatherInfo && (
        <div>
          {weatherInfo?.rain["1h"]} <abbr title="Milimeter">mm</abbr>
        </div>
      )}
      {weatherInfo !== undefined && "snow" in weatherInfo && (
        <div>
          {weatherInfo?.snow["1h"]} <abbr title="Milimeter">mm</abbr>
        </div>
      )}
    </>
  );
}

export default App;
