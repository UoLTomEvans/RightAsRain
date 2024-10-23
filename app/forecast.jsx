import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const forecast = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <TopBar />
    </SafeAreaView>
  );
};

export default forecast;
