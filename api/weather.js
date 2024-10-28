import axios from "axios";
// import { API_KEY } from "@env";
let API_KEY = "33be602650f140d9b7d154434242310";

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.query}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.query}`;

const apiCall = async (endpoint, setError) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    setError(null);
    return response.data;
  } catch (err) {
    setError(err.message); // Sets the error in global state for app-wide access
    return { error: err.message };
  }
};

export const fetchWeatherForecast = (params, setError) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl, setError);
};

export const fetchLocations = (params, setError) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl, setError);
};
