import { LinearGradient } from "expo-linear-gradient";
import { Heart, Sun, HandHeart, Sunrise, Gift, Shield, Users } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { SpiritualCategoryInfo } from "@/types/spiritual";

interface SpiritualCategoryCardProps {
  category: SpiritualCategoryInfo;
  onPress: () => void;
}

export const SpiritualCategoryCard: React.FC<SpiritualCategoryCardProps> = ({ category, onPress }) => {
  const { colors } = useTheme();
  const dynamicStyles = createStyles(colors);
  const getIconComponent = (name: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      heart: Heart,
      sun: Sun,
      "hand-heart": HandHeart,
      sunrise: Sunrise,
      gift: Gift,
      shield: Shield,
      "heart-handshake": Users,
    };
    
    return icons[name] || Heart;
  };

  return (
    <TouchableOpacity
      style={dynamicStyles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.white, colors.cardSecondary] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={dynamicStyles.gradient}
      >
        <View style={[dynamicStyles.iconContainer, { backgroundColor: category.color }]}>
          {React.createElement(getIconComponent(category.icon), { color: colors.white, size: 22 })}
        </View>
        
        <Text style={dynamicStyles.title}>{category.title}</Text>
        <Text style={dynamicStyles.description} numberOfLines={2}>
          {category.description}
        </Text>
        
        <View style={[dynamicStyles.accent, { backgroundColor: category.color }]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: spacing.md,
    borderRadius: 18,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  gradient: {
    borderRadius: 18,
    padding: spacing.md,
    height: 160,
    justifyContent: "flex-start",
    position: "relative",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
    flex: 1,
  },
  accent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
});