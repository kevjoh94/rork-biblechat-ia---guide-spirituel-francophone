import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, Share } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/Button";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const content = useSpiritualStore((state) => state.content);
  const toggleFavorite = useSpiritualStore((state) => state.toggleFavorite);
  const markAsRead = useSpiritualStore((state) => state.markAsRead);

  const item = content.find((c) => c.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Contenu non trouvé</Text>
      </View>
    );
  }

  const handleFavoritePress = () => {
    toggleFavorite(item.id);
  };

  const handleMarkAsRead = () => {
    markAsRead(item.id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Heart
            size={24}
            color={item.isFavorite ? colors.primary : colors.textSecondary}
            fill={item.isFavorite ? colors.primary : "none"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.verseContainer}>
          <Text style={styles.verse}>"{item.verse}"</Text>
          <Text style={styles.reference}>- {item.reference}</Text>
        </View>

        <Text style={styles.sectionTitle}>Réflexion</Text>
        <Text style={styles.explanation}>{item.explanation}</Text>

        <Text style={styles.sectionTitle}>Pour méditer</Text>
        <View style={styles.meditationContainer}>
          <Text style={styles.meditationText}>
            Prends un moment pour réfléchir à ce verset. Comment peut-il s'appliquer à ta vie aujourd'hui ?
          </Text>
          <Text style={styles.meditationText}>
            Ferme les yeux et laisse ces paroles pénétrer ton cœur. Que Dieu te parle à travers Sa Parole.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Prière suggérée</Text>
        <View style={styles.prayerContainer}>
          <Text style={styles.prayerText}>
            "Seigneur, merci pour Ta Parole qui éclaire mon chemin. Aide-moi à vivre selon Tes enseignements et à trouver en Toi ma force et ma paix. Que Ton amour guide mes pas aujourd'hui. Amen."
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Marquer comme lu"
            onPress={handleMarkAsRead}
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  verseContainer: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  verse: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    lineHeight: typography.lineHeights.lg,
    fontStyle: "italic",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  reference: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    fontWeight: typography.fontWeights.semibold,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  explanation: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.lg,
  },
  meditationContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  meditationText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.sm,
  },
  prayerContainer: {
    backgroundColor: colors.secondary + "20",
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    marginBottom: spacing.lg,
  },
  prayerText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});