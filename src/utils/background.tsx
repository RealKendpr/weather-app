import { useContext } from "react";
import { BackgroundCondition } from "./backgroundCondition";
import { IsDayContext } from "../context/context";

export function Background() {
  const IsDay = useContext(IsDayContext);
  return (
    <>
      <div className="fixed z-[-2] h-screen w-full">
        <div
          data-isday={IsDay ? "true" : "false"}
          className="fixed h-full w-full bg-slate-800 opacity-50 data-isday:opacity-20"
        ></div>
        <img
          className="pointer-events-none h-full w-full select-none object-cover object-center"
          src={`./src/assets/backgrounds/${BackgroundCondition(IsDay)}`}
          alt=""
        />
      </div>
    </>
  );
}
