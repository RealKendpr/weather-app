import { useContext } from "react";
import { IsDayContext } from "../context/context";

export function AdditionalInfo({
  name,
  value,
  unit,
  shortUnit,
}: {
  name: string;
  value: number;
  unit: string;
  shortUnit: string;
}) {
  const IsDay = useContext(IsDayContext);
  return (
    <>
      <p
        data-isDay={IsDay ? "true" : "false"}
        className="data-isDay:text-slate-900 font-medium text-slate-600"
      >
        {name}: &nbsp;{value} &nbsp;<abbr title={unit}>{shortUnit}</abbr>
      </p>
    </>
  );
}
