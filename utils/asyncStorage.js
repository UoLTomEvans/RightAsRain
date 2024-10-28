import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error("Error storing value: ", err);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    console.error("Error getting value: ", err);
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All data cleared successfully.");
  } catch (err) {
    console.error("Error clearing storage: ", err);
  }
};
