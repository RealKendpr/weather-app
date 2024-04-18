export function DaysForecastSkeleton() {
  return (
    <div className="relative grid w-full animate-pulse grid-cols-3 items-center justify-items-center px-2 pb-8 pt-4 text-gray-400 after:absolute after:bottom-0 after:h-px after:w-full after:bg-white after:opacity-20 after:content-['']">
      <div className="h-3 w-[10ch] justify-self-start bg-slate-300"></div>
      <div className="flex items-center gap-1 justify-self-start">
        <div className="size-7 bg-slate-400"></div>
        <div className="h-3 w-[10ch] bg-slate-300"></div>
      </div>
      <div className="h-8 w-[7ch] justify-self-end bg-slate-300"></div>
    </div>
  );
}
