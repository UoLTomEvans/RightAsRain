import { View, Text, Image } from "react-native";
import React from "react";

const DaysWeather = ({ day, value, icon }) => {
  return (
    <View className="flex items-center w-48 rounded-3xl py-3 space-y-1 mr-4 bg-gray-500 m-1">
      <Image source={icon} resizeMode="Contain" className="h-11 w-11" />
      <Text className="text-white">{day}</Text>
      <Text className="text-white text-xl font-psemibold">{value} &#176;C</Text>
    </View>
  );
};

export default DaysWeather;
