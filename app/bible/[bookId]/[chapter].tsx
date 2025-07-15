import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Book, Heart, Share2, Volume2, VolumeX } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import { Audio } from "expo-av";

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
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);

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

  const speakChapterWithOpenAI = async () => {
    try {
      if (isSpeaking) {
        // Stop current audio
        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
          setCurrentSound(null);
        }
        setIsSpeaking(false);
        return;
      }

      setIsSpeaking(true);

      const fullText = `${book.name}, chapitre ${chapter}. ` + 
        chapterData.verses.map(verse => `Verset ${verse.number}. ${verse.text}`).join('. ');
      
      // Call OpenAI TTS API
      const response = await fetch('https://toolkit.rork.com/tts/speak/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: fullText,
          voice: 'nova', // OpenAI voice (nova is warm and natural)
          model: 'tts-1-hd', // High quality model
          speed: 0.8 // Slower for biblical reading
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur TTS');
      }

      const audioBlob = await response.blob();

      if (Platform.OS === 'web') {
        // Web: Create audio URL and play
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new window.Audio(audioUrl);
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      } else {
        // Mobile: Convert blob to base64 and play with expo-av
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64Audio = reader.result as string;
            const { sound } = await Audio.Sound.createAsync(
              { uri: base64Audio },
              { shouldPlay: true }
            );
            
            setCurrentSound(sound);
            
            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.didJustFinish) {
                setIsSpeaking(false);
                sound.unloadAsync();
                setCurrentSound(null);
              }
            });
          } catch (error) {
            console.error('Erreur lecture audio:', error);
            setIsSpeaking(false);
          }
        };
        reader.readAsDataURL(audioBlob);
      }
    } catch (error) {
      console.error('Erreur TTS OpenAI:', error);
      setIsSpeaking(false);
      Alert.alert('Erreur', "Impossible de lire le chapitre avec la voix OpenAI.");
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
        <TouchableOpacity onPress={speakChapterWithOpenAI} style={styles.speakButton}>
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