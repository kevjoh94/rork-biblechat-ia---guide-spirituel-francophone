import { LinearGradient } from "expo-linear-gradient";
import { Heart, BookOpen } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { BiblicalContent } from "@/types/spiritual";

interface BiblicalContentCardProps {
  content: BiblicalContent;
  onPress: () => void;
}

export const BiblicalContentCard: React.FC<BiblicalContentCardProps> = ({ content, onPress }) => {
  const toggleFavorite = useSpiritualStore((state) => state.toggleFavorite);

  const handleFavoritePress = () => {
    toggleFavorite(content.id);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={colors.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.bookIcon}>
              <BookOpen size={16} color={colors.primary} />
            </View>
            <Text style={styles.title}>{content.title}</Text>
          </View>
          <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
            <Heart
              size={20}
              color={content.isFavorite ? colors.primary : colors.textLight}
              fill={content.isFavorite ? colors.primary : "none"}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.verse} numberOfLines={3}>
          "{content.verse}"
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.reference}>— {content.reference}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + "15" }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>
              {content.category}
            </Text>
          </View>
        </View>
        
        <View style={[styles.leftBorder, { backgroundColor: colors.primary }]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
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
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: spacing.sm,
  },
  bookIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  verse: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    fontStyle: "italic",
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reference: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  leftBorder: {
    position: "absolute",
    left: 0,
    top: spacing.md,
    bottom: spacing.md,
    width: 4,
    borderRadius: 2,
  },
});