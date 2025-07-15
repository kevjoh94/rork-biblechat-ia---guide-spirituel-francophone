import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Book, Heart, Share2, Volume2, VolumeX } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import * as Speech from "expo-speech";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { bibleBooks } from "@/mocks/bible-books";
import { bibleChapters } from "@/mocks/bible-chapters";
import { generateMissingChapter } from "@/utils/bible-generator";

export default function ChapterScreen() {
  const { bookId, chapter } = useLocalSearchParams<{ bookId: string; chapter: string }>();
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);

  const book = bibleBooks.find((b) => b.id === bookId);
  const chapterKey = `${bookId}-${chapter}`;
  const chapterData = bibleChapters[chapterKey] || generateMissingChapter(bookId!, parseInt(chapter!));

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Livre non trouvé</Text>
      </View>
    );
  }

  const toggleFavoriteVerse = (verseNumber: number) => {
    setFavoriteVerses(prev => 
      prev.includes(verseNumber) 
        ? prev.filter(v => v !== verseNumber)
        : [...prev, verseNumber]
    );
  };

  const speakChapterWithExpoSpeech = async () => {
    try {
      if (isSpeaking) {
        // Stop current speech
        Speech.stop();
        setIsSpeaking(false);
        return;
      }

      setIsSpeaking(true);

      const fullText = `${book.name}, chapitre ${chapter}. ` + 
        chapterData.verses.map(verse => `Verset ${verse.number}. ${verse.text}`).join('. ');
      
      // Configure speech options for better quality
      const speechOptions = {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.75, // Slower for biblical reading
        voice: Platform.OS === 'ios' ? 'com.apple.ttsbundle.Amelie-compact' : undefined,
        onDone: () => {
          setIsSpeaking(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
        },
        onError: (error: any) => {
          console.error('Erreur TTS:', error);
          setIsSpeaking(false);
        }
      };

      await Speech.speak(fullText, speechOptions);
    } catch (error) {
      console.error('Erreur TTS:', error);
      setIsSpeaking(false);
      Alert.alert('Erreur', "Impossible de lire le chapitre.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.bookIcon, { backgroundColor: book.color }]}>
            <Book size={18} color={colors.white} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{book.name} {chapter}</Text>
            <Text style={styles.subtitle}>{chapterData.verses.length} versets</Text>
          </View>
        </View>
        <TouchableOpacity onPress={speakChapterWithExpoSpeech} style={styles.speakButton}>
          {isSpeaking ? (
            <VolumeX size={20} color={colors.primary} />
          ) : (
            <Volume2 size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.versesContainer}>
          {chapterData.verses.map((verse) => (
            <View key={verse.number} style={styles.verseContainer}>
              <View style={styles.verseHeader}>
                <Text style={styles.verseNumber}>{verse.number}</Text>
                <TouchableOpacity
                  onPress={() => toggleFavoriteVerse(verse.number)}
                  style={styles.favoriteButton}
                >
                  <Heart
                    size={16}
                    color={favoriteVerses.includes(verse.number) ? colors.primary : colors.textLight}
                    fill={favoriteVerses.includes(verse.number) ? colors.primary : "none"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {book.name} - Chapitre {chapter}
          </Text>
          <Text style={styles.footerSubtext}>
            Bible Segond 21
          </Text>
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
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bookIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  speakButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  versesContainer: {
    padding: spacing.md,
  },
  verseContainer: {
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  verseNumber: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    minWidth: 32,
    textAlign: "center",
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  verseText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.md,
  },
  footer: {
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.cardSecondary,
    margin: spacing.md,
    borderRadius: 12,
  },
  footerText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});