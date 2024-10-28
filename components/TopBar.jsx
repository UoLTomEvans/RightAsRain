import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ImageBackground,
} from "react-native";
import { icons } from "../constants";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { useWeather } from "../context/WeatherContext";
import { useError } from "../context/ErrorContext";
import { useLoad } from "../context/LoadingContext";
import { clearData, getData, storeData } from "../utils/asyncStorage";
import * as Location from "expo-location";

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [locations, setLocations] = useState([]);
  const { setError } = useError();
  const { weather, setWeather } = useWeather();
  const { setLoadStatus } = useLoad();

  const updateWeatherData = async (locationQuery) => {
    setLoadStatus(true);
    try {
      const data = await fetchWeatherForecast(
        { query: locationQuery, days: "5" },
        setError
      );
      if (!data.error) {
        setWeather(data);
        storeData("location", locationQuery);
      } else {
        console.error("Error fetching weather data:", data.error);
      }
    } catch (err) {
      console.error("Unhandled error fetching weather:", err);
    } finally {
      setLoadStatus(false);
    }
  };

  const getCurrentLocationQuery = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    return `${location.coords.latitude},${location.coords.longitude}`;
  };

  const handleLocation = async (loc) => {
    setSearchActive(false);
    setLocations([]);
    await updateWeatherData(`${loc.lat},${loc.lon}`);
  };

  const handleSearch = useMemo(
    () =>
      debounce(async (value) => {
        if (value.length > 2) {
          try {
            const data = await fetchLocations({ query: value }, setError);
            data.error
              ? console.error("Error fetching location data:", data.error)
              : setLocations(data);
          } catch (err) {
            console.error("Unhandled error fetching locations:", err);
          }
        }
      }, 800),
    [setError]
  );

  const fetchInitialWeatherData = async () => {
    const savedCity = await getData("location");
    const locationQuery = savedCity || (await getCurrentLocationQuery());
    if (locationQuery) await updateWeatherData(locationQuery);
  };

  const handleCurrentLocation = async () => {
    clearData();
    const locationQuery = await getCurrentLocationQuery();
    if (locationQuery) await updateWeatherData(locationQuery);
  };

  useEffect(() => {
    fetchInitialWeatherData();
  }, []);

  return (
    <View className="flex-row justify-between items-center bg-gray-900 px-4 py-2 border-b border-gray-700 relative z-50">
      {!searchActive ? (
        <>
          <Text className="text-white text-lg font-bold">Right as Rain</Text>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity onPress={handleCurrentLocation}>
              <ImageBackground
                source={icons.target}
                className="mr-2 w-6 h-6"
                imageStyle={{ tintColor: "#FF9C01" }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSearchActive(true)}>
              <Image
                source={icons.search}
                resizeMode="contain"
                className="w-6 h-6 tint-gray-300"
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TextInput
          className="bg-gray-800 text-white flex-1 p-2 rounded font-light"
          placeholder="Search for a city..."
          placeholderTextColor="#bbb"
          onChangeText={handleSearch}
          autoFocus
          onBlur={() => setSearchActive(false)}
        />
      )}

      <Modal
        visible={searchActive}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setSearchActive(false)}
      >
        <View className="flex-1 pt-16 bg-primary">
          <TextInput
            className="bg-gray-800 text-white mx-4 p-2 rounded font-light"
            placeholder="Search for a city..."
            placeholderTextColor="#bbb"
            onChangeText={handleSearch}
            autoFocus
          />

          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            className="mx-2 mt-2 bg-primary rounded-lg"
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  handleLocation(item);
                  setSearchActive(false);
                }}
                className={`flex-row items-center p-3 px-4 ${
                  index + 1 !== locations.length
                    ? "border-b border-gray-400"
                    : "rounded-b-lg"
                }`}
              >
                <ImageBackground
                  source={icons.locationpin}
                  className="mr-2 w-6 h-6"
                  imageStyle={{ tintColor: "#FF9C01" }}
                />
                <Text className="text-lg font-pregular mr-3 flex-wrap, text-white">
                  {[item?.name, item?.region, item?.country]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </View>
  );
};

export default TopBar;
