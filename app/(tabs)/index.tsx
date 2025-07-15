import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MessageCircle, Sparkles, Star, Heart, Calendar, BookOpen, Target } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { BiblicalContentCard } from "@/components/BiblicalContentCard";
import { Button } from "@/components/Button";
import { DailyVerseCard } from "@/components/DailyVerseCard";
import { SpiritualCategoryCard } from "@/components/SpiritualCategoryCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { spiritualCategories } from "@/mocks/spiritual-categories";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"featured" | "favorites">("featured");
  const content = useSpiritualStore((state) => state.content);
  const getFavorites = useSpiritualStore((state) => state.getFavorites);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);

  const featuredContent = content.slice(0, 4);
  const favoriteContent = getFavorites();
  const dailyVerse = getDailyVerse();
  
  useEffect(() => {
    initializeDailyVerse();
  }, [initializeDailyVerse]);

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
            <Text style={styles.greeting}>Que la paix soit avec toi</Text>
          </View>
          <Text style={styles.title}>BibleChat IA</Text>
          <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
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

        {/* Progress Tracker */}
        <ProgressTracker />
        
        <View style={styles.contentContainer}>
          {activeTab === "featured" ? (
            featuredContent.length > 0 ? (
              featuredContent.map((item) => (
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
            favoriteContent.map((item) => (
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
    color: colors.textSecondary,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
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
    color: colors.text,
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
    backgroundColor: colors.cardSecondary,
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
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
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
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    borderRadius: 12,
    shadowColor: colors.black,
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
    color: colors.white,
    fontWeight: "600",
  },
});