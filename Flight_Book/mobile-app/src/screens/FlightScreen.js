import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/ScreenLayout";
import StatusMessage from "../components/StatusMessage";
import { colors, radius } from "../components/theme";
import { searchFlights } from "../services/api";

const FlightScreen = ({ navigation }) => {
  const [source, setSource] = useState("delhi");
  const [destination, setDestination] = useState("mumbai");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setIsError(false);
      setMessage("");
      const response = await searchFlights(source, destination);
      setFlights(response.flights || []);
      if (!response.flights?.length) {
        setMessage("No flights found for selected route.");
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="Find Flights"
      subtitle="Pick source and destination to view the latest available routes."
    >
      <View style={styles.filterCard}>
        <Text style={styles.filterTitle}>Route Search</Text>
        <Text style={styles.filterText}>Use city names and tap search for latest flights.</Text>
      </View>
      <FormInput placeholder="Source city" value={source} onChangeText={setSource} />
      <FormInput
        placeholder="Destination city"
        value={destination}
        onChangeText={setDestination}
      />
      <PrimaryButton
        label={loading ? "Searching..." : "Search Flights"}
        onPress={handleSearch}
        disabled={loading}
      />
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Fetching flights...</Text>
        </View>
      ) : null}
      <StatusMessage message={message} isError={isError} />

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {!loading && flights.length > 0 ? (
          <Text style={styles.resultLabel}>{flights.length} flights available</Text>
        ) : null}
        {flights.map((flight) => (
          <View key={flight.id} style={styles.card}>
            <View style={styles.routeRow}>
              <Text style={styles.routeText}>
                {flight.source.toUpperCase()} -> {flight.destination.toUpperCase()}
              </Text>
              <Text style={styles.airlineBadge}>{flight.airline}</Text>
            </View>
            <Text style={styles.priceText}>Rs. {flight.price}</Text>
            <Text style={styles.metaText}>
              Departure: {new Date(flight.departureTime).toLocaleString()}
            </Text>
            <PrimaryButton
              label="Book Now"
              onPress={() => navigation.navigate("Bookings", { flight })}
            />
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginTop: 4,
    maxHeight: 350,
  },
  filterCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    backgroundColor: colors.surfaceSoft,
    gap: 3,
  },
  filterTitle: {
    color: colors.primaryDark,
    fontWeight: "700",
    fontSize: 14,
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  listContent: {
    gap: 12,
    paddingBottom: 8,
  },
  resultLabel: {
    color: colors.textMuted,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 4,
  },
  loadingWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
    gap: 10,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  routeText: {
    fontWeight: "700",
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  airlineBadge: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  metaText: {
    color: colors.textMuted,
  },
  priceText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 20,
  },
});

export default FlightScreen;
