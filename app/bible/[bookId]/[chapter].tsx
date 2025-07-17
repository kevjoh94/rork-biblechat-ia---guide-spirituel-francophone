import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, Heart, Share2, Volume2, VolumeX, Bookmark, Settings } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert, Dimensions, Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { simpleTTS } from "@/utils/simple-tts";
import SpeechSettings from "@/components/SpeechSettings";

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
  const [bookmarkedChapter, setBookmarkedChapter] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [showSettings, setShowSettings] = useState(false);

  const book = bibleBooks.find((b) => b.id === bookId);
  const chapterKey = `${bookId}-${chapter}`;
  const chapterData = bibleChapters[chapterKey] || generateMissingChapter(bookId!, parseInt(chapter!));

  // Load bookmarks and speech settings on component mount
  useEffect(() => {
    loadBookmarks();
    loadSpeechSettings();
  }, [bookId, chapter]);

  // Cleanup speech when component unmounts
  useEffect(() => {
    return () => {
      simpleTTS.stop();
    };
  }, []);

  const loadBookmarks = async () => {
    try {
      const verseBookmarks = await AsyncStorage.getItem(`bible_verses_${bookId}_${chapter}`);
      const chapterBookmarks = await AsyncStorage.getItem(`bible_chapters`);
      
      if (verseBookmarks) {
        setFavoriteVerses(JSON.parse(verseBookmarks));
      }
      
      if (chapterBookmarks) {
        const bookmarks = JSON.parse(chapterBookmarks);
        setBookmarkedChapter(bookmarks.includes(chapterKey));
      }
    } catch (error) {
      console.warn('Error loading bookmarks:', error);
    }
  };

  const saveVerseBookmarks = async (verses: number[]) => {
    try {
      await AsyncStorage.setItem(`bible_verses_${bookId}_${chapter}`, JSON.stringify(verses));
    } catch (error) {
      console.warn('Error saving verse bookmarks:', error);
    }
  };

  const saveChapterBookmarks = async (bookmarks: string[]) => {
    try {
      await AsyncStorage.setItem('bible_chapters', JSON.stringify(bookmarks));
    } catch (error) {
      console.warn('Error saving chapter bookmarks:', error);
    }
  };

  const loadSpeechSettings = async () => {
    try {
      const savedRate = await AsyncStorage.getItem('speech_rate');
      if (savedRate) {
        setSpeechRate(parseFloat(savedRate));
      }
    } catch (error) {
      console.warn('Error loading speech settings:', error);
    }
  };

  const saveSpeechSettings = async (rate: number) => {
    try {
      await AsyncStorage.setItem('speech_rate', rate.toString());
      setSpeechRate(rate);
    } catch (error) {
      console.warn('Error saving speech settings:', error);
    }
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Livre non trouvé</Text>
      </View>
    );
  }

  const toggleFavoriteVerse = async (verseNumber: number) => {
    const newFavorites = favoriteVerses.includes(verseNumber) 
      ? favoriteVerses.filter(v => v !== verseNumber)
      : [...favoriteVerses, verseNumber];
    
    setFavoriteVerses(newFavorites);
    await saveVerseBookmarks(newFavorites);
  };

  const toggleChapterBookmark = async () => {
    try {
      const existingBookmarks = await AsyncStorage.getItem('bible_chapters');
      let bookmarks: string[] = existingBookmarks ? JSON.parse(existingBookmarks) : [];
      
      if (bookmarkedChapter) {
        bookmarks = bookmarks.filter(b => b !== chapterKey);
      } else {
        bookmarks.push(chapterKey);
      }
      
      setBookmarkedChapter(!bookmarkedChapter);
      await saveChapterBookmarks(bookmarks);
    } catch (error) {
      console.warn('Error toggling chapter bookmark:', error);
    }
  };

  const speakVerse = async (verseText: string, verseNumber: number) => {
    try {
      // Check if TTS is available
      if (!simpleTTS.isAvailable()) {
        Alert.alert('Non disponible', 'La synthèse vocale n\'est pas disponible sur cet appareil.');
        return;
      }

      const text = `Verset ${verseNumber}. ${verseText}`;
      const cleanText = cleanTextForSpeech(text);
      
      if (!cleanText || cleanText.trim().length === 0) {
        Alert.alert('Erreur', 'Aucun texte à lire.');
        return;
      }
      
      await simpleTTS.speak({
        text: cleanText,
        language: 'fr-FR',
        rate: speechRate,
        pitch: 1.0,
        volume: 1.0
      });
    } catch (error) {
      console.warn('Error speaking verse:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      Alert.alert('Erreur TTS', `Impossible de lire le verset: ${errorMessage}`);
    }
  };

  const shareVerse = async (verseText: string, verseNumber: number) => {
    try {
      const message = `"${verseText}"\n\n${book?.name} ${chapter}:${verseNumber}\nBible Segond 21`;
      
      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: `${book?.name} ${chapter}:${verseNumber}`,
            text: message,
          });
        } else {
          // Fallback for web browsers without native share
          await navigator.clipboard.writeText(message);
          Alert.alert('Copié', 'Le verset a été copié dans le presse-papiers.');
        }
      } else {
        await Share.share({
          message,
          title: `${book?.name} ${chapter}:${verseNumber}`,
        });
      }
    } catch (error) {
      console.warn('Error sharing verse:', error);
    }
  };

  const cleanTextForSpeech = (text: string): string => {
    if (!text || typeof text !== 'string') {
      return '';
    }
    
    return text
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      
      // Normalize quotes and dashes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/—/g, " - ")
      .replace(/–/g, " - ")
      
      // Handle line breaks
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ', ')
      
      // Clean up punctuation for speech
      .replace(/\.\.\./g, ', ')
      .replace(/[;:]/g, ', ')
      .replace(/\s*,\s*,\s*/g, ', ')
      .replace(/\s*\.\s*\.\s*/g, '. ')
      
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s*\.\s*/g, '. ')
      
      // Remove empty sentences
      .replace(/\.\s*\./g, '.')
      .replace(/,\s*,/g, ',')
      
      .trim();
  };

  const speakChapter = async () => {
    try {
      if (isSpeaking) {
        // Stop current speech
        simpleTTS.stop();
        setIsSpeaking(false);
        return;
      }

      // Check if TTS is available
      if (!simpleTTS.isAvailable()) {
        Alert.alert('Non disponible', 'La synthèse vocale n\'est pas disponible sur cet appareil.');
        return;
      }

      setIsSpeaking(true);

      const fullText = `${book?.name}, chapitre ${chapter}. ` + 
        chapterData.verses.map(verse => `Verset ${verse.number}. ${verse.text}`).join('. ');
      
      const cleanText = cleanTextForSpeech(fullText);
      
      if (!cleanText || cleanText.trim().length === 0) {
        setIsSpeaking(false);
        Alert.alert('Erreur', "Aucun texte à lire.");
        return;
      }

      // Split long text into chunks for better reliability
      const maxChunkLength = 500;
      if (cleanText.length > maxChunkLength) {
        const sentences = cleanText.split('. ');
        let currentChunk = '';
        
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length > maxChunkLength && currentChunk.length > 0) {
            await simpleTTS.speak({
              text: currentChunk,
              language: 'fr-FR',
              rate: speechRate,
              pitch: 1.0,
              volume: 1.0
            });
            currentChunk = sentence + '. ';
          } else {
            currentChunk += sentence + '. ';
          }
        }
        
        // Speak the remaining chunk
        if (currentChunk.trim().length > 0) {
          await simpleTTS.speak({
            text: currentChunk,
            language: 'fr-FR',
            rate: speechRate,
            pitch: 1.0,
            volume: 1.0
          });
        }
      } else {
        await simpleTTS.speak({
          text: cleanText,
          language: 'fr-FR',
          rate: speechRate,
          pitch: 1.0,
          volume: 1.0
        });
      }

      setIsSpeaking(false);
    } catch (error) {
      console.error('Erreur TTS:', error);
      setIsSpeaking(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      Alert.alert('Erreur TTS', `Impossible de lire le chapitre: ${errorMessage}`);
    }
  };

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
            <ArrowLeft size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={[book.color, book.color + "CC"]}
              style={styles.bookIcon}
            >
              <BookOpen size={20} color={colors.white} />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.title}>{book.name}</Text>
              <Text style={styles.chapterTitle}>Chapitre {chapter}</Text>
              <Text style={styles.subtitle}>{chapterData.verses.length} versets</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.actionButton}>
              <Settings size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={speakChapter} style={[styles.actionButton, isSpeaking && styles.activeActionButton]}>
              {isSpeaking ? (
                <VolumeX size={18} color={isSpeaking ? colors.white : colors.textSecondary} />
              ) : (
                <Volume2 size={18} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleChapterBookmark} style={[styles.actionButton, bookmarkedChapter && styles.activeActionButton]}>
              <Bookmark size={18} color={bookmarkedChapter ? colors.white : colors.textSecondary} fill={bookmarkedChapter ? colors.white : "none"} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.versesContainer}>
          {chapterData.verses.map((verse, index) => (
            <View key={verse.number} style={styles.verseContainer}>
              <LinearGradient
                colors={[colors.white, colors.cardSecondary + "40"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.verseGradient}
              >
                <View style={styles.verseHeader}>
                  <LinearGradient
                    colors={[book.color + "15", book.color + "25"]}
                    style={styles.verseNumberContainer}
                  >
                    <Text style={[styles.verseNumber, { color: book.color }]}>{verse.number}</Text>
                  </LinearGradient>
                  <View style={styles.verseActions}>
                    <TouchableOpacity
                      onPress={() => speakVerse(verse.text, verse.number)}
                      style={styles.verseActionButton}
                    >
                      <Volume2 size={14} color={colors.textLight} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => shareVerse(verse.text, verse.number)}
                      style={styles.verseActionButton}
                    >
                      <Share2 size={14} color={colors.textLight} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleFavoriteVerse(verse.number)}
                      style={[styles.verseActionButton, favoriteVerses.includes(verse.number) && styles.activeVerseActionButton]}
                    >
                      <Heart
                        size={14}
                        color={favoriteVerses.includes(verse.number) ? colors.white : colors.textLight}
                        fill={favoriteVerses.includes(verse.number) ? colors.white : "none"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.verseText}>{verse.text}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>

        <LinearGradient
          colors={[book.color + "08", book.color + "15"]}
          style={styles.footer}
        >
          <View style={styles.footerContent}>
            <LinearGradient
              colors={[book.color, book.color + "CC"]}
              style={styles.footerIcon}
            >
              <BookOpen size={16} color={colors.white} />
            </LinearGradient>
            <View style={styles.footerText}>
              <Text style={styles.footerTitle}>
                {book.name} - Chapitre {chapter}
              </Text>
              <Text style={styles.footerSubtext}>
                Bible Segond 21 • {chapterData.verses.length} versets
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <SpeechSettings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        speechRate={speechRate}
        onSpeechRateChange={saveSpeechSettings}
      />
    </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white + "90",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bookIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
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
    fontSize: typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chapterTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    fontWeight: "500",
  },
  headerActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white + "80",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeActionButton: {
    backgroundColor: colors.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  versesContainer: {
    padding: spacing.lg,
  },
  verseContainer: {
    marginBottom: spacing.lg,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  verseGradient: {
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border + "30",
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  verseNumberContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minWidth: 40,
    alignItems: "center",
  },
  verseNumber: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "700",
    textAlign: "center",
  },
  verseActions: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  verseActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary + "60",
    justifyContent: "center",
    alignItems: "center",
  },
  activeVerseActionButton: {
    backgroundColor: colors.primary,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary + "60",
    justifyContent: "center",
    alignItems: "center",
  },
  activeFavoriteButton: {
    backgroundColor: colors.primary,
  },
  verseText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    lineHeight: typography.lineHeights.lg,
    fontWeight: "400",
  },
  footer: {
    margin: spacing.lg,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
  },
  footerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  footerText: {
    flex: 1,
  },
  footerTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});