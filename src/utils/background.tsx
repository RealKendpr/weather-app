export function Background({ isDay }: { isDay: boolean }) {
  return (
    <div className="fixed z-[-1] w-full">
      <img
        className={
          isDay === true
            ? "h-screen w-full object-cover object-[center_left]"
            : " h-screen w-full object-cover object-center"
        }
        src={
          isDay === true
            ? "./src/assets/day.jpg"
            : "./src/assets/night-clear.jpg"
        }
        alt=""
      />
    </div>
  );
}
