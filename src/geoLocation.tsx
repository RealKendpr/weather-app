import { useContext } from "react";
import { WeatherContext } from "./context/context";

export function GeoLocation({ time }: { time: string }) {
  const userLang = navigator.language;
  const currentDate = new Date(time);
  const day = currentDate.toLocaleString(userLang, { weekday: "long" });
  const month = currentDate.toLocaleString(userLang, { month: "long" });
  const date = currentDate.getDate();

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
