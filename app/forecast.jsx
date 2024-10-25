import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import DaysWeather from "../components/DaysWeather";
import { useWeather } from "../context/WeatherContext";
import { getWeatherIcon } from "../utils/getWeatherIcons";

const Forecast = () => {
  const { weather } = useWeather(); // Access the global weather state

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <TopBar />

      <View className="mb-2 space-y-3 mt-5 items-center">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Map through forecast to render DaysWeather components */}
          {weather?.forecast?.forecastday?.map((item, index) => {
            let date = new Date(item.date);
            let options = { weekday: "long" };
            let dayName = date.toLocaleDateString("en-UK", options);

            return (
              <DaysWeather
                key={index}
                day={dayName}
                // value={item?.day?.avgtemp_c}
                value={item?.day?.condition?.text}
                icon={getWeatherIcon(item?.day?.condition?.text)}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Forecast;
