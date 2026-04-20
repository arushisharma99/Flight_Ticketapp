import { StyleSheet, TextInput } from "react-native";
import { colors, radius } from "./theme";

const FormInput = ({ ...props }) => {
  return <TextInput style={styles.input} placeholderTextColor="#6b7280" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
});

export default FormInput;
