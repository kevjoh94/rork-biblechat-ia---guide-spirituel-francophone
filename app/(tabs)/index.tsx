import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MessageCircle, Sparkles, Star, Heart, Calendar, BookOpen, Target, TrendingUp, Award } from "lucide-react-native";
import React, { useState, useEffect, useMemo } from "react";
import { BiblicalContent } from "@/types/spiritual";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { BiblicalContentCard } from "@/components/BiblicalContentCard";
import { Button } from "@/components/Button";
import { DailyVerseCard } from "@/components/DailyVerseCard";
import { SpiritualCategoryCard } from "@/components/SpiritualCategoryCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { useTheme } from "@/components/ThemeProvider";
import TabIndicator from "@/components/TabIndicator";
import FloatingActionButton from "@/components/FloatingActionButton";
import ReadingProgress from "@/components/ReadingProgress";
import QuickActions from "@/components/QuickActions";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { spiritualCategories } from "@/mocks/spiritual-categories";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"featured" | "favorites">("featured");
  // Use direct selectors to prevent infinite loops
  const content = useSpiritualStore((state) => state.content);
  const getFavorites = useSpiritualStore((state) => state.getFavorites);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);

  // Memoize derived values to prevent unnecessary recalculations
  const featuredContent = useMemo(() => {
    return Array.isArray(content) ? content.slice(0, 4) : [];
  }, [content]);
  
  const favoriteContent = useMemo(() => {
    try {
      return getFavorites() || [];
    } catch (error) {
      console.warn('Error getting favorites:', error);
      return [];
    }
  }, [getFavorites]);
  
  const dailyVerse = useMemo(() => {
    try {
      return getDailyVerse() || { verse: '', reference: '', message: '' };
    } catch (error) {
      console.warn('Error getting daily verse:', error);
      return { verse: '', reference: '', message: '' };
    }
  }, [getDailyVerse]);
  
  useEffect(() => {
    try {
      initializeDailyVerse();
    } catch (error) {
      console.warn('Error initializing daily verse:', error);
    }
  }, []);

  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const navigateToContent = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const navigateToChat = () => {
    router.push("/(tabs)/chat");
  };
  
  const navigateToMeditation = () => {
    router.push("/(tabs)/meditation");
  };
  
  const navigateToJournal = () => {
    router.push("/(tabs)/journal");
  };
  
  const navigateToReadingPlan = () => {
    router.push("/(tabs)/reading-plan");
  };
  
  const navigateToMore = () => {
    router.push("/(tabs)/more");
  };
  
  const navigateToDailyPlan = () => {
    router.push("/daily-plan");
  };
  
  const navigateToCalendar = () => {
    router.push("/calendar");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.background, colors.cardSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <View style={styles.sparkleIcon}>
              <Sparkles size={20} color={colors.primary} />
            </View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Que la paix soit avec toi</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>BibleChat IA</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ton guide spirituel personnel</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <DailyVerseCard
          verse={dailyVerse.verse}
          reference={dailyVerse.reference}
          message={dailyVerse.message}
        />

        <Button
          title="Poser une question spirituelle"
          onPress={navigateToChat}
          icon={<MessageCircle size={18} color={colors.white} />}
          fullWidth
          variant="primary"
        />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={navigateToDailyPlan}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.quickActionGradient}
            >
              <Target size={20} color={colors.white} />
              <Text style={styles.quickActionText}>Plan Quotidien</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={navigateToCalendar}>
            <LinearGradient
              colors={[colors.accent, colors.accent + 'CC']}
              style={styles.quickActionGradient}
            >
              <Calendar size={20} color={colors.white} />
              <Text style={styles.quickActionText}>Calendrier</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={navigateToJournal}>
            <LinearGradient
              colors={[colors.gratitude, colors.gratitude + 'CC']}
              style={styles.quickActionGradient}
            >
              <BookOpen size={20} color={colors.white} />
              <Text style={styles.quickActionText}>Journal</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Star size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Catégories spirituelles</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {spiritualCategories.map((category) => (
            <SpiritualCategoryCard
              key={category.id}
              category={category}
              onPress={() => navigateToCategory(category.id)}
            />
          ))}
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "featured" && styles.activeTab]}
            onPress={() => setActiveTab("featured")}
          >
            <Text style={[styles.tabText, activeTab === "featured" && styles.activeTabText]}>
              À la une
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "favorites" && styles.activeTab]}
            onPress={() => setActiveTab("favorites")}
          >
            <Text style={[styles.tabText, activeTab === "favorites" && styles.activeTabText]}>
              Favoris
            </Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Ton progrès spirituel</Text>
          </View>
          <ProgressTracker />
          
          {/* Weekly Goals */}
          <View style={[styles.weeklyGoals, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <Text style={[styles.weeklyGoalsTitle, { color: colors.text }]}>Objectifs de la semaine</Text>
            <View style={styles.goalsList}>
              <View style={styles.goalItem}>
                <View style={[styles.goalIcon, { backgroundColor: colors.cardSecondary }]}>
                  <BookOpen size={16} color={colors.primary} />
                </View>
                <Text style={[styles.goalText, { color: colors.text }]}>Lire 3 chapitres</Text>
                <View style={[styles.goalProgress, { backgroundColor: colors.primary + "15" }]}>
                  <Text style={[styles.goalProgressText, { color: colors.primary }]}>2/3</Text>
                </View>
              </View>
              <View style={styles.goalItem}>
                <View style={[styles.goalIcon, { backgroundColor: colors.cardSecondary }]}>
                  <Heart size={16} color={colors.gratitude} />
                </View>
                <Text style={[styles.goalText, { color: colors.text }]}>Méditer 5 fois</Text>
                <View style={[styles.goalProgress, { backgroundColor: colors.primary + "15" }]}>
                  <Text style={[styles.goalProgressText, { color: colors.primary }]}>3/5</Text>
                </View>
              </View>
              <View style={styles.goalItem}>
                <View style={[styles.goalIcon, { backgroundColor: colors.cardSecondary }]}>
                  <Award size={16} color={colors.accent} />
                </View>
                <Text style={[styles.goalText, { color: colors.text }]}>Écrire dans le journal</Text>
                <View style={[styles.goalProgress, { backgroundColor: colors.primary + "15" }]}>
                  <Text style={[styles.goalProgressText, { color: colors.primary }]}>4/7</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          {activeTab === "featured" ? (
            featuredContent.length > 0 ? (
              featuredContent.map((item: BiblicalContent) => (
                <BiblicalContentCard
                  key={item.id}
                  content={item}
                  onPress={() => navigateToContent(item.id)}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun contenu disponible</Text>
              </View>
            )
          ) : favoriteContent.length > 0 ? (
            favoriteContent.map((item: BiblicalContent) => (
              <BiblicalContentCard
                key={item.id}
                content={item}
                onPress={() => navigateToContent(item.id)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Heart size={48} color={colors.textLight} />
              <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
              <Text style={styles.emptySubtext}>
                Ajoute des contenus à tes favoris en appuyant sur le cœur
              </Text>
            </View>
          )}
        </View>
      </View>
      <TabIndicator />
      <FloatingActionButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  header: {
    paddingHorizontal: spacing.md,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  sparkleIcon: {
    marginRight: spacing.sm,
  },
  greeting: {
    fontSize: typography.fontSizes.md,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    fontStyle: "italic",
  },
  content: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: spacing.xs,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    fontWeight: "500",
  },
  activeTabText: {
    fontWeight: "600",
  },
  contentContainer: {
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    textAlign: "center",
    marginTop: spacing.md,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: typography.fontSizes.sm,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionGradient: {
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    gap: spacing.xs,
  },
  quickActionText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600",
    color: '#FFFFFF',
  },
  progressSection: {
    marginVertical: spacing.lg,
  },
  weeklyGoals: {
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  weeklyGoalsTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  goalsList: {
    gap: spacing.sm,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  goalIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  goalText: {
    flex: 1,
    fontSize: typography.fontSizes.sm,
    fontWeight: "500",
  },
  goalProgress: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  goalProgressText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: "600",
  },
});