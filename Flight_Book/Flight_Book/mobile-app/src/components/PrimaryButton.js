import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "./theme";

const PrimaryButton = ({ label, onPress, disabled = false }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, disabled && styles.disabled]} disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 13,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default PrimaryButton;
