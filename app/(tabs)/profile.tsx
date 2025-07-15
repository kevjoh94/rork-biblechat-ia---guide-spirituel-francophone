import { LinearGradient } from "expo-linear-gradient";
import { Award, Book, Calendar, Heart, Crown, Star } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Crown size={32} color={colors.white} />
          </View>
          <Text style={styles.title}>Ton Parcours Spirituel</Text>
          <Text style={styles.subtitle}>Que Dieu bénisse ton cheminement</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
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
            color={colors.gratitude}
          />
          <StatsCard
            title="Meilleure série"
            value={`${stats.longestStreak} jours`}
            color={colors.comfort}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Star size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Actions rapides</Text>
          </View>
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
          <View style={styles.sectionHeader}>
            <Award size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Récompenses spirituelles</Text>
          </View>
          
          {stats.totalReadings > 0 ? (
            <View style={styles.achievementsContainer}>
              {stats.totalReadings >= 1 && (
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={[colors.comfort, colors.comfort + "CC"]}
                    style={styles.achievementIcon}
                  >
                    <Book size={20} color={colors.white} />
                  </LinearGradient>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>Premiers pas</Text>
                    <Text style={styles.achievementDescription}>
                      Tu as lu ton premier contenu spirituel
                    </Text>
                  </View>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.badgeText}>✨</Text>
                  </View>
                </View>
              )}
              
              {stats.totalReadings >= 5 && (
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={[colors.gratitude, colors.gratitude + "CC"]}
                    style={styles.achievementIcon}
                  >
                    <Heart size={20} color={colors.white} />
                  </LinearGradient>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>Cœur ouvert</Text>
                    <Text style={styles.achievementDescription}>
                      Tu as lu 5 contenus spirituels
                    </Text>
                  </View>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.badgeText}>💝</Text>
                  </View>
                </View>
              )}
              
              {stats.currentStreak >= 3 && (
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={[colors.strength, colors.strength + "CC"]}
                    style={styles.achievementIcon}
                  >
                    <Calendar size={20} color={colors.white} />
                  </LinearGradient>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>Fidélité</Text>
                    <Text style={styles.achievementDescription}>
                      Tu maintiens une série de 3 jours
                    </Text>
                  </View>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.badgeText}>🔥</Text>
                  </View>
                </View>
              )}
              
              {stats.longestStreak >= 7 && (
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={[colors.primary, colors.primary + "CC"]}
                    style={styles.achievementIcon}
                  >
                    <Award size={20} color={colors.white} />
                  </LinearGradient>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>Persévérance</Text>
                    <Text style={styles.achievementDescription}>
                      Tu as maintenu une série de 7 jours
                    </Text>
                  </View>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.badgeText}>👑</Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyAchievements}>
              <Book size={48} color={colors.textLight} />
              <Text style={styles.emptyText}>
                Commence à lire pour débloquer des récompenses
              </Text>
              <Text style={styles.emptySubtext}>
                Chaque lecture te rapproche de nouvelles récompenses spirituelles
              </Text>
            </View>
          )}
        </View>

        <LinearGradient
          colors={[colors.cardSecondary, colors.white]}
          style={styles.footer}
        >
          <View style={styles.quoteIcon}>
            <Heart size={20} color={colors.primary} fill={colors.primary} />
          </View>
          <Text style={styles.footerText}>
            "Que la grâce du Seigneur Jésus soit avec tous les saints. Amen."
          </Text>
          <Text style={styles.footerReference}>— Apocalypse 22:21</Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.white,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.9,
    textAlign: "center",
  },
  content: {
    padding: spacing.md,
    marginTop: -spacing.md,
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    marginLeft: spacing.sm,
  },
  actionsContainer: {
    marginBottom: spacing.md,
  },
  achievementsContainer: {
    gap: spacing.md,
  },
  achievement: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 16,
  },
  emptyAchievements: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    backgroundColor: colors.cardSecondary,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.md,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: "center",
  },
  quoteIcon: {
    marginBottom: spacing.md,
  },
  footerText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeights.md,
  },
  footerReference: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500",
  },
});