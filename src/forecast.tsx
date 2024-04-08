import forecast from "./Data/forecast.json";

export function HourlyForecast({ date }: { date: string | undefined }) {
  const listItem = forecast.list.map((i) => {
    return i;
  });

  const todayDate = date?.split(" ")[0];
  const todayForecast = listItem.filter(
    (i) => i.dt_txt.split(" ")[0] == todayDate,
  );

  return (
    <div className="mt-8">
      <p>
        Today{" "}
        <abbr
          title="Based on U.T.C Coordinated Universal Time"
          // className="rounded-s-full bg-white p-2"
        >
          i
        </abbr>
      </p>
      <div className="flex gap-4 overflow-auto text-center">
        {todayForecast.map((i) => (
          <div key={i.dt} className="bg-slate-300 p-4">
            <div>{i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div>
            <div>{i.main.temp}&deg;c</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* <div>{time(i.dt)  currentHour && time(i.dt) +  ? time(i.dt) : "now"}</div> */
/* <div>{time(i.dt)}</div> */
/* <div>{i.dt_txt.split(" ")[1].split(":")[0] + ":00"}</div> */
