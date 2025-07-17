import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, Heart, Share2, Volume2, VolumeX, Bookmark } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert, Dimensions } from "react-native";
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

  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/—/g, " - ")
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const speakChapterWithExpoSpeech = async () => {
    try {
      // Check if platform supports TTS
      if (Platform.OS === 'web') {
        Alert.alert('Non supporté', "La synthèse vocale n'est pas disponible sur le web.");
        return;
      }

      if (isSpeaking) {
        // Stop current speech
        await Speech.stop();
        setIsSpeaking(false);
        return;
      }

      // Check if speech is available
      try {
        const isAvailable = await Speech.isSpeakingAsync();
        if (isAvailable) {
          await Speech.stop();
        }
      } catch (error) {
        console.warn('Could not check speech availability:', error);
      }

      setIsSpeaking(true);

      const fullText = `${book.name}, chapitre ${chapter}. ` + 
        chapterData.verses.map(verse => `Verset ${verse.number}. ${verse.text}`).join('. ');
      
      const cleanText = cleanTextForSpeech(fullText);
      
      if (!cleanText || cleanText.length === 0) {
        setIsSpeaking(false);
        Alert.alert('Erreur', "Aucun texte à lire.");
        return;
      }

      // Limit text length to prevent crashes
      const maxLength = 8000; // Longer for bible chapters
      const textToSpeak = cleanText.length > maxLength ? 
        cleanText.substring(0, maxLength) + "..." : cleanText;

      // Get available voices with error handling
      let voices: Speech.Voice[] = [];
      try {
        voices = await Speech.getAvailableVoicesAsync();
      } catch (error) {
        console.warn('Could not get available voices:', error);
      }

      // Find the best French voice
      let selectedVoice = undefined;
      
      if (voices.length > 0) {
        if (Platform.OS === 'ios') {
          const frenchVoices = voices.filter(voice => 
            voice.language && voice.language.startsWith('fr')
          );
          
          if (frenchVoices.length > 0) {
            // Try to find enhanced voices first
            const enhancedVoice = frenchVoices.find(voice => 
              voice.identifier && (
                voice.identifier.includes('premium') || 
                voice.identifier.includes('enhanced') || 
                voice.identifier.includes('Amelie')
              )
            );
            selectedVoice = enhancedVoice ? enhancedVoice.identifier : frenchVoices[0].identifier;
          }
        } else if (Platform.OS === 'android') {
          const frenchVoices = voices.filter(voice => 
            voice.language && voice.language.startsWith('fr')
          );
          
          if (frenchVoices.length > 0) {
            selectedVoice = frenchVoices[0].identifier;
          }
        }
      }

      // Configure speech options for better quality
      const speechOptions: Speech.SpeechOptions = {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.75,
        ...(selectedVoice && { voice: selectedVoice }),
        onDone: () => {
          setIsSpeaking(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
        },
        onError: (error: any) => {
          console.error('Erreur TTS:', error);
          setIsSpeaking(false);
          Alert.alert('Erreur', "Impossible de lire le chapitre. Vérifiez que votre appareil supporte la synthèse vocale.");
        }
      };

      await Speech.speak(textToSpeak, speechOptions);
    } catch (error) {
      console.error('Erreur TTS:', error);
      setIsSpeaking(false);
      
      let errorMessage = "Impossible de lire le chapitre.";
      if (error instanceof Error) {
        if (error.message.includes('not available')) {
          errorMessage = "La synthèse vocale n'est pas disponible sur cet appareil.";
        } else if (error.message.includes('language')) {
          errorMessage = "La langue française n'est pas supportée sur cet appareil.";
        }
      }
      
      Alert.alert('Erreur TTS', errorMessage);
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
            <TouchableOpacity onPress={speakChapterWithExpoSpeech} style={[styles.actionButton, isSpeaking && styles.activeActionButton]}>
              {isSpeaking ? (
                <VolumeX size={18} color={isSpeaking ? colors.white : colors.textSecondary} />
              ) : (
                <Volume2 size={18} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bookmark size={18} color={colors.textSecondary} />
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
                  <TouchableOpacity
                    onPress={() => toggleFavoriteVerse(verse.number)}
                    style={[styles.favoriteButton, favoriteVerses.includes(verse.number) && styles.activeFavoriteButton]}
                  >
                    <Heart
                      size={16}
                      color={favoriteVerses.includes(verse.number) ? colors.white : colors.textLight}
                      fill={favoriteVerses.includes(verse.number) ? colors.white : "none"}
                    />
                  </TouchableOpacity>
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