import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Heart } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface DailyVerseCardProps {
  verse: string;
  reference: string;
  message: string;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({ verse, reference, message }) => {
  const { colors } = useTheme();
  
  const dynamicStyles = createStyles(colors);
  
  return (
    <View style={dynamicStyles.container}>
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={dynamicStyles.gradient}
      >
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.iconContainer}>
            <Calendar size={20} color={colors.white} />
          </View>
          <Text style={dynamicStyles.headerText}>✨ Verset du jour</Text>
          <View style={dynamicStyles.heartContainer}>
            <Heart size={18} color={colors.white} fill={colors.white} />
          </View>
        </View>
        
        <Text style={dynamicStyles.verse}>"{verse}"</Text>
        <Text style={dynamicStyles.reference}>— {reference}</Text>
        
        <View style={dynamicStyles.divider} />
        
        <Text style={dynamicStyles.message}>{message}</Text>
      </LinearGradient>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: spacing.section,
    borderRadius: spacing.radius.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
  },
  gradient: {
    borderRadius: spacing.radius.xl,
    padding: spacing.xl,
    minHeight: 200,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: spacing.radius.full,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    backdropFilter: "blur(10px)",
  },
  headerText: {
    ...typography.h4,
    color: colors.white,
    flex: 1,
    letterSpacing: 0.3,
  },
  heartContainer: {
    opacity: 0.9,
    transform: [{ scale: 1.1 }],
  },
  verse: {
    ...typography.verse,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  reference: {
    ...typography.verseReference,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.xl,
    opacity: 0.95,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginVertical: spacing.lg,
    alignSelf: "center",
    width: "40%",
    borderRadius: 1,
  },
  message: {
    ...typography.body,
    color: colors.white,
    opacity: 0.95,
    textAlign: "center",
    lineHeight: typography.lineHeights.lg,
    paddingHorizontal: spacing.xs,
  },
});