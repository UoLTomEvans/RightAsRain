import { View, Text, Image } from "react-native";
import React from "react";

const InformationWidget = ({ icon, information }) => {
  return (
    <View className="flex-row space-x-2 items-center">
      <Image source={icon} className="h-6 w-6" />
      <Text className="text-white font-psemibold text-base">{information}</Text>
    </View>
  );
};

export default InformationWidget;
