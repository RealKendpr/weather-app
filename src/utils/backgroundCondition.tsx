import { useContext } from "react";
import { WeatherContext } from "../context/context";

export const BackgroundCondition = (isDay: boolean | undefined) => {
  const weatherInfo = useContext(WeatherContext);
  const weatherStatus = weatherInfo?.weather[0].main;

  switch (isDay) {
    case true:
      switch (weatherStatus) {
        case "Clouds":
          return "clouds-day-min.avif";
        case "Clear":
          return "clear-day-min.avif";
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
          return "atmosphere-min.avif";
        case "Snow":
          return "snow-day-min.avif";
        case "Rain":
          return "rain-day-min.avif";
        case "Drizzle":
          return "drizzle-min.avif";
        case "Thunderstorm":
          return "thunderstorm-min.avif";
      }
      break;
    case false:
      switch (weatherStatus) {
        case "Clouds":
          return "clouds-night-min.avif";
        case "Clear":
          return "clear-night-min.avif";
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
          return "atmosphere-min.avif";
        case "Snow":
          return "snow-night-min.avif";
        case "Rain":
          return "rain-night-min.avif";
        case "Drizzle":
          return "drizzle-min.avif";
        case "Thunderstorm":
          return "thunderstorm-min.avif";
      }
  }
};
