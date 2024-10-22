import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log("Location: ", loc);
  };

  return (
    <View className="flex-row justify-between items-center bg-gray-900 px-4 py-2 border-b border-gray-700">
      {!searchActive ? (
        <>
          <Text className="text-white text-lg font-pbold">My App</Text>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <Image
              source={icons.search}
              resizeMode="contain"
              tintColor="#CDCDE0"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          className="bg-gray-800 text-white flex-1 p-2 rounded font-plight"
          placeholder="Search..."
          placeholderTextColor="#bbb"
          value={searchText}
          onChangeText={setSearchText}
          autoFocus
          onBlur={() => setSearchActive(false)} // Collapse when focus is lost
        />
      )}
      {locations.length > 0 && searchActive ? (
        <View className="absolute w-full bg-gray-300 top-16 rounded">
          {locations.map((loc, index) => {
            let showBorder = index + 1 != locations.length;
            let borderClass = showBorder ? "border-b-2" : "";

            return (
              <TouchableOpacity
                onPress={() => handleLocation(loc)}
                key={index}
                className={
                  "flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass
                }
              >
                <Image
                  source={icons.locationpin}
                  resizeMode="contain"
                  tintColor="#161622"
                  className="w-6 h-6 mr-2"
                />
                <Text className="text-lg font-pregular">LOCATIONS HERE</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default TopBar;
