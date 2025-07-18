import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>BibleChat IA</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ton guide spirituel personnel</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: "700",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    fontStyle: "italic",
    textAlign: "center",
  },
});