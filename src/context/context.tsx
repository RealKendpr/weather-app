import { createContext } from "react";
import { WeatherTypes } from "../types/type";

export const WeatherContext = createContext<WeatherTypes | undefined>(
  undefined,
);
