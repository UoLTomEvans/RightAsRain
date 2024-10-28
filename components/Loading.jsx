import { View, Text } from "react-native";
import React from "react";
import { CircleSnail } from "react-native-progress";

const Loading = () => {
  return (
    <View className="flex-1 flex-row justify-center items-center">
      <CircleSnail thickness={10} size={140} color="#FFA001" />
    </View>
  );
};

export default Loading;
