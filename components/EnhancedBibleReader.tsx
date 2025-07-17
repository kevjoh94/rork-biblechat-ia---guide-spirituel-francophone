import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Share2, Volume2, Bookmark, Copy, Highlighter } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { simpleTTS } from '@/utils/simple-tts';

interface Verse {
  number: number;
  text: string;
}

interface EnhancedBibleReaderProps {
  verses: Verse[];
  bookName: string;
  chapter: number;
  bookColor: string;
}

export default function EnhancedBibleReader({ 
  verses, 
  bookName, 
  chapter, 
  bookColor 
}: EnhancedBibleReaderProps) {
  const { colors } = useTheme();
  const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    loadUserData();
  }, [bookName, chapter]);

  const loadUserData = async () => {
    try {
      const favorites = await AsyncStorage.getItem(`favorites_${bookName}_${chapter}`);
      const highlights = await AsyncStorage.getItem(`highlights_${bookName}_${chapter}`);
      const savedFontSize = await AsyncStorage.getItem('bible_font_size');
      
      if (favorites) setFavoriteVerses(JSON.parse(favorites));
      if (highlights) setHighlightedVerses(JSON.parse(highlights));
      if (savedFontSize) setFontSize(parseInt(savedFontSize));
    } catch (error) {
      console.warn('Error loading user data:', error);
    }
  };

  const toggleFavorite = async (verseNumber: number) => {
    const newFavorites = favoriteVerses.includes(verseNumber)
      ? favoriteVerses.filter(v => v !== verseNumber)
      : [...favoriteVerses, verseNumber];
    
    setFavoriteVerses(newFavorites);
    await AsyncStorage.setItem(`favorites_${bookName}_${chapter}`, JSON.stringify(newFavorites));
  };

  const toggleHighlight = async (verseNumber: number) => {
    const newHighlights = highlightedVerses.includes(verseNumber)
      ? highlightedVerses.filter(v => v !== verseNumber)
      : [...highlightedVerses, verseNumber];
    
    setHighlightedVerses(newHighlights);
    await AsyncStorage.setItem(`highlights_${bookName}_${chapter}`, JSON.stringify(newHighlights));
  };

  const speakVerse = async (verse: Verse) => {
    try {
      const text = `Verset ${verse.number}. ${verse.text}`;
      await simpleTTS.speak({
        text,
        language: 'fr-FR',
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0
      });
    } catch (error) {
      console.warn('Error speaking verse:', error);
    }
  };

  const shareVerse = async (verse: Verse) => {
    try {
      const message = `"${verse.text}"

${bookName} ${chapter}:${verse.number}
Bible Segond 21`;
      
      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({ title: `${bookName} ${chapter}:${verse.number}`, text: message });
        } else {
          await navigator.clipboard.writeText(message);
        }
      } else {
        await Share.share({ message, title: `${bookName} ${chapter}:${verse.number}` });
      }
    } catch (error) {
      console.warn('Error sharing verse:', error);
    }
  };

  const copyVerse = async (verse: Verse) => {
    try {
      const text = `${verse.text} (${bookName} ${chapter}:${verse.number})`;
      
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(text);
      } else {
        await Share.share({ message: text });
      }
    } catch (error) {
      console.warn('Error copying verse:', error);
    }
  };

  const renderVerse = (verse: Verse) => {
    const isFavorite = favoriteVerses.includes(verse.number);
    const isHighlighted = highlightedVerses.includes(verse.number);
    const isSelected = selectedVerse === verse.number;

    return (
      <View key={verse.number} style={styles.verseContainer}>
        <TouchableOpacity
          onPress={() => setSelectedVerse(isSelected ? null : verse.number)}
          style={[
            styles.verseContent,
            { backgroundColor: colors.card },
            isHighlighted && [styles.highlightedVerse, { backgroundColor: colors.warning + '20', borderLeftColor: colors.warning }],
            isSelected && [styles.selectedVerse, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]
          ]}
        >
          <View style={styles.verseHeader}>
            <Text style={[styles.verseNumber, { color: bookColor }]}>
              {verse.number}
            </Text>
          </View>
          <Text style={[styles.verseText, { fontSize, color: colors.text }]}>
            {verse.text}
          </Text>
        </TouchableOpacity>

        {isSelected && (
          <View style={[styles.actionBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background }, isFavorite && { backgroundColor: colors.primary + '20' }]}
              onPress={() => toggleFavorite(verse.number)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? colors.error : colors.textSecondary}
                fill={isFavorite ? colors.error : 'transparent'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background }, isHighlighted && { backgroundColor: colors.primary + '20' }]}
              onPress={() => toggleHighlight(verse.number)}
            >
              <Highlighter 
                size={20} 
                color={isHighlighted ? colors.warning : colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background }]}
              onPress={() => speakVerse(verse)}
            >
              <Volume2 size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background }]}
              onPress={() => shareVerse(verse)}
            >
              <Share2 size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.background }]}
              onPress={() => copyVerse(verse)}
            >
              <Copy size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[bookColor + '10', 'transparent']}
        style={styles.header}
      >
        <Text style={[styles.chapterTitle, { color: bookColor }]}>
          {bookName} {chapter}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {verses.map(renderVerse)}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Bible Segond 21 • {verses.length} versets
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  chapterTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  verseContainer: {
    marginBottom: spacing.md,
  },
  verseContent: {
    padding: spacing.md,
    borderRadius: 8,
  },
  highlightedVerse: {
    borderLeftWidth: 3,
  },
  selectedVerse: {
    borderWidth: 1,
  },
  verseHeader: {
    marginBottom: spacing.xs,
  },
  verseNumber: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
  },
  verseText: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.lg,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderTopWidth: 1,
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: 6,
  },
  activeAction: {
  },
  footer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.sm,
  },
});