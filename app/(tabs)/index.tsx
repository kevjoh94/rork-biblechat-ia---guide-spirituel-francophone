import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle, BookOpen, Heart, Calendar, Target, Sparkles, User, Crown } from "lucide-react-native";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { useTheme } from "@/components/ThemeProvider";
import { DailyVerseCard } from "@/components/DailyVerseCard";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  // Get data from store
  const dailyVerse = useSpiritualStore((state) => state.dailyVerse);
  const stats = useSpiritualStore((state) => state.stats);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);

  useEffect(() => {
    initializeDailyVerse();
  }, [initializeDailyVerse]);

  const currentVerse = dailyVerse || getDailyVerse();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
    },
    headerContent: {
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
    },
    greeting: {
      fontSize: typography.fontSizes.lg,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    title: {
      fontSize: typography.fontSizes.xxxl,
      fontWeight: typography.fontWeights.bold,
      color: colors.text,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: typography.fontSizes.md,
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
      color: colors.text,
    },
    dailyVerseContainer: {
      paddingHorizontal: spacing.lg,
    },
    actionsGrid: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    actionCard: {
      flex: 1,
      padding: spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      minHeight: 100,
      justifyContent: 'center',
    },
    actionTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginTop: spacing.xs,
      textAlign: 'center',
      color: colors.text,
    },
    actionSubtitle: {
      fontSize: typography.fontSizes.sm,
      marginTop: 2,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    journeyGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    journeyCard: {
      flex: 1,
      minWidth: '45%',
      padding: spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      minHeight: 100,
      justifyContent: 'center',
    },
    journeyTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginTop: spacing.xs,
      textAlign: 'center',
      color: colors.text,
    },
    journeySubtitle: {
      fontSize: typography.fontSizes.sm,
      marginTop: 2,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    statsCard: {
      backgroundColor: colors.card,
      marginHorizontal: spacing.lg,
      padding: spacing.lg,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    statLabel: {
      fontSize: typography.fontSizes.sm,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    bottomPadding: {
      height: spacing.xl,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary + '10', colors.transparent] as readonly [string, string]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Bonjour ! 🙏</Text>
          <Text style={styles.title}>BibleChat IA</Text>
          <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
        </View>
      </LinearGradient>

      {/* Daily Verse Card */}
      <View style={styles.section}>
        <View style={styles.dailyVerseContainer}>
          <DailyVerseCard
            verse={currentVerse?.verse || "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance."}
            reference={currentVerse?.reference || "Jérémie 29:11"}
            message={currentVerse?.message || "Dieu a un plan merveilleux pour ta vie. Fais-lui confiance aujourd'hui."}
          />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Série</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats?.totalReadings || 0}</Text>
            <Text style={styles.statLabel}>Lectures</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats?.level || 1}</Text>
            <Text style={styles.statLabel}>Niveau</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors.primary + '20' }]}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <MessageCircle size={24} color={colors.primary} />
            <Text style={styles.actionTitle}>Chat IA</Text>
            <Text style={styles.actionSubtitle}>Pose tes questions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors.secondary + '20' }]}
            onPress={() => router.push('/(tabs)/bible')}
          >
            <BookOpen size={24} color={colors.secondary} />
            <Text style={styles.actionTitle}>Bible</Text>
            <Text style={styles.actionSubtitle}>Explore les Écritures</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spiritual Journey */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ton parcours spirituel</Text>
        <View style={styles.journeyGrid}>
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.peace + '20' }]}
            onPress={() => router.push('/(tabs)/meditation')}
          >
            <Heart size={24} color={colors.peace} />
            <Text style={styles.journeyTitle}>Méditation</Text>
            <Text style={styles.journeySubtitle}>Trouve la paix</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.hope + '20' }]}
            onPress={() => router.push('/(tabs)/journal')}
          >
            <Sparkles size={24} color={colors.hope} />
            <Text style={styles.journeyTitle}>Journal</Text>
            <Text style={styles.journeySubtitle}>Écris tes pensées</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.wisdom + '20' }]}
            onPress={() => router.push('/(tabs)/reading-plan')}
          >
            <Target size={24} color={colors.wisdom} />
            <Text style={styles.journeyTitle}>Plan de lecture</Text>
            <Text style={styles.journeySubtitle}>Progresse chaque jour</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.gratitude + '20' }]}
            onPress={() => router.push('/calendar')}
          >
            <Calendar size={24} color={colors.gratitude} />
            <Text style={styles.journeyTitle}>Calendrier</Text>
            <Text style={styles.journeySubtitle}>Vois ton progrès</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}