import { icons } from "../constants";

export const weatherIconMap = {
  1000: icons.sun, // Sunny / Clear
  1003: icons.partlycloudy, // Partly cloudy
  1006: icons.cloud, // Cloudy
  1009: icons.cloud, // Overcast
  1030: icons.mist, // Mist
  1063: icons.moderaterain, // Patchy rain nearby
  1066: icons.moderaterain, // Patchy snow nearby
  1069: icons.moderaterain, // Patchy sleet nearby
  1072: icons.moderaterain, // Patchy freezing drizzle nearby
  1087: icons.heavyrain, // Thundery outbreaks in nearby
  1135: icons.mist, // Fog
  1150: icons.moderaterain, // Patchy light drizzle
  1153: icons.moderaterain, // Light drizzle
  1168: icons.moderaterain, // Freezing drizzle
  1171: icons.heavyrain, // Heavy freezing drizzle
  1180: icons.moderaterain, // Patchy light rain
  1183: icons.moderaterain, // Light rain
  1186: icons.moderaterain, // Moderate rain at times
  1189: icons.moderaterain, // Moderate rain
  1192: icons.heavyrain, // Heavy rain at times
  1195: icons.heavyrain, // Heavy rain
  1198: icons.moderaterain, // Light freezing rain
  1201: icons.heavyrain, // Moderate or heavy freezing rain
  1204: icons.moderaterain, // Light sleet
  1207: icons.heavyrain, // Moderate or heavy sleet
  1210: icons.moderaterain, // Patchy light snow
  1213: icons.moderaterain, // Light snow
  1216: icons.moderaterain, // Patchy moderate snow
  1219: icons.moderaterain, // Moderate snow
  1222: icons.heavyrain, // Patchy heavy snow
  1225: icons.heavyrain, // Heavy snow
  1237: icons.heavyrain, // Ice pellets
  1240: icons.moderaterain, // Light rain shower
  1243: icons.heavyrain, // Moderate or heavy rain shower
  1246: icons.heavyrain, // Torrential rain shower
  1273: icons.heavyrain, // Patchy light rain with thunder
  1276: icons.heavyrain, // Moderate or heavy rain with thunder
  1279: icons.moderaterain, // Patchy light snow with thunder
  1282: icons.heavyrain, // Moderate or heavy snow with thunder
  default: icons.warning, // Fallback icon
};
