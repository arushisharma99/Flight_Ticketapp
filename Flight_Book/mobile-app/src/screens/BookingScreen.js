import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/ScreenLayout";
import StatusMessage from "../components/StatusMessage";
import { colors, radius } from "../components/theme";
import { createBooking } from "../services/api";

const BookingScreen = ({ route }) => {
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
    <ScreenLayout title="Booking Screen">
      {selectedFlight ? (
        <View style={styles.flightPreview}>
          <Text style={styles.previewTitle}>Selected Flight</Text>
          <Text>
            {selectedFlight.source.toUpperCase()} to {selectedFlight.destination.toUpperCase()}
          </Text>
          <Text>Airline: {selectedFlight.airline}</Text>
          <Text>Price: Rs. {selectedFlight.price}</Text>
          <Text>
            Departure: {new Date(selectedFlight.departureTime).toLocaleString()}
          </Text>
        </View>
      ) : (
        <StatusMessage
          message="No flight data received. Go back and select a flight."
          isError
        />
      )}

      <FormInput
        placeholder="Seats"
        keyboardType="numeric"
        value={seats}
        onChangeText={setSeats}
      />
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
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    padding: 14,
    gap: 6,
  },
  previewTitle: {
    fontWeight: "700",
    color: colors.text,
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
