import { useContext } from "react";
import { IsDayContext } from "../context/context";
import { AdditionalInfoSkeleton } from "../loading";

export function AdditionalInfo({
  name,
  value,
  unit,
  shortUnit,
  loading,
}: {
  name: string;
  value: number;
  unit: string;
  shortUnit: string;
  loading: boolean;
}) {
  const IsDay = useContext(IsDayContext);

  return (
    <>
      {loading ? (
        <AdditionalInfoSkeleton />
      ) : (
        <p
          data-isday={IsDay ? "true" : "false"}
          className="font-display font-medium text-slate-300 data-isday:text-slate-900"
        >
          {name}:&nbsp;{value}&nbsp;
          <abbr title={unit}>{shortUnit}</abbr>
        </p>
      )}
    </>
  );
}
