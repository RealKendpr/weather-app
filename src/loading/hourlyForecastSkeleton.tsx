export function HourlyForecastSkeleton() {
  return (
    <div className="flex h-[123.867px] min-w-28 flex-shrink-0 flex-grow-0 flex-col items-center gap-y-3 rounded-md border border-slate-600 bg-gray-500 p-2">
      <div className="h-3 w-10 animate-pulse bg-slate-300"></div>
      <div className="size-16 animate-pulse bg-slate-400"></div>
      <div className="h-3 w-14 animate-pulse bg-slate-300"></div>
    </div>
  );
}
