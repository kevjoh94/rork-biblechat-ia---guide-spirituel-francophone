import { useRouter } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BiblicalContentCard } from "@/components/BiblicalContentCard";
import { Button } from "@/components/Button";
import { DailyVerseCard } from "@/components/DailyVerseCard";
import { SpiritualCategoryCard } from "@/components/SpiritualCategoryCard";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { spiritualCategories } from "@/mocks/spiritual-categories";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"featured" | "favorites">("featured");
  const content = useSpiritualStore((state) => state.content);
  const getFavorites = useSpiritualStore((state) => state.getFavorites);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);

  const featuredContent = content.slice(0, 4);
  const favoriteContent = getFavorites();
  const dailyVerse = getDailyVerse();

  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const navigateToContent = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const navigateToChat = () => {
    router.push("/chat");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Que la paix soit avec toi</Text>
        <Text style={styles.title}>BibleChat IA</Text>
      </View>

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
        variant="secondary"
      />

      <Text style={styles.sectionTitle}>Catégories spirituelles</Text>
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
        <Text
          style={[
            styles.tabText,
            activeTab === "featured" && styles.activeTabText,
          ]}
          onPress={() => setActiveTab("featured")}
        >
          À la une
        </Text>
        <Text
          style={[
            styles.tabText,
            activeTab === "favorites" && styles.activeTabText,
          ]}
          onPress={() => setActiveTab("favorites")}
        >
          Favoris
        </Text>
      </View>

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
            <Text style={styles.emptyText}>Aucun contenu disponible</Text>
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
          <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
        )}
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
  greeting: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.textSecondary,
    marginRight: spacing.lg,
    paddingBottom: spacing.xs,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  contentContainer: {
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: spacing.lg,
  },
});