import { weatherIconMap } from "./weatherIcons";

export const getWeatherIcon = (condition) => {
  // Return the icon based on condition text, or the default if not found
  return weatherIconMap[condition] || weatherIconMap["default"];
};
