import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';
import { X, Search, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { bibleBooks } from '@/mocks/bible-books';
import { bibleChapters } from '@/mocks/bible-chapters';

interface BibleSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (bookId: string, chapter?: number) => void;
}

interface SearchResult {
  type: 'book' | 'chapter' | 'verse';
  bookId: string;
  bookName: string;
  chapter?: number;
  verse?: number;
  text?: string;
  reference: string;
}

export default function BibleSearchModal({ visible, onClose, onNavigate }: BibleSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'books' | 'verses'>('books');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    if (activeTab === 'books') {
      // Search in book names
      bibleBooks.forEach(book => {
        if (book.name.toLowerCase().includes(query)) {
          results.push({
            type: 'book',
            bookId: book.id,
            bookName: book.name,
            reference: book.name
          });
        }
      });
    } else {
      // Search in verses (simplified - would need full Bible text)
      Object.entries(bibleChapters).forEach(([key, chapter]) => {
        const [bookId, chapterNum] = key.split('-');
        const book = bibleBooks.find(b => b.id === bookId);
        
        if (book) {
          chapter.verses.forEach(verse => {
            if (verse.text.toLowerCase().includes(query)) {
              results.push({
                type: 'verse',
                bookId,
                bookName: book.name,
                chapter: parseInt(chapterNum),
                verse: verse.number,
                text: verse.text,
                reference: `${book.name} ${chapterNum}:${verse.number}`
              });
            }
          });
        }
      });
    }

    return results.slice(0, 50); // Limit results
  }, [searchQuery, activeTab]);

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        onNavigate(item.bookId, item.chapter);
        onClose();
      }}
    >
      <View style={styles.resultIcon}>
        <BookOpen size={16} color={colors.primary} />
      </View>
      <View style={styles.resultContent}>
        <Text style={styles.resultReference}>{item.reference}</Text>
        {item.text && (
          <Text style={styles.resultText} numberOfLines={2}>
            {item.text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Rechercher dans la Bible</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={colors.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un livre, chapitre ou verset..."
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'books' && styles.activeTab]}
            onPress={() => setActiveTab('books')}
          >
            <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>
              Livres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'verses' && styles.activeTab]}
            onPress={() => setActiveTab('verses')}
          >
            <Text style={[styles.tabText, activeTab === 'verses' && styles.activeTabText]}>
              Versets
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => `${item.type}-${item.bookId}-${index}`}
          style={styles.resultsList}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            searchQuery.trim() ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
                <Text style={styles.emptySubtext}>
                  Essayez avec d'autres mots-clés
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Commencez à taper pour rechercher</Text>
                <Text style={styles.emptySubtext}>
                  Recherchez des livres, chapitres ou versets
                </Text>
              </View>
            )
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  resultsList: {
    flex: 1,
  },
  resultsContainer: {
    padding: spacing.lg,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resultContent: {
    flex: 1,
  },
  resultReference: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  resultText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.md,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    textAlign: 'center',
  },
});