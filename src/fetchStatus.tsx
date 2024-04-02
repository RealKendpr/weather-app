export function Status({ status, text }: { status: string; text: string }) {
  console.log(status);

  return (
    <>
      {status !== "Ok" ? (
        <div className="fixed left-0 top-0 z-50 grid h-screen w-full place-items-center bg-slate-400 text-slate-950 opacity-50">
          <span>{text}</span>
        </div>
      ) : null}
    </>
  );
}
