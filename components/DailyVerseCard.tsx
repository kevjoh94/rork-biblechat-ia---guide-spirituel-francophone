import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Heart } from "lucide-react-native";
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
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Calendar size={18} color={colors.white} />
          </View>
          <Text style={styles.headerText}>Verset du jour</Text>
          <View style={styles.heartContainer}>
            <Heart size={16} color={colors.white} fill={colors.white} />
          </View>
        </View>
        
        <Text style={styles.verse}>"{verse}"</Text>
        <Text style={styles.reference}>— {reference}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.message}>{message}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    borderRadius: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    borderRadius: 20,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  headerText: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
  },
  heartContainer: {
    opacity: 0.8,
  },
  verse: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    lineHeight: typography.lineHeights.lg,
    fontStyle: "italic",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  reference: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginVertical: spacing.md,
    alignSelf: "center",
    width: "60%",
  },
  message: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.95,
    textAlign: "center",
    lineHeight: typography.lineHeights.md,
  },
});

const styles = createStyles(colors);