export function Status({ status, text }: { status: boolean; text: string }) {
  return (
    <>
      {status ? (
        <div className="fixed left-0 top-0 z-50 grid h-screen w-full place-items-center bg-slate-400 text-slate-950 opacity-50">
          <span>{text}</span>
        </div>
      ) : null}
    </>
  );
}
