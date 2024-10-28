import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../constants";

const ErrorDisplay = ({ message }) => {
  const displayMessage = message.includes("403")
    ? "Unable to connect to weather data. Please check your internet connection and try again."
    : message;

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
