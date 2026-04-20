import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "./theme";

const StatusMessage = ({ message, isError = false }) => {
  if (!message) return null;

  return (
    <View style={[styles.container, isError ? styles.errorBg : styles.successBg]}>
      <Text style={[styles.text, isError ? styles.error : styles.success]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  errorBg: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  successBg: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 20,
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
});

export default StatusMessage;
