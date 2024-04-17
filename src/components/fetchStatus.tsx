export function Status({ status, text }: { status: string; text: string }) {
  return (
    <>
      <div
        data-isnotok={text != null && status !== "Ok" ? "true" : "false"}
        className="data-isnotok:grid data-isnotok:z-50 fixed left-0 top-0 -z-50  hidden h-screen w-full place-items-center bg-slate-900 text-xl font-medium text-slate-400 opacity-60"
      >
        <span>{text}</span>
      </div>
    </>
  );
}
