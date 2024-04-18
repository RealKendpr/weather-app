import { useRef, useEffect } from "react";
import { RefObject } from "react";
import { Buttons } from "./buttons";
// import { HeaderSkeleton } from "../loading/headerSkeleton";

export function Header({
  isWeatherInfo,
  refresh,
  mainHeight,
  setMainHeight,
  // status,
}: {
  isWeatherInfo: boolean;
  refresh: () => void;
  mainHeight: number;
  setMainHeight: React.Dispatch<React.SetStateAction<number>>;
  // status: string;
}) {
  const header: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMainHeightResize = () => {
      const headerHeight = header?.current?.clientHeight;
      setMainHeight(window.innerHeight - (headerHeight || 0));
    };
    window.addEventListener("resize", handleMainHeightResize);
    handleMainHeightResize();
    return () => {
      window.removeEventListener("resize", handleMainHeightResize);
    };
  }, [mainHeight, header]);
  return (
    <header
      ref={header}
      className="flex w-full items-center justify-between bg-slate-600 px-2 py-2 md:col-span-2"
    >
      {/* {status == "Loading" ? (
        <HeaderSkeleton />
      ) : (
        <> */}
      <h1 className="text-lg font-bold text-slate-200">Simple Weather App</h1>
      <Buttons weatherInfo={isWeatherInfo} action={refresh}></Buttons>
      {/* </> */}
      {/* )} */}
    </header>
  );
}
