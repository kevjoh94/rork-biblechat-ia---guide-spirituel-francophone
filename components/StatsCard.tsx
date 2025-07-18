import { LinearGradient } from "expo-linear-gradient";
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
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.white, colors.cardSecondary] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
          <View style={[styles.iconDot, { backgroundColor: color }]} />
        </View>
        <Text style={[styles.value, { color: color }]}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  gradient: {
    borderRadius: 16,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  iconDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  value: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold as any,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
    fontWeight: typography.fontWeights.medium as any,
  },
});