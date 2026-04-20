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
    <ScreenLayout title="Flight Screen">
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
        {flights.map((flight) => (
          <View key={flight.id} style={styles.card}>
            <Text style={styles.routeText}>
              {flight.source.toUpperCase()} to {flight.destination.toUpperCase()}
            </Text>
            <Text style={styles.metaText}>Airline: {flight.airline}</Text>
            <Text style={styles.priceText}>Price: Rs. {flight.price}</Text>
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
  listContent: {
    gap: 12,
    paddingBottom: 8,
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
    gap: 8,
    backgroundColor: colors.surfaceMuted,
  },
  routeText: {
    fontWeight: "700",
    fontSize: 15,
    color: colors.text,
  },
  metaText: {
    color: colors.textMuted,
  },
  priceText: {
    color: colors.primaryDark,
    fontWeight: "700",
    fontSize: 15,
  },
});

export default FlightScreen;
