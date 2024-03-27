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
  return (
    <>
      <p>
        {name}: &nbsp;{value} &nbsp;<abbr title={unit}>{shortUnit}</abbr>
      </p>
    </>
  );
}
