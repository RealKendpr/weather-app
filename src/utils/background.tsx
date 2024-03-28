import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function Background({ time, tz }: { time: string; tz: string }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const date = dayjs(time).tz(tz);

  const isDay = date.hour() >= 18 ? "night" : "day";

  // const isDay = "day";
  return (
    <div className="fixed z-[-1] w-full">
      <img
        className={
          isDay === "day"
            ? "h-screen w-full object-cover object-[center_left]"
            : " h-screen w-full object-cover object-center"
        }
        src={
          isDay === "day"
            ? "./src/assets/day.jpg"
            : "./src/assets/night-clear.jpg"
        }
        alt=""
      />
    </div>
  );
}
