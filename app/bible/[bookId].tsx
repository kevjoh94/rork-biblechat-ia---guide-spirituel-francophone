import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Book, ChevronRight } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { bibleBooks } from "@/mocks/bible-books";

export default function BookScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();

  const book = bibleBooks.find((b) => b.id === bookId);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Livre non trouvé</Text>
      </View>
    );
  }

  const navigateToChapter = (chapterNumber: number) => {
    router.push(`/bible/${bookId}/${chapterNumber}`);
  };

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.bookIcon, { backgroundColor: book.color }]}>
            <Book size={20} color={colors.white} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{book.name}</Text>
            <Text style={styles.subtitle}>{book.chapters} chapitres</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{book.description}</Text>
        </View>

        <View style={styles.chaptersContainer}>
          <Text style={styles.chaptersTitle}>Chapitres</Text>
          <View style={styles.chaptersGrid}>
            {chapters.map((chapterNumber) => (
              <TouchableOpacity
                key={chapterNumber}
                style={styles.chapterCard}
                onPress={() => navigateToChapter(chapterNumber)}
                activeOpacity={0.8}
              >
                <View style={styles.chapterContent}>
                  <Text style={styles.chapterNumber}>{chapterNumber}</Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
  bookIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  descriptionContainer: {
    padding: spacing.md,
    backgroundColor: colors.cardSecondary,
    margin: spacing.md,
    borderRadius: 12,
  },
  description: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
    textAlign: "center",
  },
  chaptersContainer: {
    padding: spacing.md,
  },
  chaptersTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chapterCard: {
    width: "18%",
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chapterContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  chapterNumber: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginRight: spacing.xs,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});