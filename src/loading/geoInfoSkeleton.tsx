export function GeoInfoSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-[repeat(2,_min-content)] grid-rows-[min-content] gap-x-4 gap-y-3">
      <div className="col-span-2 h-7 w-40 bg-slate-300"></div>
      <div className="row-start-2 h-5 w-24 bg-slate-300"></div>
      <div className="row-start-2 h-5 w-20 bg-slate-300"></div>
    </div>
  );
}
