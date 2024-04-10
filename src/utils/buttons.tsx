export function Buttons({
  weatherInfo,
  action,
}: {
  weatherInfo: boolean;
  action: any;
}) {
  return (
    <button
      className="fixed right-5 top-5 grid size-8 place-items-center rounded-full bg-gray-300 p-2 font-bold disabled:opacity-50"
      disabled={weatherInfo === false}
      onClick={action}
    >
      <svg
        className="max-w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        aria-labelledby="refresh`"
      >
        <title id="refresh">Refresh Buttton</title>
        <path
          className="fill-slate-900 data-isday:fill-slate-300"
          fill="currentColor"
          d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
        ></path>
      </svg>
    </button>
  );
}
