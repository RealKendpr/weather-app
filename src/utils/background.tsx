import { useContext } from "react";
import { WeatherContext } from "../context/context";

export function Background({ isDay }: { isDay: boolean }) {
  const weatherInfo = useContext(WeatherContext);

  const condition = () => {
    const weatherStatus = weatherInfo?.weather[0].main;

    switch (isDay) {
      case true:
        switch (weatherStatus) {
          case "Clouds":
            return "clouds-day.jpg";
          case "Clear":
            return "clear-day.jpg";
          case "Atmosphere":
          case "Mist":
          case "Smoke":
          case "Haze":
          case "Dust":
          case "Fog":
          case "Sand":
          case "Ash":
          case "Squail":
          case "Tornado":
            return "atmosphere.jpg";
          case "Snow":
            return "snow-day.jpg";
          case "Rain":
            return "rain-day.jpg";
          case "Drizzle":
            return "drizzle.jpg";
          case "Thunderstorm":
            return "thunderstorm.jpg";
        }
        break;
      case false:
        switch (weatherStatus) {
          case "Clouds":
            return "clouds-night.jpg";
          case "Clear":
            return "clear-night.jpg";
          case "Atmosphere":
          case "Mist":
            return "atmosphere.jpg";
          case "Snow":
            return "snow-night.jpg";
          case "Rain":
            return "rain-night.jpg";
          case "Drizzle":
            return "drizzle.jpg";
          case "Thunderstorm":
            return "thunderstorm.jpg";
        }
    }
  };

  return (
    <div className="fixed z-[-1] w-full">
      <img
        className={" h-screen w-full object-cover object-center"}
        src={`src/assets/backgrounds/${condition()}`}
        alt=""
      />
    </div>
  );
}
