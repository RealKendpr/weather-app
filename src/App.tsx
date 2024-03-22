import { useEffect, useState } from "react";

function App() {
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();
  const [weatherInfo, setWeatherInfo] = useState();
  const api_key = "";

  const geoLocation = async () => {
    await fetch("https://api.techniknews.net/ipgeo/")
      .then((geo) => geo.json())
      .then((data) => {
        // setLatitude(data.lat);
        // setLongitude(data.lon);
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${api_key}`
        );
      })
      // .then(() =>
      // )
      .then((weather) => weather.json())
      .then((data) => setWeatherInfo(data));
  };

  useEffect(() => {
    geoLocation();
  }, []);

  console.log(weatherInfo);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch("https://api.techniknews.net/ipgeo/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setLatitude(data.lat);
  //         setLongitude(data.lon);
  //       })
  //       .catch((err) => console.error(err));
  //   };
  //   fetchData();
  // }, []);
  // console.log(latitude);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch("https://api.com/param/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.value);
  //         setData(data.value);
  //       })
  //       .catch((err) => console.error(err));
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const getGeo = await fetch("https://api.techniknews.net/ipgeo/");
  //       const geo = await getGeo.json();
  //       setLatitude(geo.lat);
  //       setLongitude(geo.lon);

  //      latitude && longitude !== undefined {
  //       const getWeather = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
  //       );
  //       const weather = await getWeather.json();

  //       console.log(weather);
  //     }} catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return <></>;
}

export default App;
