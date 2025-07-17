import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Book, Search, Star } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.white, colors.cardSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bookGradient}
      >
        <View style={styles.bookHeader}>
          <View style={[styles.bookIcon, { backgroundColor: book.color }]}>
            <Book size={18} color={colors.white} />
          </View>
          <Text style={styles.bookName}>{book.name}</Text>
        </View>
        <Text style={styles.bookDescription}>{book.description}</Text>
        <View style={styles.bookFooter}>
          <Text style={styles.chapterCount}>{book.chapters} chapitres</Text>
          <Text style={styles.testament}>{book.testament === "ancien" ? "AT" : "NT"}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.background, colors.cardSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.headerIcon}>
              <Book size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.title}>La Sainte Bible</Text>
              <Text style={styles.subtitle}>Segond 21</Text>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <Search size={18} color={colors.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un livre..."
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {oldTestament.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Star size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Ancien Testament</Text>
              <Text style={styles.sectionCount}>({oldTestament.length} livres)</Text>
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
              <Star size={20} color={colors.secondary} />
              <Text style={styles.sectionTitle}>Nouveau Testament</Text>
              <Text style={styles.sectionCount}>({newTestament.length} livres)</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  header: {
    paddingHorizontal: spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text,
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
  sectionCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  bookCard: {
    width: "48%",
    marginBottom: spacing.md,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  bookGradient: {
    borderRadius: 16,
    padding: spacing.md,
    height: 140,
  },
  bookHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  bookIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  bookName: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  bookDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
    flex: 1,
    marginBottom: spacing.sm,
  },
  bookFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterCount: {
    fontSize: typography.fontSizes.xs,
    color: colors.textLight,
    fontWeight: "500",
  },
  testament: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: "600",
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
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