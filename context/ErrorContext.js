import React, { createContext, useState, useContext } from "react";

// Create the context
const ErrorContext = createContext();

// Create a provider component
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useError = () => useContext(ErrorContext);
