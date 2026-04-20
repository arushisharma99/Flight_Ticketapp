import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/ScreenLayout";
import StatusMessage from "../components/StatusMessage";
import { colors } from "../components/theme";
import { registerUser } from "../services/api";
import { saveToken } from "../services/authService";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setIsError(true);
      setMessage("Name, email, and password are required.");
      return;
    }

    try {
      setLoading(true);
      setIsError(false);
      setMessage("");
      const response = await registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response?.token) {
        throw new Error("Registration token not received from server");
      }

      await saveToken(response.token);
      navigation.replace("Home");
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="Create Account"
      subtitle="Register once and start booking smarter trips in seconds."
      centered
    >
      <View style={styles.highlight}>
        <Text style={styles.highlightTitle}>Get Started</Text>
        <Text style={styles.highlightText}>
          Create your profile to search flights, confirm seats, and use AI trip help.
        </Text>
      </View>
      <Text style={styles.sectionLabel}>Personal Info</Text>
      <FormInput placeholder="Name" value={name} onChangeText={setName} />
      <FormInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <PrimaryButton
        label={loading ? "Registering..." : "Register"}
        onPress={handleRegister}
        disabled={loading}
      />
      <PrimaryButton
        label="Back to Login"
        onPress={() => navigation.goBack()}
        disabled={loading}
        variant="secondary"
      />
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Creating your account...</Text>
        </View>
      ) : null}
      <StatusMessage message={message} isError={isError} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  highlight: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  highlightTitle: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "700",
  },
  highlightText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.2,
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

export default RegisterScreen;
