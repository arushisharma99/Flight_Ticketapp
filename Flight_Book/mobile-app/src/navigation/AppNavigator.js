import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "../screens/BookingScreen";
import ChatScreen from "../screens/ChatScreen";
import FlightScreen from "../screens/FlightScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { loadToken } from "../services/authService";
import { colors } from "../components/theme";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const bootstrap = async () => {
      const token = await loadToken();
      if (token) {
        setInitialRoute("Home");
      }
      setCheckingAuth(false);
    };

    bootstrap();
  }, []);

  if (checkingAuth) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: "700",
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Flights" component={FlightScreen} />
      <Stack.Screen name="Bookings" component={BookingScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
