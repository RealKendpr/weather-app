export function Buttons({
  weatherInfo,
  action,
}: {
  weatherInfo: boolean;
  action: any;
}) {
  return (
    <button
      className="absolute bottom-5 right-5 bg-gray-50 px-4 py-1 font-bold disabled:bg-slate-600"
      disabled={weatherInfo === false}
      onClick={action}
    >
      Refresh
    </button>
  );
}
