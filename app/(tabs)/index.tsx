import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle, BookOpen, Heart, Calendar, Target, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useTheme } from "@/components/ThemeProvider";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

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
    },
    card: {
      marginHorizontal: spacing.lg,
      padding: spacing.lg,
      borderRadius: 16,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.md,
    },
    verseText: {
      fontSize: typography.fontSizes.md,
      lineHeight: typography.lineHeights.lg,
      marginBottom: spacing.sm,
      fontStyle: 'italic',
    },
    verseReference: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.medium,
      textAlign: 'right',
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
    },
    actionSubtitle: {
      fontSize: typography.fontSizes.sm,
      marginTop: 2,
      textAlign: 'center',
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
    },
    journeySubtitle: {
      fontSize: typography.fontSizes.sm,
      marginTop: 2,
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
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Verset du jour</Text>
          <Text style={[styles.verseText, { color: colors.text }]}>
            "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance."
          </Text>
          <Text style={[styles.verseReference, { color: colors.textSecondary }]}>Jérémie 29:11</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors.primary + '20' }]}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <MessageCircle size={24} color={colors.primary} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>Chat IA</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>Pose tes questions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors.secondary + '20' }]}
            onPress={() => router.push('/(tabs)/bible')}
          >
            <BookOpen size={24} color={colors.secondary} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>Bible</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>Explore les Écritures</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spiritual Journey */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ton parcours spirituel</Text>
        <View style={styles.journeyGrid}>
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.peace + '20' }]}
            onPress={() => router.push('/(tabs)/meditation')}
          >
            <Heart size={24} color={colors.peace} />
            <Text style={[styles.journeyTitle, { color: colors.text }]}>Méditation</Text>
            <Text style={[styles.journeySubtitle, { color: colors.textSecondary }]}>Trouve la paix</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.hope + '20' }]}
            onPress={() => router.push('/(tabs)/journal')}
          >
            <Sparkles size={24} color={colors.hope} />
            <Text style={[styles.journeyTitle, { color: colors.text }]}>Journal</Text>
            <Text style={[styles.journeySubtitle, { color: colors.textSecondary }]}>Écris tes pensées</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.wisdom + '20' }]}
            onPress={() => router.push('/(tabs)/reading-plan')}
          >
            <Target size={24} color={colors.wisdom} />
            <Text style={[styles.journeyTitle, { color: colors.text }]}>Plan de lecture</Text>
            <Text style={[styles.journeySubtitle, { color: colors.textSecondary }]}>Progresse chaque jour</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.journeyCard, { backgroundColor: colors.gratitude + '20' }]}
            onPress={() => router.push('/calendar')}
          >
            <Calendar size={24} color={colors.gratitude} />
            <Text style={[styles.journeyTitle, { color: colors.text }]}>Calendrier</Text>
            <Text style={[styles.journeySubtitle, { color: colors.textSecondary }]}>Vois ton progrès</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

