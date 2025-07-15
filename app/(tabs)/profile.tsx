import { Award, Book, Calendar, Heart } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { StatsCard } from "@/components/StatsCard";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function ProfileScreen() {
  const stats = useSpiritualStore((state) => state.stats);
  const favorites = useSpiritualStore((state) => state.favorites);
  const clearChatHistory = useSpiritualStore((state) => state.clearChatHistory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ton Parcours Spirituel</Text>
        <Text style={styles.subtitle}>Que Dieu bénisse ton cheminement</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatsCard
          title="Lectures"
          value={stats.totalReadings}
          color={colors.primary}
        />
        <StatsCard
          title="Favoris"
          value={favorites.length}
          color={colors.secondary}
        />
      </View>

      <View style={styles.statsContainer}>
        <StatsCard
          title="Série actuelle"
          value={`${stats.currentStreak} jours`}
          color="#6BBAA7"
        />
        <StatsCard
          title="Meilleure série"
          value={`${stats.longestStreak} jours`}
          color="#F9C846"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsContainer}>
          <Button
            title="Effacer l'historique du chat"
            onPress={clearChatHistory}
            variant="outline"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Récompenses spirituelles</Text>
        {stats.totalReadings > 0 ? (
          <View style={styles.achievementsContainer}>
            {stats.totalReadings >= 1 && (
              <View style={styles.achievement}>
                <View style={[styles.achievementIcon, { backgroundColor: "#F9C846" }]}>
                  <Book size={20} color={colors.white} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Premiers pas</Text>
                  <Text style={styles.achievementDescription}>
                    Tu as lu ton premier contenu spirituel
                  </Text>
                </View>
              </View>
            )}
            {stats.totalReadings >= 5 && (
              <View style={styles.achievement}>
                <View style={[styles.achievementIcon, { backgroundColor: "#6BBAA7" }]}>
                  <Heart size={20} color={colors.white} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Cœur ouvert</Text>
                  <Text style={styles.achievementDescription}>
                    Tu as lu 5 contenus spirituels
                  </Text>
                </View>
              </View>
            )}
            {stats.currentStreak >= 3 && (
              <View style={styles.achievement}>
                <View style={[styles.achievementIcon, { backgroundColor: "#8E7DBE" }]}>
                  <Calendar size={20} color={colors.white} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Fidélité</Text>
                  <Text style={styles.achievementDescription}>
                    Tu maintiens une série de 3 jours
                  </Text>
                </View>
              </View>
            )}
            {stats.longestStreak >= 7 && (
              <View style={styles.achievement}>
                <View style={[styles.achievementIcon, { backgroundColor: colors.primary }]}>
                  <Award size={20} color={colors.white} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Persévérance</Text>
                  <Text style={styles.achievementDescription}>
                    Tu as maintenu une série de 7 jours
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Commence à lire pour débloquer des récompenses
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          "Que la grâce du Seigneur Jésus soit avec tous les saints. Amen."
        </Text>
        <Text style={styles.footerReference}>- Apocalypse 22:21</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  actionsContainer: {
    marginBottom: spacing.md,
  },
  achievementsContainer: {
    gap: spacing.md,
  },
  achievement: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 12,
    alignItems: "center",
  },
  footerText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  footerReference: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.medium,
  },
});