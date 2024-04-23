import { useRef, useEffect } from "react";
import { RefObject } from "react";
import { Buttons } from "./buttons";

export function Header({
  isWeatherInfo,
  refresh,
  mainHeight,
  setMainHeight,
  setHeaderHeight,
}: {
  isWeatherInfo: boolean;
  refresh: () => void;
  mainHeight: number;
  setMainHeight: React.Dispatch<React.SetStateAction<number>>;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const header: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHeightResize = async () => {
      const headerHeight = header?.current?.clientHeight;
      setHeaderHeight(headerHeight as number);
      setMainHeight(window.innerHeight - (headerHeight || 0));
    };
    window.addEventListener("resize", handleHeightResize);
    handleHeightResize();
    return () => {
      window.removeEventListener("resize", handleHeightResize);
    };
  }, [mainHeight, header]);

  return (
    <header
      ref={header}
      className="flex w-full items-center justify-between bg-slate-600 px-2 py-2 lg:fixed lg:z-50 lg:col-span-2"
    >
      <h1 className="font-display text-lg font-bold text-slate-200">
        Simple Weather App
      </h1>
      <Buttons
        isWeatherInfo={isWeatherInfo}
        action={refresh}
        type="normal-refresh"
      ></Buttons>
    </header>
  );
}
