import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import { useError } from "../context/ErrorContext"; // Import Error Context
import { useLoad } from "../context/LoadingContext";
import { clearData, getData, storeData } from "../utils/asyncStorage";
import * as Location from "expo-location";

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
          query: loc.name,
          days: "5",
        },
        setError
      );
      if (data.error) {
        console.error("Error fetching weather data:", data.error);
      } else {
        setWeather(data); // Update global weather state
        storeData(
          "location",
          `${JSON.stringify(loc.lat)},${JSON.stringify(loc.lon)}`
        );
        console.log(
          `data: ${JSON.stringify(loc.lat)},${JSON.stringify(loc.lon)}`
        );
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
        const data = await fetchLocations({ query: value }, setError);
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
    let savedCity = await getData("location");
    console.log("City lat/lon on load: ", savedCity);

    let queryLocation;

    if (savedCity) {
      // If there's a saved city, use it directly as the query location
      queryLocation = savedCity;
    } else {
      // If no saved city, fetch the current location of the user
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        queryLocation = `${location.coords.latitude},${location.coords.longitude}`;
        console.log("Using current location:", queryLocation);
      } catch (error) {
        console.error("Error getting current location:", error);
        setError("Unable to retrieve current location.");
        setLoadStatus(false);
        return;
      }
    }

    setLoadStatus(true);
    try {
      const data = await fetchWeatherForecast(
        {
          query: queryLocation,
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
