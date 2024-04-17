import { WeatherTypes } from "../types/type";

export function WeatherDisplay({
  isDay,
  weatherInfo,
}: {
  isDay: boolean;
  weatherInfo: WeatherTypes | null;
}) {
  return (
    <div>
      <h3
        data-isday={isDay ? "true" : "false"}
        className="text-center font-display text-[5.5rem] font-bold leading-tight text-slate-200 data-isday:text-slate-900"
      >
        {weatherInfo?.main.temp}&deg;c
      </h3>
      <div className="flex flex-col items-center">
        <div
          data-isday={isDay ? "true" : "false"}
          className="flex items-center gap-1 font-display text-xl font-semibold text-slate-200 data-isday:text-slate-900"
        >
          <span>
            <svg
              aria-labelledby="max-min"
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <title id="max-min">Minimum to Maximum Temperature</title>
              <path
                data-isday={isDay ? "true" : "false"}
                className="stroke-slate-300 data-isday:stroke-slate-900"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 20V10m0 10l-3-3m3 3l3-3m5-13v10m0-10l3 3m-3-3l-3 3"
              ></path>
            </svg>
          </span>
          <div>
            {weatherInfo?.main.temp_min === weatherInfo?.main.temp_max ? (
              <>{weatherInfo?.main.temp_max}&deg;</>
            ) : (
              <>
                {weatherInfo?.main.temp_min}&deg; &mdash;{" "}
                {weatherInfo?.main.temp_max}&deg;
              </>
            )}
          </div>
        </div>
        <div
          data-isday={isDay ? "true" : "false"}
          className="font-display text-xl font-semibold text-slate-200 data-isday:text-slate-900"
        >
          {weatherInfo?.weather[0].main}
        </div>
      </div>
    </div>
  );
}
