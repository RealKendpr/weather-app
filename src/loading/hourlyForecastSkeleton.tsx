export function HourlyForecastSkeleton() {
  return (
    <div className="flex h-32 w-28 flex-col items-center gap-y-3 rounded-md border border-slate-600 bg-gray-500 px-2 py-4">
      <div className="h-3 w-10 animate-pulse bg-slate-300"></div>
      <div className="size-16 animate-pulse bg-slate-400"></div>
      <div className="h-3 w-14 animate-pulse bg-slate-300"></div>
    </div>
  );
}
