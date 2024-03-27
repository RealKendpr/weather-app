export function Background() {
  // const currentDate = new Date();
  // const isDay = currentDate.getHours() >= 18 ? "night" : "day";

  const isDay = "day";
  return (
    <div className="fixed z-[-1] w-full">
      <img
        className={
          isDay === "day"
            ? "h-screen w-full object-cover object-[center_left]"
            : " h-screen w-full object-cover object-center"
        }
        src={
          isDay === "day"
            ? "./src/assets/day.jpg"
            : "./src/assets/night-clear.jpg"
        }
        alt=""
      />
    </div>
  );
}
