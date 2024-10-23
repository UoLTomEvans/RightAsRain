import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import { icons } from "../constants";
import InformationWidget from "../components/InformationWidget";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <TopBar />
      <View className="mx-4 flex justify-around flex-1 mb-2">
        {/* Location Details */}
        <Text className="text-white text-center text-2xl font-pbold">
          Liverpool,
          <Text className="text-lg font-psemibold text-gray-300">
            {" "}
            United Kingdom
          </Text>
        </Text>

        {/* Weather Image */}
        <View className="flex-row justify-center">
          <Image
            source={icons.cloud}
            resizeMode="contain"
            className="w-52 h-52"
          />
        </View>

        {/* Temperature & Conditions*/}
        <View className="space-y-2">
          <Text className="text-center font-pbold text-white text-6xl ml-5 py-2">
            12 &#176;C
          </Text>
          <Text className="text-center font-pregular text-white text-xl ml-5 py-2 tracking-widest">
            Partly Cloudy
          </Text>
        </View>

        {/* More information */}
        <View className="flex-row justify-between mx-4">
          {/* Windspeed */}
          <InformationWidget icon={icons.wind} information="12 km/h" />
          {/* Humidity */}
          <InformationWidget icon={icons.drop} information="23%" />
          {/* Sunrise */}
          <InformationWidget icon={icons.sunwhite} information="06:04 AM" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
