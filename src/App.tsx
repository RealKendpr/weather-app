import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { WeatherTypes } from "./types/type";

function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();
  const [precipitation, setPrecipitation] = useState<number>();

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
        setWeatherInfo(data);
        "rain" in data
          ? setPrecipitation(data.rain["1h"])
          : "snow" in data
          ? setPrecipitation(data.snow["1h"])
          : null;
      });
  };

  const userLang = navigator.language;

  const currentDate = new Date();
  const day = currentDate.toLocaleString(userLang, { weekday: "long" });
  const month = currentDate.toLocaleString(userLang, { month: "long" });
  const date = currentDate.getDate();

  const amPm = currentDate.getHours() >= 12 ? "pm" : "am";
  // console.log(amPm);
  // const amPm = "pm";

  useEffect(() => {
    geoLocation();
  }, []);

  const handleClick = async () => {
    await geoLocation();
  };

  return (
    <div className="grid h-screen place-items-center w-full">
      <div className="fixed z-[-1]">
        <img
          className={
            amPm === "am"
              ? "object-cover w-full h-screen object-[center_left]"
              : " object-cover w-full h-screen object-center"
          }
          src={
            amPm === "am"
              ? "./src/assets/day.jpg"
              : "./src/assets/night-clear.jpg"
          }
          alt=""
        />
      </div>
      <div>
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
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              />
            </div>
          ))}
        <div>
          <div>
            Wind:&nbsp;
            {weatherInfo?.wind.speed} &nbsp;
            <abbr title="Kilometers per Hour">km/h</abbr>
          </div>
          <div>
            Precipitation: &nbsp;
            {precipitation !== undefined || null ? precipitation : 0} &nbsp;
            <abbr title="Milimeter">mm</abbr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
