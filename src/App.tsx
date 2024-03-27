import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";
import { WeatherTypes } from "./types/type";

function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();
  const [precipitation, setPrecipitation] = useState<number>();
  const [loading, setLoading] = useState(false);

  const api_key: string = apiKey.key;
  const uuid = crypto.randomUUID();

  const userLang = navigator.language;

  const currentDate = new Date();
  const day = currentDate.toLocaleString(userLang, { weekday: "long" });
  const month = currentDate.toLocaleString(userLang, { month: "long" });
  const date = currentDate.getDate();

  const amPm = currentDate.getHours() >= 12 ? "pm" : "am";
  // const amPm = "pm";

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
            : setPrecipitation(0);
      });
    setLoading(false);
  };

  useEffect(() => {
    // fetchData();
    handleFetch();
  }, []);

  const refresh = () => {
    handleFetch();
  };

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="fixed z-[-1] w-full">
        <img
          className={
            amPm === "am"
              ? "h-screen w-full object-cover object-[center_left]"
              : " h-screen w-full object-cover object-center"
          }
          src={
            amPm === "am"
              ? "./src/assets/day.jpg"
              : "./src/assets/night-clear.jpg"
          }
          alt=""
        />
      </div>
      <div className="grid gap-16">
        <div>
          <div className="text-2xl font-bold">{weatherInfo?.name}</div>
          <div className="text-sm font-semibold">
            <span>{day}</span>, &nbsp;
            <span>{month}</span> &nbsp;
            <span>{date}</span>
          </div>
        </div>
        <div>
          <div className="text-center text-5xl font-bold">
            {weatherInfo?.main.temp} &deg;c
          </div>
          {weatherInfo &&
            weatherInfo.weather.map((weather) => (
              <div key={uuid}>
                <div className="text-center">{weather.description}</div>
                {/* <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              /> */}
              </div>
            ))}
        </div>
        <div className="flex gap-4">
          <div>
            Wind:&nbsp;
            {weatherInfo?.wind.speed} &nbsp;
            <abbr title="Kilometers per Hour">km/h</abbr>
          </div>
          <div>
            Precipitation: &nbsp;
            {precipitation} &nbsp;
            <abbr title="Milimeter">mm</abbr>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="fixed grid h-screen w-full place-items-center bg-slate-400 text-slate-950">
          <span>
            Loading... <br /> Please Wait
          </span>
        </div>
      ) : null}
      <button
        className="bg-gray-50 px-4 py-1 font-bold disabled:bg-slate-600"
        disabled={weatherInfo === undefined || weatherInfo === null}
        onClick={refresh}
      >
        Refresh
      </button>
    </div>
  );
}

export default App;
