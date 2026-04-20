import { StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenLayout from "../components/ScreenLayout";
import { colors } from "../components/theme";
import { clearToken } from "../services/authService";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await clearToken();
    navigation.replace("Login");
  };

  return (
    <ScreenLayout title="Home Screen">
      <Text style={styles.subtitle}>Choose what you want to do next</Text>
      <PrimaryButton
        label="Go to Flights"
        onPress={() => navigation.navigate("Flights")}
      />
      <PrimaryButton label="Go to Chat" onPress={() => navigation.navigate("Chat")} />
      <PrimaryButton
        label="Go to Bookings"
        onPress={() => navigation.navigate("Bookings")}
      />
      <PrimaryButton label="Logout" onPress={handleLogout} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: 4,
  },
});

export default HomeScreen;
