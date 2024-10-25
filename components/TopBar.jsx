import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { useWeather } from "../context/WeatherContext"; // Import the custom hook

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [locations, setLocations] = useState([]);
  const { weather, setWeather } = useWeather(); // Access global weather state

  // Fetch weather data for location from WeatherAPI
  const handleLocation = (loc) => {
    setSearchActive(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "5",
    }).then((data) => {
      setWeather(data); // Update global weather state
    });
  };

  // Fetch locations for searching from WeatherAPI
  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  // Prevent frequent API calls
  const handleTextDebounce = useMemo(
    () => debounce(handleSearch, 800),
    [handleSearch]
  );

  // Default weather
  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: "Liverpool",
      days: "5",
    }).then((data) => {
      setWeather(data);
    });
  };

  // Happens on load
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  return (
    <View className="flex-row justify-between items-center bg-gray-900 px-4 py-2 border-b border-gray-700 relative z-50">
      {!searchActive ? (
        <>
          <Text className="text-white text-lg font-bold">Right as Rain!</Text>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <Image
              source={icons.search}
              resizeMode="contain"
              className="w-6 h-6 tint-[#CDCDE0]"
            />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          className="bg-gray-800 text-white flex-1 p-2 rounded font-light"
          placeholder="Search for a city..."
          placeholderTextColor="#bbb"
          onChangeText={handleTextDebounce}
          autoFocus
          onBlur={() => setSearchActive(false)}
        />
      )}

      {/* Search window */}
      {locations.length > 0 && searchActive ? (
        <View className="absolute w-full bg-gray-300 top-16 rounded max-h-60 overflow-hidden">
          {locations.map((loc, index) => {
            const showBorder = index + 1 !== locations.length;
            return (
              <TouchableOpacity
                onPress={() => handleLocation(loc)}
                key={index}
                className={`flex-row items-center p-3 px-4 ${
                  showBorder ? "border-b border-gray-400" : ""
                }`}
              >
                <Image
                  source={icons.locationpin}
                  resizeMode="contain"
                  className="w-6 h-6 mr-2 tint-[#161622]"
                />
                <Text className="text-lg font-normal mr-3">
                  {[loc?.name, loc?.region, loc?.country]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default TopBar;
