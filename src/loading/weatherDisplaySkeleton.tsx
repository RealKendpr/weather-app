export function WeatherDisplaySkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center gap-y-8">
      <div className="h-16 w-72 bg-slate-300"></div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-x-2">
          <div className="size-4 bg-slate-300"></div>
          <div className="h-4 w-16 bg-slate-300"></div>
          <div className="h-4 w-16 bg-slate-300"></div>
        </div>
        <div className="h-4 w-20 bg-slate-300"></div>
      </div>
    </div>
  );
}
