/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // display: "Poppins, sans-serif",
        display: "Inter, sans-serif",
      },
    },
    data: {
      isday: 'isday="true"',
      isnotok: 'isnotok="true"',
      nowindicator: 'nowindicator="now"',
    },
  },
  plugins: [],
};
