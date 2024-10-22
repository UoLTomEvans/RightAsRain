import { View, Text } from "react-native";
import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const forecast = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <TopBar />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default forecast;
