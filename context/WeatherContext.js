import React, { createContext, useState, useContext } from "react";

// Create the context
const WeatherContext = createContext();

// Create a provider component
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useWeather = () => useContext(WeatherContext);
