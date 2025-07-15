import { Heart, Sun, HandHeart, Sunrise, Gift, Shield } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { SpiritualCategoryInfo } from "@/types/spiritual";

interface SpiritualCategoryCardProps {
  category: SpiritualCategoryInfo;
  onPress: () => void;
}

export const SpiritualCategoryCard: React.FC<SpiritualCategoryCardProps> = ({ category, onPress }) => {
  const IconComponent = ({ name, color, size }: { name: string; color: string; size: number }) => {
    const icons: Record<string, React.ElementType> = {
      heart: Heart,
      sun: Sun,
      "hand-heart": HandHeart,
      sunrise: Sunrise,
      gift: Gift,
      shield: Shield,
      "heart-handshake": Heart,
    };
    
    const LucideIcon = icons[name] || Heart;
    return <LucideIcon color={color} size={size} />;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: category.color + "20" }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <IconComponent name={category.icon} color={colors.white} size={20} />
      </View>
      <Text style={styles.title}>{category.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {category.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: spacing.md,
    width: "48%",
    marginBottom: spacing.md,
    height: 160,
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
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
  },
});