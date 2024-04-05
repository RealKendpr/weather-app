import { useContext } from "react";
import { BackgroundCondition } from "./backgroundCondition";
import { IsDayContext } from "../context/context";

export function Background() {
  const IsDay = useContext(IsDayContext);
  return (
    <>
      <div className="fixed z-[-1] h-screen w-full bg-slate-700 opacity-20"></div>
      <div className="fixed z-[-2] w-full">
        <img
          className={" h-screen w-full object-cover object-center"}
          src={`src/assets/backgrounds/${BackgroundCondition(IsDay)}`}
          alt=""
        />
      </div>
    </>
  );
}
