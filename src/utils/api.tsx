import { GeoDataTypes, WeatherTypes } from "../types/type";

export const fetchGeo = async (
  setErrText: React.Dispatch<React.SetStateAction<string>>,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  setGeoInfo: React.Dispatch<
    React.SetStateAction<GeoDataTypes | null | undefined>
  >,
) => {
  const geoKey: string = import.meta.env.VITE_GEO_KEY;

  try {
    const geoResponse = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${geoKey}`,
    );
    if (geoResponse.ok) {
      const {
        longitude,
        latitude,
        time_zone: { name, current_time },
      } = await geoResponse.json();

      const geoData = {
        longitude,
        latitude,
        time_zone: { name, current_time },
      };

      setGeoInfo(geoData);
      return geoData;
    } else if (geoResponse.status === 429) {
      throw new Error(
        "The data request limit of this application has exceeded",
      );
    } else {
      throw new Error("Failed To Establish Your Area");
    }
  } catch (err) {
    setErrText(err instanceof Error ? err.message : (err as string));
    setStatus("Error");
  }
};

export const fetchWeather = async (
  latitude: string,
  longitude: string,
  setWeatherInfo: React.Dispatch<
    React.SetStateAction<WeatherTypes | null | undefined>
  >,
  setPrecipitation: React.Dispatch<React.SetStateAction<number>>,
  setWindSpeed: React.Dispatch<React.SetStateAction<number>>,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  setErrText: React.Dispatch<React.SetStateAction<string>>,
) => {
  const weatherKey: string = import.meta.env.VITE_WEATHER_KEY;
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
      setStatus("Ok");
    } else {
      throw new Error("Failed To Fetch The Weather Information");
    }
  } catch (err) {
    setErrText(err instanceof Error ? err.message : (err as string));
    setStatus("Error");
  }
};

export const fetchForecast = async (latitude: string, longitude: string) => {
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  const weatherKey: string = import.meta.env.VITE_WEATHER_KEY;
  try {
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`,
    );
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      return forecastData;
    }
  } catch (error) {}
};
