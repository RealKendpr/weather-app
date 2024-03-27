export function Loading({ loading }: { loading: boolean }) {
  return (
    <>
      {loading ? (
        <div className="fixed grid h-screen w-full place-items-center bg-slate-400 text-slate-950 opacity-50">
          <span>
            Loading... <br /> Please Wait
          </span>
        </div>
      ) : null}
    </>
  );
}
