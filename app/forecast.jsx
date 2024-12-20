import React from "react";
import TopBar from "../components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import DaysWeather from "../components/DaysWeather";
import { useWeather } from "../context/WeatherContext";
import { getWeatherIcon } from "../utils/getWeatherIcons";
import { useError } from "../context/ErrorContext";
import ErrorDisplay from "../components/ErrorDisplay";
import { useLoad } from "../context/LoadingContext";
import Loading from "../components/Loading";

const Forecast = () => {
  const { weather } = useWeather(); // Access the global weather state
  const { error } = useError(); // Access the global error state
  const { loadStatus } = useLoad(); // Access the global load state

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <TopBar />

      {loadStatus ? (
        <Loading />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        <View className="mx-4 flex justify-around flex-1 space-y-3 items-center">
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
                  value={item?.day?.avgtemp_c}
                  icon={getWeatherIcon(item?.day?.condition?.code)}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Forecast;
