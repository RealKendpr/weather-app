import { useEffect, useRef } from "react";
import { RefObject } from "react";

export function Status({ error, text }: { error: boolean; text: string }) {
  const errorModal: RefObject<HTMLDialogElement> =
    useRef<HTMLDialogElement>(null);

  useEffect(() => {
    error ? errorModal.current?.showModal() : errorModal.current?.close();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") e.preventDefault();
    };
    error
      ? addEventListener("keydown", handleKeyDown)
      : removeEventListener("keydown", handleKeyDown);
  }, [error]);

  return (
    <dialog
      ref={errorModal}
      className="min-h-44 min-w-[300px] rounded-lg bg-slate-900 px-3 py-5 text-lg font-medium text-slate-400"
      title="Error Dialog Box"
    >
      <div className="mb-5 flex items-center gap-x-3">
        <div className="size-10">
          <svg
            className="min-h-full min-w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              className="fill-orange-500"
              fill="currentColor"
              d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8m1 13h-2v-2h2zm0-4h-2V7h2z"
              opacity={0.3}
            ></path>
            <path
              className="fill-orange-600"
              fill="currentColor"
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m-1-5h2v2h-2zm0-8h2v6h-2z"
            ></path>
          </svg>
        </div>
        <h1 className="font-bold">An Error Occured</h1>
      </div>
      <p>{text}</p>
    </dialog>
  );
}
