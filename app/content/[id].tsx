import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, Share } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const content = useSpiritualStore((state) => state.content);
  const toggleFavorite = useSpiritualStore((state) => state.toggleFavorite);
  const markAsRead = useSpiritualStore((state) => state.markAsRead);

  const item = content.find((c) => c.id === id);

  if (!item) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Contenu non trouvé</Text>
      </SafeAreaView>
    );
  }

  const handleFavoritePress = () => {
    toggleFavorite(item.id);
  };

  const handleMarkAsRead = () => {
    markAsRead(item.id);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[
            styles.backButton,
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }
          ]}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleFavoritePress} 
          style={[
            styles.favoriteButton,
            {
              backgroundColor: colors.card,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }
          ]}
          activeOpacity={0.7}
        >
          <Heart
            size={20}
            color={item.isFavorite ? colors.primary : colors.textSecondary}
            fill={item.isFavorite ? colors.primary : "none"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        
        <View style={[styles.verseContainer, { backgroundColor: colors.primary }]}>
          <Text style={[styles.verse, { color: colors.white }]}>"{item.verse}"</Text>
          <Text style={[styles.reference, { color: colors.white }]}>- {item.reference}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Réflexion</Text>
        <Text style={[styles.explanation, { color: colors.text }]}>{item.explanation}</Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pour méditer</Text>
        <View style={[styles.meditationContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.meditationText, { color: colors.text }]}>
            Prends un moment pour réfléchir à ce verset. Comment peut-il s'appliquer à ta vie aujourd'hui ?
          </Text>
          <Text style={[styles.meditationText, { color: colors.text }]}>
            Ferme les yeux et laisse ces paroles pénétrer ton cœur. Que Dieu te parle à travers Sa Parole.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Prière suggérée</Text>
        <View style={[styles.prayerContainer, { backgroundColor: colors.secondary + "20", borderLeftColor: colors.secondary }]}>
          <Text style={[styles.prayerText, { color: colors.text }]}>
            "Seigneur, merci pour Ta Parole qui éclaire mon chemin. Aide-moi à vivre selon Tes enseignements et à trouver en Toi ma force et ma paix. Que Ton amour guide mes pas aujourd'hui. Amen."
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Marquer comme lu"
            onPress={handleMarkAsRead}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Platform.OS === 'ios' ? -4 : 0,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Platform.OS === 'ios' ? -4 : 0,
  },
  contentContainer: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  verseContainer: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  verse: {
    fontSize: typography.fontSizes.lg,
    lineHeight: typography.lineHeights.lg,
    fontStyle: "italic",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  reference: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  explanation: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.lg,
  },
  meditationContainer: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  meditationText: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.sm,
  },
  prayerContainer: {
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    marginBottom: spacing.lg,
  },
  prayerText: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});