import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export default function BibleScreen() {
  const router = useRouter();

  const bibleBooks = [
    { id: 'genese', name: 'Genèse', chapters: 50 },
    { id: 'exode', name: 'Exode', chapters: 40 },
    { id: 'matthieu', name: 'Matthieu', chapters: 28 },
    { id: 'jean', name: 'Jean', chapters: 21 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={32} color={colors.primary} />
        <Text style={styles.title}>Bible</Text>
        <Text style={styles.subtitle}>Explore les Saintes Écritures</Text>
      </View>

      <View style={styles.content}>
        {bibleBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={[styles.bookCard, { backgroundColor: colors.card }]}
            onPress={() => router.push(`/bible/${book.id}` as any)}
          >
            <Text style={[styles.bookName, { color: colors.text }]}>{book.name}</Text>
            <Text style={[styles.bookChapters, { color: colors.textSecondary }]}>
              {book.chapters} chapitres
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
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
  },
  content: {
    padding: spacing.lg,
  },
  bookCard: {
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
  },
  bookChapters: {
    fontSize: typography.fontSizes.sm,
    marginTop: spacing.xs,
  },
});