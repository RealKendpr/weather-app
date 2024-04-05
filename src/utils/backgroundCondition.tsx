import { useContext } from "react";
import { WeatherContext } from "../context/context";

export const BackgroundCondition = (isDay: boolean | undefined) => {
  const weatherInfo = useContext(WeatherContext);
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
