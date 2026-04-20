import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "./theme";

const ScreenLayout = ({ title, subtitle, children, centered = false }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, centered && styles.centeredContent]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topAccent} />
        <View style={styles.headingWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
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
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 22,
  },
  centeredContent: {
    justifyContent: "center",
  },
  headingWrap: {
    width: "100%",
    maxWidth: 390,
    marginBottom: 12,
    zIndex: 1,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 84,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    backgroundColor: colors.primaryLight,
    opacity: 0.65,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    textAlign: "left",
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    width: "100%",
    maxWidth: 390,
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
});

export default ScreenLayout;
