import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/ScreenLayout";
import StatusMessage from "../components/StatusMessage";
import { colors, radius } from "../components/theme";
import { createBooking } from "../services/api";

const BookingScreen = ({ route, navigation }) => {
  const selectedFlight = route.params?.flight;
  const [seats, setSeats] = useState("1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCreateBooking = async () => {
    if (!selectedFlight?.id) {
      setIsError(true);
      setMessage("No flight selected. Please choose a flight first.");
      return;
    }

    const seatsNumber = Number(seats);
    if (!Number.isInteger(seatsNumber) || seatsNumber < 1) {
      setIsError(true);
      setMessage("Seats must be a valid number.");
      return;
    }

    try {
      setLoading(true);
      setIsError(false);
      setMessage("");
      await createBooking({ flightId: selectedFlight.id, seats: seatsNumber });
      setMessage("Booking confirmed successfully.");
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="Confirm Booking"
      subtitle="Review selected flight details and choose the number of seats."
    >
      {selectedFlight ? (
        <View style={styles.flightPreview}>
          <Text style={styles.previewTitle}>Selected Flight</Text>
          <Text style={styles.routeText}>
            {selectedFlight.source.toUpperCase()} -> {selectedFlight.destination.toUpperCase()}
          </Text>
          <Text style={styles.metaText}>Airline: {selectedFlight.airline}</Text>
          <Text style={styles.priceText}>Rs. {selectedFlight.price}</Text>
          <Text style={styles.metaText}>
            Departure: {new Date(selectedFlight.departureTime).toLocaleString()}
          </Text>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <StatusMessage
            message="No flight selected yet. Choose a flight from the Flights screen first."
            isError
          />
          <PrimaryButton
            label="Go to Flights"
            onPress={() => navigation.navigate("Flights")}
            variant="secondary"
          />
        </View>
      )}

      <View style={styles.sectionWrap}>
        <Text style={styles.sectionLabel}>Number of seats</Text>
        <FormInput
          placeholder="Seats"
          keyboardType="numeric"
          value={seats}
          onChangeText={setSeats}
        />
      </View>
      <PrimaryButton
        label={loading ? "Confirming..." : "Confirm Booking"}
        onPress={handleCreateBooking}
        disabled={loading || !selectedFlight?.id}
      />
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Confirming your booking...</Text>
        </View>
      ) : null}
      <StatusMessage message={message} isError={isError} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  flightPreview: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 13,
    gap: 6,
  },
  emptyState: {
    gap: 10,
  },
  sectionWrap: {
    gap: 6,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.2,
  },
  previewTitle: {
    fontWeight: "700",
    color: colors.primaryDark,
    fontSize: 14,
  },
  routeText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  priceText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 18,
  },
  metaText: {
    color: colors.textMuted,
  },
  loadingWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: colors.textMuted,
  },
});

export default BookingScreen;
