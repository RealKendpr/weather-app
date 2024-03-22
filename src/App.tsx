import { useEffect, useState } from "react";
import apiKey from "./Data/api_key.json";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();
  const api_key = apiKey.key;

  useEffect(() => {
    const geoLocation = async () => {
      await fetch("https://api.techniknews.net/ipgeo/")
        .then((geo) => geo.json())
        .then((data) => {
          return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${api_key}`
          );
        })
        .then((weather) => weather.json())
        .then((data) => setWeatherInfo(data));
    };

    geoLocation();
  }, []);

  console.log(weatherInfo);

  return <></>;
}

export default App;
