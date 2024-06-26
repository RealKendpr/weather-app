export type WeatherTypes = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  snow: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type TimeZoneTypes = {
  name: string;
  offset: number;
  offset_with_dst: number;
  current_time: string;
  current_time_unix: number;
  is_dst: boolean;
  dst_savings: number;
  dst_exists: boolean;
  dst_start: string;
  dst_end: string;
};

export type GeoDataTypes = {
  longitude: string;
  latitude: string;
  time_zone: {
    name: string;
    current_time: string;
  };
};

export type ForecastDataTypes = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListTypes[];
  city: City;
};

export type ForecastListTypes = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Clouds = {
  all: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type Rain = {
  "3h": number;
};

export type Sys = {
  pod: string;
};

export type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type Coord = {
  lat: number;
  lon: number;
};

// export type ForecastDataTypes = {
//   cod: string;
//   message: number;
//   cnt: number;
//   list: Array<{
//     dt: number;
//     main: {
//       temp: number;
//       feels_like: number;
//       temp_min: number;
//       temp_max: number;
//       pressure: number;
//       sea_level: number;
//       grnd_level: number;
//       humidity: number;
//       temp_kf: number;
//     };
//     weather: Array<{
//       id: number;
//       main: string;
//       description: string;
//       icon: string;
//     }>;
//     clouds: {
//       all: number;
//     };
//     wind: {
//       speed: number;
//       deg: number;
//       gust: number;
//     };
//     visibility: number;
//     pop: number;
//     rain?: {
//       "3h": number;
//     };
//     sys: {
//       pod: string;
//     };
//     dt_txt: string;
//   }>;
//   city: {
//     id: number;
//     name: string;
//     coord: {
//       lat: number;
//       lon: number;
//     };
//     country: string;
//     population: number;
//     timezone: number;
//     sunrise: number;
//     sunset: number;
//   };
// };

// export type GeoDataTypes = {
//   ip: string;
//   continent_code: string;
//   continent_name: string;
//   country_code2: string;
//   country_code3: string;
//   country_name: string;
//   country_name_official: string;
//   country_capital: string;
//   state_prov: string;
//   state_code: string;
//   district: string;
//   city: string;
//   zipcode: string;
//   latitude: string;
//   longitude: string;
//   is_eu: boolean;
//   calling_code: string;
//   country_tld: string;
//   languages: string;
//   country_flag: string;
//   geoname_id: string;
//   isp: string;
//   connection_type: string;
//   organization: string;
//   country_emoji: string;
//   currency: {
//     code: string;
//     name: string;
//     symbol: string;
//   };
//   time_zone: {
//     name: string;
//     offset: number;
//     offset_with_dst: number;
//     current_time: string;
//     current_time_unix: number;
//     is_dst: boolean;
//     dst_savings: number;
//     dst_exists: boolean;
//     dst_start: string;
//     dst_end: string;
//   };
// };
