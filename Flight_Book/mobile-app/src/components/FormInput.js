import { StyleSheet, TextInput, View } from "react-native";
import { colors, radius } from "./theme";

const FormInput = ({ ...props }) => {
  return (
    <View style={styles.wrap}>
      <TextInput style={styles.input} placeholderTextColor={colors.textMuted} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
  },
  input: {
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: "transparent",
  },
});

export default FormInput;
