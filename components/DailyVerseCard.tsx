import { Calendar } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface DailyVerseCardProps {
  verse: string;
  reference: string;
  message: string;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({ verse, reference, message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar size={20} color={colors.primary} />
        <Text style={styles.headerText}>Verset du jour</Text>
      </View>
      <Text style={styles.verse}>"{verse}"</Text>
      <Text style={styles.reference}>- {reference}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  verse: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    lineHeight: typography.lineHeights.lg,
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  reference: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    fontWeight: typography.fontWeights.medium,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.9,
  },
});