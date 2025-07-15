import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, color = colors.primary }) => {
  return (
    <View style={[styles.container, { backgroundColor: color + "15" }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 100,
  },
  value: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
});