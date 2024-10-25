import { icons } from "../constants";

export const weatherIconMap = {
  "Partly cloudy": icons.partlycloudy,
  "Partly Cloudy": icons.partlycloudy,
  "Moderate rain": icons.moderaterain,
  "Patch rain possible": icons.moderaterain,
  Sunny: icons.sun,
  Clear: icons.sun,
  Overcast: icons.cloud,
  Cloudy: icons.cloud,
  "Light rain": icons.moderaterain,
  "Moderate rain at times": icons.moderaterain,
  "Patchy rain nearby": icons.moderaterain,
  "Heavy rain": icons.heavyrain,
  "Heavy rain at times": icons.heavyrain,
  "Moderate or heavy freezing rain": icons.heavyrain,
  "Moderate or heavy rain shower": icons.heavyrain,
  "Moderate or heavy rain with thunder": icons.heavyrain,
  default: icons.warning, // Fallback icon
};
