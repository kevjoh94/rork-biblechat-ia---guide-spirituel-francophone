import { Heart } from "lucide-react-native";
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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.title}</Text>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Heart
            size={20}
            color={content.isFavorite ? colors.primary : colors.textSecondary}
            fill={content.isFavorite ? colors.primary : "none"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.verse} numberOfLines={3}>
        "{content.verse}"
      </Text>
      <Text style={styles.reference}>- {content.reference}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  verse: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  reference: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.medium,
  },
});