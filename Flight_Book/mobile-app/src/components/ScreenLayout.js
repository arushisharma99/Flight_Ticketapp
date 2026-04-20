import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "./theme";

const ScreenLayout = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 18,
    textAlign: "center",
  },
  content: {
    width: "100%",
    maxWidth: 390,
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default ScreenLayout;
