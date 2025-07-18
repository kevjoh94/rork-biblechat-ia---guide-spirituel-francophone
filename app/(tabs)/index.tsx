import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle, BookOpen, Heart, Calendar, Target, Sparkles, User, Crown, TrendingUp, Award, Flame } from "lucide-react-native";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { useTheme } from "@/components/ThemeProvider";
import { DailyVerseCard } from "@/components/DailyVerseCard";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  
  // Get data from store
  const dailyVerse = useSpiritualStore((state) => state.dailyVerse);
  const stats = useSpiritualStore((state) => state.stats);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);

  useEffect(() => {
    initializeDailyVerse();
    
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
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
    animatedContainer: {
      opacity: 1,
    },
    weeklyGoalsCard: {
      backgroundColor: colors.card,
      marginHorizontal: spacing.lg,
      padding: spacing.lg,
      borderRadius: 16,
      marginBottom: spacing.lg,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    goalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    goalProgress: {
      flex: 1,
      marginLeft: spacing.sm,
    },
    goalText: {
      fontSize: typography.fontSizes.sm,
      color: colors.text,
      marginBottom: 4,
    },
    progressBar: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
    },
    achievementBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success + '20',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 12,
      marginTop: spacing.sm,
    },
    achievementText: {
      fontSize: typography.fontSizes.sm,
      color: colors.success,
      marginLeft: spacing.xs,
      fontWeight: typography.fontWeights.semibold,
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour ! 🌅";
    if (hour < 18) return "Bon après-midi ! ☀️";
    return "Bonsoir ! 🌙";
  };
  
  const weeklyGoals = [
    { icon: BookOpen, text: "Lire 5 chapitres", progress: 0.6, color: colors.primary },
    { icon: Heart, text: "Méditer 3 fois", progress: 0.33, color: colors.peace },
    { icon: Sparkles, text: "Écrire dans le journal", progress: 0.8, color: colors.hope },
  ];
  
  return (
    <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary + '10', colors.transparent] as readonly [string, string]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.title}>BibleChat IA</Text>
          <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
        </View>
      </LinearGradient>

      {/* Daily Verse Card */}
      <Animated.View style={[styles.section, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.dailyVerseContainer}>
          <DailyVerseCard
            verse={currentVerse?.verse || "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance."}
            reference={currentVerse?.reference || "Jérémie 29:11"}
            message={currentVerse?.message || "Dieu a un plan merveilleux pour ta vie. Fais-lui confiance aujourd'hui."}
          />
        </View>
      </Animated.View>

      {/* Enhanced Stats */}
      <View style={styles.section}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Flame size={20} color={colors.warning} />
            <Text style={styles.statValue}>{stats?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Série de jours</Text>
          </View>
          <View style={styles.statItem}>
            <BookOpen size={20} color={colors.primary} />
            <Text style={styles.statValue}>{stats?.totalReadings || 0}</Text>
            <Text style={styles.statLabel}>Lectures</Text>
          </View>
          <View style={styles.statItem}>
            <Crown size={20} color={colors.accent} />
            <Text style={styles.statValue}>{stats?.level || 1}</Text>
            <Text style={styles.statLabel}>Niveau</Text>
          </View>
        </View>
        
        {stats?.currentStreak && stats.currentStreak >= 7 && (
          <View style={styles.achievementBadge}>
            <Award size={16} color={colors.success} />
            <Text style={styles.achievementText}>Félicitations ! 7 jours consécutifs !</Text>
          </View>
        )}
      </View>
      
      {/* Weekly Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objectifs de la semaine</Text>
        <View style={styles.weeklyGoalsCard}>
          {weeklyGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <View key={index} style={styles.goalItem}>
                <IconComponent size={20} color={goal.color} />
                <View style={styles.goalProgress}>
                  <Text style={styles.goalText}>{goal.text}</Text>
                  <View style={styles.progressBar}>
                    <Animated.View 
                      style={[
                        styles.progressFill,
                        { 
                          backgroundColor: goal.color,
                          width: `${goal.progress * 100}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            );
          })}
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
    </Animated.View>
  );
}