import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../constants";

const ErrorDisplay = ({ message }) => {
  // Map error codes to custom messages
  const errorMessages = {
    403: "Unable to connect to weather data. Please check your internet connection and try again.",
    404: "Requested resource was not found. Please verify the URL or try a different request.",
    500: "Server encountered an error. Please try again later.",
    401: "Unauthorized access. Please check your credentials and try again.",
    "Request failed with status code 400":
      "Unable to retrieve a default location. Please search for a new location.",
  };

  const displayMessage =
    Object.entries(errorMessages).find(([code]) =>
      message.includes(code)
    )?.[1] || message;

  return (
    <View className="flex items-center justify-center p-6 bg-red-100 rounded-lg">
      <Image source={icons.warning} className="w-12 h-12 mb-4" />
      <Text className="text-red-600 text-lg font-semibold text-center">
        {displayMessage}
      </Text>
    </View>
  );
};

export default ErrorDisplay;
