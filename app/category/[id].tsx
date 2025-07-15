import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { BiblicalContentCard } from "@/components/BiblicalContentCard";
import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { spiritualCategories } from "@/mocks/spiritual-categories";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const getContentByCategory = useSpiritualStore((state) => state.getContentByCategory);

  const category = spiritualCategories.find((c) => c.id === id);
  const content = getContentByCategory(id as string);

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Catégorie non trouvée</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[
            styles.backButton,
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }
          ]}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>{category.title}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{category.description}</Text>
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
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Aucun contenu disponible dans cette catégorie</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginLeft: Platform.OS === 'ios' ? -4 : 0,
  },
  headerContent: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSizes.md,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});