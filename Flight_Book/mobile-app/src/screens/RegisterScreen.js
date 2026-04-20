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
    <ScreenLayout title="Register Screen">
      <Text style={styles.subtitle}>Create your account to start booking flights.</Text>
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

export default RegisterScreen;
