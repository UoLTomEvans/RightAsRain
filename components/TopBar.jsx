import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import { useError } from "../context/ErrorContext"; // Import Error Context
import { useLoad } from "../context/LoadingContext";

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [locations, setLocations] = useState([]);
  const { setError } = useError(); // Access setError from error context
  const { weather, setWeather } = useWeather(); // Access global weather state
  const { setLoadStatus } = useLoad(); // Access global load state

  // Fetch weather data for a selected location from WeatherAPI
  const handleLocation = async (loc) => {
    setSearchActive(false);
    setLocations([]);
    setLoadStatus(true);
    try {
      const data = await fetchWeatherForecast(
        {
          cityName: loc.name,
          days: "5",
        },
        setError
      );
      if (data.error) {
        console.error("Error fetching weather data:", data.error);
      } else {
        setWeather(data); // Update global weather state
      }
    } catch (err) {
      console.error("Unhandled error fetching weather:", err);
    } finally {
      setLoadStatus(false); // Ensure loading is turned off
    }
  };

  // Fetch locations for the search term from WeatherAPI
  const handleSearch = async (value) => {
    if (value.length > 2) {
      try {
        const data = await fetchLocations({ cityName: value }, setError);
        if (data.error) {
          console.error("Error fetching location data:", data.error);
        } else {
          setLocations(data);
        }
      } catch (err) {
        console.error("Unhandled error fetching locations:", err);
      }
    }
  };

  // Prevent frequent API calls using debounce
  const handleTextDebounce = useMemo(
    () => debounce(handleSearch, 800),
    [setError]
  );

  // Fetch default weather data for a preset location
  const fetchMyWeatherData = async () => {
    setLoadStatus(true);
    try {
      const data = await fetchWeatherForecast(
        {
          cityName: "Liverpool",
          days: "5",
        },
        setError
      );
      if (data.error) {
        console.error("Error fetching default weather:", data.error);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.error("Unhandled error fetching default weather:", err);
    } finally {
      setLoadStatus(false);
    }
  };

  // Fetch default weather data on component load
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
