import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../constants"; // Ensure you have an error icon in your icons setup

const ErrorDisplay = ({ message }) => {
  return (
    <View className="flex items-center justify-center p-6 bg-red-100 rounded-lg">
      <Image source={icons.warning} className="w-12 h-12 mb-4" />
      <Text className="text-red-600 text-lg font-psemibold">{message}</Text>
    </View>
  );
};

export default ErrorDisplay;
