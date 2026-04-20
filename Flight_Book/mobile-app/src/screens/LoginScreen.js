import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/ScreenLayout";
import StatusMessage from "../components/StatusMessage";
import { colors } from "../components/theme";
import { loginUser } from "../services/api";
import { saveToken } from "../services/authService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setIsError(true);
      setMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setIsError(false);
      setMessage("");
      const response = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response?.token) {
        throw new Error("Login token not received from server");
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
      title="Welcome Back"
      subtitle="Sign in to explore flights, manage bookings, and get instant travel help."
      centered
    >
      <View style={styles.highlight}>
        <Text style={styles.highlightTitle}>Secure Access</Text>
        <Text style={styles.highlightText}>
          Your account keeps bookings, chat history, and travel preferences in sync.
        </Text>
      </View>
      <Text style={styles.sectionLabel}>Account Details</Text>
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
        label={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
      <PrimaryButton
        label="Create New Account"
        onPress={() => navigation.navigate("Register")}
        disabled={loading}
        variant="secondary"
      />
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Logging you in...</Text>
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

export default LoginScreen;
