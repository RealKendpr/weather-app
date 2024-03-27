import { useContext } from "react";
import { WeatherContext } from "./context/context";

export function GeoLocation({ time }: { time: Date }) {
  const userLang = navigator.language;
  const day = time.toLocaleString(userLang, { weekday: "long" });
  const month = time.toLocaleString(userLang, { month: "long" });
  const date = time.getDate();

  const weatherInfo = useContext(WeatherContext);

  return (
    <div>
      <div className="text-2xl font-bold">{weatherInfo?.name}</div>
      <div className="text-sm font-semibold">
        <span>{day}</span>, &nbsp;
        <span>{month}</span> &nbsp;
        <span>{date}</span>
      </div>
    </div>
  );
}
