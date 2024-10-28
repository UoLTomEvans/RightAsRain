import React, { createContext, useState, useContext } from "react";

// Create the context
const LoadingContext = createContext();

// Create a provider component
export const LoadingProvider = ({ children }) => {
  const [loadStatus, setLoadStatus] = useState(true);

  return (
    <LoadingContext.Provider value={{ loadStatus, setLoadStatus }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useLoad = () => useContext(LoadingContext);
