export function Status({ status, text }: { status: string; text: string }) {
  return (
    <>
      {status !== "Ok" ? (
        <div className="fixed left-0 top-0 z-50 grid h-screen w-full place-items-center bg-slate-900 text-xl font-medium text-slate-400 opacity-60">
          <span>{text}</span>
        </div>
      ) : null}
    </>
  );
}
