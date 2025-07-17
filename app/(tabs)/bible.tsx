import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Book, Search, Star, BookOpen, Filter } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { bibleBooks } from "@/mocks/bible-books";
import TabIndicator from "@/components/TabIndicator";

export default function BibleScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = bibleBooks.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const oldTestament = filteredBooks.filter(book => book.testament === "ancien");
  const newTestament = filteredBooks.filter(book => book.testament === "nouveau");

  const navigateToBook = (bookId: string) => {
    router.push(`/bible/${bookId}`);
  };

  const BookCard = ({ book }: { book: typeof bibleBooks[0] }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => navigateToBook(book.id)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[book.color + "08", book.color + "15"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bookGradient}
      >
        <View style={styles.bookHeader}>
          <View style={[styles.bookIcon, { backgroundColor: book.color }]}>
            <BookOpen size={20} color={colors.white} />
          </View>
          <View style={styles.bookTitleContainer}>
            <Text style={styles.bookName} numberOfLines={2}>{book.name}</Text>
            <Text style={styles.testament}>{book.testament === "ancien" ? "Ancien Testament" : "Nouveau Testament"}</Text>
          </View>
        </View>
        <Text style={styles.bookDescription} numberOfLines={3}>{book.description}</Text>
        <View style={styles.bookFooter}>
          <View style={styles.chapterBadge}>
            <Text style={styles.chapterCount}>{book.chapters}</Text>
            <Text style={styles.chapterLabel}>chapitres</Text>
          </View>
          <View style={[styles.testamentBadge, { backgroundColor: book.color + "20" }]}>
            <Text style={[styles.testamentText, { color: book.color }]}>
              {book.testament === "ancien" ? "AT" : "NT"}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary + "05", colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerIcon}
            >
              <BookOpen size={28} color={colors.white} />
            </LinearGradient>
            <View style={styles.titleTextContainer}>
              <Text style={styles.title}>La Sainte Bible</Text>
              <Text style={styles.subtitle}>Version Segond 21 • {bibleBooks.length} livres</Text>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <Search size={20} color={colors.primary} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un livre biblique..."
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {oldTestament.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[colors.primary + "15", colors.primary + "25"]}
                style={styles.sectionIconContainer}
              >
                <Star size={18} color={colors.primary} />
              </LinearGradient>
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>Ancien Testament</Text>
                <Text style={styles.sectionCount}>{oldTestament.length} livres • 39 au total</Text>
              </View>
            </View>
            
            <View style={styles.booksGrid}>
              {oldTestament.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </View>
          </>
        )}

        {newTestament.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[colors.secondary + "15", colors.secondary + "25"]}
                style={styles.sectionIconContainer}
              >
                <Star size={18} color={colors.secondary} />
              </LinearGradient>
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>Nouveau Testament</Text>
                <Text style={styles.sectionCount}>{newTestament.length} livres • 27 au total</Text>
              </View>
            </View>
            
            <View style={styles.booksGrid}>
              {newTestament.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </View>
          </>
        )}

        {filteredBooks.length === 0 && (
          <View style={styles.emptyContainer}>
            <Book size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>Aucun livre trouvé</Text>
            <Text style={styles.emptySubtext}>
              Essaie avec un autre terme de recherche
            </Text>
          </View>
        )}
      </View>
      <TabIndicator />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  titleTextContainer: {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.primary + "10",
  },
  searchIconContainer: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    fontWeight: "500",
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.textLight + "20",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.sm,
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: "600",
  },
  content: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
  },
  bookCard: {
    width: width > 400 ? "48%" : "100%",
    marginBottom: spacing.lg,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  bookGradient: {
    borderRadius: 20,
    padding: spacing.lg,
    minHeight: 160,
    borderWidth: 1,
    borderColor: colors.white + "40",
  },
  bookHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  bookIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookTitleContainer: {
    flex: 1,
  },
  bookName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: typography.lineHeights.sm,
  },
  testament: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bookDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.md,
    flex: 1,
    marginBottom: spacing.md,
    fontWeight: "400",
  },
  bookFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white + "60",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  chapterCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    fontWeight: "700",
    marginRight: spacing.xs,
  },
  chapterLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  testamentBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  testamentText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
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
});