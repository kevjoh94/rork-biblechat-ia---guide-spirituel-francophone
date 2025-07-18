import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { BookOpen, Search, Star, Clock, TrendingUp, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpiritualStore } from '@/store/spiritual-store';

export default function BibleScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const stats = useSpiritualStore((state) => state.stats);

  const bibleBooks = [
    // Ancien Testament
    { id: 'genese', name: 'Genèse', chapters: 50, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'exode', name: 'Exode', chapters: 40, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'levitique', name: 'Lévitique', chapters: 27, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'nombres', name: 'Nombres', chapters: 36, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'deuteronome', name: 'Deutéronome', chapters: 34, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'psaumes', name: 'Psaumes', chapters: 150, category: 'ancien', testament: 'Ancien Testament' },
    { id: 'proverbes', name: 'Proverbes', chapters: 31, category: 'ancien', testament: 'Ancien Testament' },
    
    // Nouveau Testament
    { id: 'matthieu', name: 'Matthieu', chapters: 28, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'marc', name: 'Marc', chapters: 16, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'luc', name: 'Luc', chapters: 24, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'jean', name: 'Jean', chapters: 21, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'actes', name: 'Actes', chapters: 28, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'romains', name: 'Romains', chapters: 16, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: '1corinthiens', name: '1 Corinthiens', chapters: 16, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'ephesiens', name: 'Éphésiens', chapters: 6, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'philippiens', name: 'Philippiens', chapters: 4, category: 'nouveau', testament: 'Nouveau Testament' },
    { id: 'apocalypse', name: 'Apocalypse', chapters: 22, category: 'nouveau', testament: 'Nouveau Testament' },
  ];
  
  const categories = [
    { id: 'all', name: 'Tous', icon: BookOpen },
    { id: 'ancien', name: 'A.T.', icon: Star },
    { id: 'nouveau', name: 'N.T.', icon: TrendingUp },
  ];
  
  const filteredBooks = bibleBooks.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const totalChapters = bibleBooks.reduce((sum, book) => sum + book.chapters, 0);
  const totalVerses = 31102; // Approximation
  
  const styles = createStyles(colors);

  const renderBookCard = ({ item: book }: { item: typeof bibleBooks[0] }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => router.push(`/bible/${book.id}` as any)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={book.category === 'ancien' ? [colors.wisdom + '20', colors.wisdom + '10'] : [colors.primary + '20', colors.primary + '10']}
        style={styles.bookGradient}
      >
        <View style={styles.bookHeader}>
          <Text style={styles.bookName}>{book.name}</Text>
          <Text style={styles.testament}>{book.testament}</Text>
        </View>
        <Text style={styles.bookChapters}>
          {book.chapters} chapitre{book.chapters > 1 ? 's' : ''}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Stats */}
      <LinearGradient
        colors={[colors.primary + '10', colors.transparent]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <BookOpen size={32} color={colors.primary} />
          <Text style={styles.title}>Bible</Text>
          <Text style={styles.subtitle}>Explore les Saintes Écritures</Text>
          
          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{bibleBooks.length}</Text>
              <Text style={styles.statLabel}>Livres</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalChapters}</Text>
              <Text style={styles.statLabel}>Chapitres</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalVerses.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Versets</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un livre..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  isSelected && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent 
                  size={16} 
                  color={isSelected ? colors.white : colors.textSecondary} 
                />
                <Text style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Books List */}
      <FlatList
        data={filteredBooks}
        renderItem={renderBookCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.booksContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text,
  },
  categoryContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  categoryTextActive: {
    color: colors.white,
  },
  booksContainer: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  bookCard: {
    flex: 1,
    margin: spacing.xs,
    borderRadius: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookGradient: {
    padding: spacing.md,
    borderRadius: 16,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  bookHeader: {
    marginBottom: spacing.sm,
  },
  bookName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  testament: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  bookChapters: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
});