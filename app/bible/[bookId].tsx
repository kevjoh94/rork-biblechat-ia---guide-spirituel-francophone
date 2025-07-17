import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, ChevronRight, Play } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";

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
      <LinearGradient
        colors={[book.color + "08", colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={[book.color, book.color + "CC"]}
              style={[styles.bookIcon]}
            >
              <BookOpen size={24} color={colors.white} />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.title}>{book.name}</Text>
              <Text style={styles.subtitle}>{book.chapters} chapitres • {book.testament === "ancien" ? "Ancien Testament" : "Nouveau Testament"}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.descriptionContainer}>
          <LinearGradient
            colors={[colors.white, colors.cardSecondary]}
            style={styles.descriptionGradient}
          >
            <Text style={styles.description}>{book.description}</Text>
          </LinearGradient>
        </View>

        <View style={styles.chaptersContainer}>
          <View style={styles.chaptersTitleContainer}>
            <Text style={styles.chaptersTitle}>Chapitres</Text>
            <View style={styles.chaptersCount}>
              <Text style={styles.chaptersCountText}>{book.chapters}</Text>
            </View>
          </View>
          <View style={styles.chaptersGrid}>
            {chapters.map((chapterNumber) => (
              <TouchableOpacity
                key={chapterNumber}
                style={styles.chapterCard}
                onPress={() => navigateToChapter(chapterNumber)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[colors.white, book.color + "05"]}
                  style={styles.chapterGradient}
                >
                  <View style={styles.chapterContent}>
                    <Text style={styles.chapterNumber}>{chapterNumber}</Text>
                    <View style={[styles.playIcon, { backgroundColor: book.color + "15" }]}>
                      <Play size={12} color={book.color} fill={book.color} />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const numColumns = width > 400 ? 5 : 4;
const cardWidth = (width - (spacing.lg * 2) - (spacing.sm * (numColumns - 1))) / numColumns;

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
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    marginBottom: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white + "90",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.xxl + 2,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  scrollContainer: {
    flex: 1,
  },
  descriptionContainer: {
    margin: spacing.lg,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  descriptionGradient: {
    padding: spacing.lg,
    borderRadius: 20,
  },
  description: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.lg,
    textAlign: "center",
    fontWeight: "400",
  },
  chaptersContainer: {
    padding: spacing.lg,
  },
  chaptersTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  chaptersTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
  },
  chaptersCount: {
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  chaptersCountText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "700",
    color: colors.primary,
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chapterCard: {
    width: cardWidth,
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  chapterGradient: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border + "40",
  },
  chapterContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chapterNumber: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  playIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});