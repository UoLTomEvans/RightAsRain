import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import InformationWidget from "../components/InformationWidget";
import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import { useWeather } from "../context/WeatherContext";
import { useError } from "../context/ErrorContext";
import { useLoad } from "../context/LoadingContext";
import { getWeatherIcon } from "../utils/getWeatherIcons";
import { icons } from "../constants";

const Home = () => {
  const { height } = useWindowDimensions(); // Dynamically get screen height
  const { weather } = useWeather();
  const { error } = useError();
  const { loadStatus } = useLoad();
  const { current, location } = weather;

  const topMargin = height * 0.05; // Adjusts distance from top
  const bottomMargin = height * 0.1; // Adjusts distance from bottom

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar backgroundColor="#161622" style="light" />

      {/* Static TopBar */}
      <TopBar />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
            <View className="flex-1 justify-between mx-4 mb-2">
              {loadStatus ? (
                <Loading />
              ) : error ? (
                <ErrorDisplay message={error} />
              ) : (
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  {/* Location Details */}
                  <View style={{ marginTop: topMargin }}>
                    <Text className="text-2xl text-center font-pbold text-white">
                      {location?.name},
                      <Text className="text-lg font-psemibold text-secondary-100">
                        {" "}
                        {location?.country}
                      </Text>
                    </Text>
                  </View>

                  {/* Weather Image */}
                  <View className="flex-row justify-center mt-4">
                    <Image
                      source={getWeatherIcon(current?.condition?.code)}
                      resizeMode="contain"
                      className="w-52 h-52"
                    />
                  </View>

                  {/* Temperature & Conditions */}
                  <View className="space-y-2">
                    <Text className="text-6xl text-center font-pbold text-white py-2">
                      {current?.temp_c} &#176;C
                    </Text>
                    <Text className="text-xl text-center font-pregular text-white tracking-widest py-2">
                      {current?.condition?.text}
                    </Text>
                  </View>

                  {/* More information */}
                  <View
                    className="flex-row justify-between mx-4"
                    style={{ marginBottom: bottomMargin }}
                  >
                    <InformationWidget
                      icon={icons.wind}
                      information={`${current?.wind_kph} km/h`}
                    />
                    <InformationWidget
                      icon={icons.drop}
                      information={`${current?.humidity}%`}
                    />
                    <InformationWidget
                      icon={icons.sunwhite}
                      information={
                        weather?.forecast?.forecastday?.[0]?.astro?.sunrise
                      }
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
