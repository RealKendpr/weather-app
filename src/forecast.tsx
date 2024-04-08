import forecast from "./Data/forecast.json";
export function HourlyForecast({
  date,
  currentHour,
}: {
  date: string | undefined;
  currentHour: number | undefined;
}) {
  const listItem = forecast.list.map((i) => {
    return i;
  });

  const todayDate = date?.split(" ")[0];
  const todayForecast = listItem.filter(
    (i) => i.dt_txt.split(" ")[0] == todayDate,
  );

  const time = listItem.map((i) => i.dt);
  // console.log(time[0] + " 2");
  // console.log(date);

  return (
    <div className="mt-8">
      <p>Today</p>
      <div className="flex gap-4 overflow-auto text-center">
        {todayForecast.map((i) => (
          <div key={i.dt} className="bg-slate-300 p-4">
            {/* <div>
              {i.dt_txt.split(" ")[1].split(":")[0] == currentHour?.toString()
                ? "now"
                : i.dt_txt.split(" ")[1].split(":")[0] + ":00"}
            </div> */}
            <div>{i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div>
            <div>{i.main.temp}&deg;c</div>
            {/* {i.visibility} */}
          </div>
        ))}
      </div>
    </div>
  );
}
