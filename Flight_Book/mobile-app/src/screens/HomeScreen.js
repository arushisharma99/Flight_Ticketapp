import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenLayout from "../components/ScreenLayout";
import { colors, radius } from "../components/theme";
import { clearToken } from "../services/authService";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await clearToken();
    navigation.replace("Login");
  };

  return (
    <ScreenLayout
      title="Trip Dashboard"
      subtitle="Plan flights, secure seats, and chat with AI travel support."
      centered
    >
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24x7</Text>
          <Text style={styles.statLabel}>Support</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>Fast</Text>
          <Text style={styles.statLabel}>Booking</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>Live</Text>
          <Text style={styles.statLabel}>Flight Data</Text>
        </View>
      </View>
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Quick Tip</Text>
        <Text style={styles.tipText}>
          Search flights first, then open bookings to confirm your selected seat count.
        </Text>
      </View>
      <PrimaryButton
        label="Search Flights"
        onPress={() => navigation.navigate("Flights")}
      />
      <PrimaryButton label="Open AI Chat" onPress={() => navigation.navigate("Chat")} />
      <PrimaryButton
        label="Go to Bookings"
        onPress={() => navigation.navigate("Bookings")}
        variant="secondary"
      />
      <PrimaryButton label="Logout" onPress={handleLogout} variant="secondary" />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 14,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  tipCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 4,
  },
  tipTitle: {
    color: colors.primaryDark,
    fontWeight: "700",
    fontSize: 15,
  },
  tipText: {
    color: colors.textMuted,
    lineHeight: 20,
  },
});

export default HomeScreen;
