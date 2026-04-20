import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "./theme";

const PrimaryButton = ({ label, onPress, disabled = false, variant = "primary" }) => {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.label, isSecondary && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryLabel: {
    color: colors.text,
  },
});

export default PrimaryButton;
