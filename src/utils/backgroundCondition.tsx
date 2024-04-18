import { useContext } from "react";
import { WeatherContext } from "../context/context";

export const BackgroundCondition = (isDay: boolean | undefined) => {
  const weatherInfo = useContext(WeatherContext);
  const weatherStatus = weatherInfo?.weather[0].main;

  switch (isDay) {
    case true:
      switch (weatherStatus) {
        case "Clouds":
          return "clouds-day-min.jpg";
        case "Clear":
          return "clear-day-min.jpg";
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
          return "atmosphere-min.jpg";
        case "Snow":
          return "snow-day-min.jpg";
        case "Rain":
          return "rain-day-min.jpg";
        case "Drizzle":
          return "drizzle-min.jpg";
        case "Thunderstorm":
          return "thunderstorm-min.jpg";
      }
      break;
    case false:
      switch (weatherStatus) {
        case "Clouds":
          return "clouds-night-min.jpg";
        case "Clear":
          return "clear-night-min.jpg";
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
          return "atmosphere-min.jpg";
        case "Snow":
          return "snow-night-min.jpg";
        case "Rain":
          return "rain-night-min.jpg";
        case "Drizzle":
          return "drizzle-min.jpg";
        case "Thunderstorm":
          return "thunderstorm-min.jpg";
      }
  }
};
