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
    <ScreenLayout title="Login Screen">
      <Text style={styles.subtitle}>Welcome back. Sign in to continue.</Text>
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
        label="Go to Register"
        onPress={() => navigation.navigate("Register")}
        disabled={loading}
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
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
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
  },
});

export default LoginScreen;
