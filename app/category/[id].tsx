import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BiblicalContentCard } from "@/components/BiblicalContentCard";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { spiritualCategories } from "@/mocks/spiritual-categories";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const getContentByCategory = useSpiritualStore((state) => state.getContentByCategory);

  const category = spiritualCategories.find((c) => c.id === id);
  const content = getContentByCategory(id as string);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Catégorie non trouvée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{category.title}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {content.length > 0 ? (
            content.map((item) => (
              <BiblicalContentCard
                key={item.id}
                content={item}
                onPress={() => router.push(`/content/${item.id}`)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun contenu disponible dans cette catégorie</Text>
          )}
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
    padding: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  headerContent: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});