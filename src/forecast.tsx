import forecast from "./Data/forecast.json";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function HourlyForecast({
  date,
  time_zone,
  currentHour,
}: {
  date: string | undefined;
  time_zone: string | undefined;
  currentHour: number | undefined;
}) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const listItem = forecast.list.map((i) => {
    return i;
  });

  const todayDate = date?.split(" ")[0];
  const todayForecast = listItem.filter(
    (i) => i.dt_txt.split(" ")[0] == todayDate,
  );
  console.log(currentHour);

  // const time = () =>
  //   todayForecast.map((i) =>
  //     dayjs(i.dt * 1000)
  //       .tz(time_zone)
  //       .hour(),
  //   );

  const time = (id: number) => {
    const x = dayjs(id * 1000)
      .tz(time_zone)
      .hour();
    return x;
  };
  console.log(listItem);
  console.log(todayForecast);

  // const time1 = listItem.map((i) => {
  //   const x = new Date(i.dt * 1000);
  //   return x;
  // });
  // console.log(time1);
  // const time = (dt_num: number) => {
  //   // const test = listItem.filter((i) => i.dt == dt_num);
  //   todayForecast.map((i) => {
  //     dayjs(i.dt * 1000)
  //       .tz(time_zone)
  //       .hour();
  //   });
  //   // dayjs(dt_num).tz(time_zone).hour();
  //   // test.map

  //   // return test;
  // };

  // console.log(time(1712545200));

  // console.log(time[0] + " 2");
  // console.log(date);

  return (
    <div className="mt-8">
      <p>Today</p>
      <div className="flex gap-4 overflow-auto text-center">
        {todayForecast.map((i) => (
          <div key={i.dt} className="bg-slate-300 p-4">
            {/* <div>{time(i.dt) == currentHour ? "now" : time(i.dt)}</div> */}
            <div>{time(i.dt) + ":00"}</div>
            <div>{i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div>
            <div>{i.main.temp}&deg;c</div>
            {/* {i.visibility} */}
          </div>
        ))}
      </div>
    </div>
  );
}
