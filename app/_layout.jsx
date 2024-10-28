import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { icons } from "../constants";
import TabIcon from "../components/TabIcon.jsx";
import { WeatherProvider } from "../context/WeatherContext.js";
import { ErrorProvider, useError } from "../context/ErrorContext.js";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    <ErrorProvider>
      <AppContent />
    </ErrorProvider>
  );
};

const AppContent = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // Access global error state
  const { error: globalError, setError } = useError();

  useEffect(() => {
    if (fontError && setError) {
      setError("Unable to load fonts"); // Set error message for font loading issue
    } else if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering of app until fonts are either loaded or error is set
  if (!fontsLoaded && !fontError) return null;

  return (
    <WeatherProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="forecast"
          options={{
            title: "Forecast",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.forecast}
                color={color}
                name="Forecast"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </WeatherProvider>
  );
};

export default RootLayout;
