import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import { icons } from "../constants";
import InformationWidget from "../components/InformationWidget";
import ErrorDisplay from "../components/ErrorDisplay";
import { useWeather } from "../context/WeatherContext";
import { useError } from "../context/ErrorContext";
import { getWeatherIcon } from "../utils/getWeatherIcons";

const Home = () => {
  const { weather } = useWeather(); // Access the global weather state
  const { error } = useError(); // Access the global error state

  // If there's an error, render ErrorDisplay
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <StatusBar backgroundColor="#161622" style="light" />
        <ErrorDisplay message={error} />
      </SafeAreaView>
    );
  }

  // Extract weather details if no error
  const { current, location } = weather;

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <TopBar />

      <View className="mx-4 flex justify-around flex-1 mb-2">
        {/* Location Details */}
        <Text className="text-white text-center text-2xl font-pbold">
          {location?.name},
          <Text className="text-lg font-psemibold text-secondary-100">
            {" "}
            {location?.country}
          </Text>
        </Text>

        {/* Weather Image */}
        <View className="flex-row justify-center">
          <Image
            source={getWeatherIcon(current?.condition?.text)}
            resizeMode="contain"
            className="w-52 h-52"
          />
        </View>

        {/* Temperature & Conditions*/}
        <View className="space-y-2">
          <Text className="text-center font-pbold text-white text-6xl ml-5 py-2">
            {current?.temp_c} &#176;C
          </Text>
          <Text className="text-center font-pregular text-white text-xl ml-5 py-2 tracking-widest">
            {current?.condition?.text}
          </Text>
        </View>

        {/* More information */}
        <View className="flex-row justify-between mx-4">
          {/* Windspeed */}
          <InformationWidget
            icon={icons.wind}
            information={`${current?.wind_kph} km/h`}
          />
          {/* Humidity */}
          <InformationWidget
            icon={icons.drop}
            information={`${current?.humidity}%`}
          />
          {/* Sunrise */}
          <InformationWidget icon={icons.sunwhite} information="06:04 AM" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
