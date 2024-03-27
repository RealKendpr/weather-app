export function Loading({ loading }: { loading: boolean }) {
  return (
    <>
      {loading ? (
        <div className="fixed left-0 top-0 z-50 grid h-screen w-full place-items-center bg-slate-400 text-slate-950 opacity-50">
          <span>
            Loading... <br /> Please Wait
          </span>
        </div>
      ) : null}
    </>
  );
}
