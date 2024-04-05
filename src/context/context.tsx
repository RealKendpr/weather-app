import { createContext } from "react";
import { WeatherTypes } from "../types/type";

export const WeatherContext = createContext<WeatherTypes | null | undefined>(
  undefined,
);
export const IsDayContext = createContext<boolean | undefined>(undefined);
