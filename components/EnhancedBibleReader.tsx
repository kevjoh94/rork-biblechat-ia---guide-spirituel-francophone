import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Share2, Volume2, Bookmark, Copy, Highlight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/colors';
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
      const text = `Verset ${verse.number}. ${verse.text}`;\n      await simpleTTS.speak({\n        text,\n        language: 'fr-FR',\n        rate: 0.9,\n        pitch: 1.0,\n        volume: 1.0\n      });\n    } catch (error) {\n      console.warn('Error speaking verse:', error);\n    }\n  };\n\n  const shareVerse = async (verse: Verse) => {\n    try {\n      const message = `\"${verse.text}\"\\n\\n${bookName} ${chapter}:${verse.number}\\nBible Segond 21`;\n      \n      if (Platform.OS === 'web') {\n        if (navigator.share) {\n          await navigator.share({ title: `${bookName} ${chapter}:${verse.number}`, text: message });\n        } else {\n          await navigator.clipboard.writeText(message);\n        }\n      } else {\n        await Share.share({ message, title: `${bookName} ${chapter}:${verse.number}` });\n      }\n    } catch (error) {\n      console.warn('Error sharing verse:', error);\n    }\n  };\n\n  const copyVerse = async (verse: Verse) => {\n    try {\n      const text = `${verse.text} (${bookName} ${chapter}:${verse.number})`;\n      \n      if (Platform.OS === 'web') {\n        await navigator.clipboard.writeText(text);\n      } else {\n        // For mobile, we'll use Share with copy option\n        await Share.share({ message: text });\n      }\n    } catch (error) {\n      console.warn('Error copying verse:', error);\n    }\n  };\n\n  const renderVerse = (verse: Verse) => {\n    const isFavorite = favoriteVerses.includes(verse.number);\n    const isHighlighted = highlightedVerses.includes(verse.number);\n    const isSelected = selectedVerse === verse.number;\n\n    return (\n      <View key={verse.number} style={styles.verseContainer}>\n        <TouchableOpacity\n          onPress={() => setSelectedVerse(isSelected ? null : verse.number)}\n          style={[\n            styles.verseContent,\n            isHighlighted && styles.highlightedVerse,\n            isSelected && styles.selectedVerse\n          ]}\n        >\n          <View style={styles.verseHeader}>\n            <View style={[styles.verseNumber, { backgroundColor: bookColor + '20' }]}>\n              <Text style={[styles.verseNumberText, { color: bookColor }]}>\n                {verse.number}\n              </Text>\n            </View>\n          </View>\n          \n          <Text style={[styles.verseText, { fontSize }]}>\n            {verse.text}\n          </Text>\n          \n          {isSelected && (\n            <View style={styles.verseActions}>\n              <TouchableOpacity\n                onPress={() => toggleFavorite(verse.number)}\n                style={[styles.actionButton, isFavorite && styles.activeActionButton]}\n              >\n                <Heart\n                  size={16}\n                  color={isFavorite ? colors.white : colors.textLight}\n                  fill={isFavorite ? colors.white : 'none'}\n                />\n              </TouchableOpacity>\n              \n              <TouchableOpacity\n                onPress={() => toggleHighlight(verse.number)}\n                style={[styles.actionButton, isHighlighted && styles.highlightActionButton]}\n              >\n                <Highlight\n                  size={16}\n                  color={isHighlighted ? colors.white : colors.textLight}\n                />\n              </TouchableOpacity>\n              \n              <TouchableOpacity\n                onPress={() => speakVerse(verse)}\n                style={styles.actionButton}\n              >\n                <Volume2 size={16} color={colors.textLight} />\n              </TouchableOpacity>\n              \n              <TouchableOpacity\n                onPress={() => shareVerse(verse)}\n                style={styles.actionButton}\n              >\n                <Share2 size={16} color={colors.textLight} />\n              </TouchableOpacity>\n              \n              <TouchableOpacity\n                onPress={() => copyVerse(verse)}\n                style={styles.actionButton}\n              >\n                <Copy size={16} color={colors.textLight} />\n              </TouchableOpacity>\n            </View>\n          )}\n        </TouchableOpacity>\n      </View>\n    );\n  };\n\n  return (\n    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>\n      <View style={styles.versesContainer}>\n        {verses.map(renderVerse)}\n      </View>\n    </ScrollView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n  },\n  versesContainer: {\n    padding: spacing.lg,\n  },\n  verseContainer: {\n    marginBottom: spacing.lg,\n  },\n  verseContent: {\n    backgroundColor: colors.white,\n    borderRadius: 16,\n    padding: spacing.lg,\n    shadowColor: colors.black,\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.06,\n    shadowRadius: 8,\n    elevation: 3,\n  },\n  highlightedVerse: {\n    backgroundColor: colors.accent + '15',\n    borderLeftWidth: 4,\n    borderLeftColor: colors.accent,\n  },\n  selectedVerse: {\n    borderWidth: 2,\n    borderColor: colors.primary,\n  },\n  verseHeader: {\n    marginBottom: spacing.md,\n  },\n  verseNumber: {\n    alignSelf: 'flex-start',\n    paddingHorizontal: spacing.sm,\n    paddingVertical: spacing.xs,\n    borderRadius: 12,\n    minWidth: 32,\n    alignItems: 'center',\n  },\n  verseNumberText: {\n    fontSize: typography.fontSizes.sm,\n    fontWeight: '700',\n  },\n  verseText: {\n    color: colors.text,\n    lineHeight: typography.lineHeights.lg,\n    fontWeight: '400',\n  },\n  verseActions: {\n    flexDirection: 'row',\n    justifyContent: 'flex-end',\n    marginTop: spacing.md,\n    gap: spacing.sm,\n  },\n  actionButton: {\n    width: 32,\n    height: 32,\n    borderRadius: 16,\n    backgroundColor: colors.cardSecondary,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  activeActionButton: {\n    backgroundColor: colors.primary,\n  },\n  highlightActionButton: {\n    backgroundColor: colors.accent,\n  },\n});"