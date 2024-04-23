/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: "Inter, sans-serif",
      },
    },
    data: {
      isday: 'isday="true"',
      error: 'error="true"',
      nowindicator: 'nowindicator="now"',
      forecastloading: 'forecastloading="true"',
    },
  },
  plugins: [],
};
