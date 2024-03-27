export function AdditionalInfo({
  title,
  value,
  unit,
  shortUnit,
}: {
  title: string;
  value: number;
  unit: string;
  shortUnit: string;
}) {
  return (
    <>
      <p>
        {title}: &nbsp;{value} &nbsp;<abbr title={unit}>{shortUnit}</abbr>
      </p>
    </>
  );
}
