import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Platform, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle, BookOpen, Heart, Calendar, Target, Sparkles, User, Crown, TrendingUp, Award, Flame, Sun, Moon, Star } from "lucide-react-native";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { useTheme } from "@/components/ThemeProvider";
import { DailyVerseCard } from "@/components/DailyVerseCard";
import { SkeletonHome } from "@/components/SkeletonLoader";
import { animations, interpolations } from "@/utils/animations";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [isLoading, setIsLoading] = useState(true);
  
  // Get data from store
  const dailyVerse = useSpiritualStore((state) => state.dailyVerse);
  const stats = useSpiritualStore((state) => state.stats);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      initializeDailyVerse();
      setIsLoading(false);
      
      // Animate entrance
      Animated.parallel([
        animations.fadeIn(fadeAnim, 800),
        animations.slideInUp(slideAnim, 600)
      ]).start();
    };
    
    loadData();
  }, [initializeDailyVerse, fadeAnim, slideAnim]);

  const currentVerse = dailyVerse || getDailyVerse();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 400,
      opacity: 0.1,
    },
    header: {
      paddingTop: spacing.huge,
      paddingBottom: spacing.section,
      position: 'relative',
      overflow: 'hidden',
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    headerContent: {
      paddingHorizontal: spacing.screen,
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    },
    decorativeElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: spacing.screen,
    },
    decorativeIcon: {
      opacity: 0.1,
    },
    greeting: {
      ...typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
      letterSpacing: 0.2,
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    title: {
      ...typography.display,
      color: colors.text,
      marginBottom: spacing.sm,
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '700',
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      ...typography.body,
      color: colors.textLight,
      textAlign: 'center',
      fontStyle: 'italic',
      letterSpacing: 0.3,
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    section: {
      marginBottom: spacing.section,
    },
    sectionTitle: {
      ...typography.h3,
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.screen,
      color: colors.text,
    },
    dailyVerseContainer: {
      paddingHorizontal: spacing.screen,
    },
    actionsGrid: {
      flexDirection: 'row',
      paddingHorizontal: spacing.screen,
      gap: spacing.lg,
    },
    actionCard: {
      flex: 1,
      padding: spacing.card,
      borderRadius: spacing.radius.xl,
      alignItems: 'center',
      minHeight: 130,
      justifyContent: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
      overflow: 'hidden',
    },
    actionCardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.8,
    },
    actionCardContent: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    actionTitle: {
      ...typography.bodyBold,
      marginTop: spacing.sm,
      textAlign: 'center',
      color: colors.text,
    },
    actionSubtitle: {
      ...typography.caption,
      marginTop: spacing.xxs,
      textAlign: 'center',
      color: colors.textLight,
    },
    journeyGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.screen,
      gap: spacing.lg,
    },
    journeyCard: {
      flex: 1,
      minWidth: '45%',
      padding: spacing.card,
      borderRadius: spacing.radius.xl,
      alignItems: 'center',
      minHeight: 120,
      justifyContent: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.borderLight,
      overflow: 'hidden',
      position: 'relative',
    },
    journeyCardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.7,
    },
    journeyCardContent: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    journeyTitle: {
      ...typography.bodyBold,
      marginTop: spacing.sm,
      textAlign: 'center',
      color: colors.text,
    },
    journeySubtitle: {
      ...typography.caption,
      marginTop: spacing.xxs,
      textAlign: 'center',
      color: colors.textLight,
    },
    statsCard: {
      backgroundColor: colors.card,
      marginHorizontal: spacing.screen,
      padding: spacing.xl,
      borderRadius: spacing.radius.xl,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
      overflow: 'hidden',
      position: 'relative',
    },
    statsCardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
    },
    statsCardContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      zIndex: 1,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      ...typography.h2,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    bottomPadding: {
      height: spacing.huge,
    },
    animatedContainer: {
      opacity: 1,
    },
    weeklyGoalsCard: {
      backgroundColor: colors.card,
      marginHorizontal: spacing.screen,
      padding: spacing.xl,
      borderRadius: spacing.radius.xl,
      marginBottom: spacing.section,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.borderLight,
      overflow: 'hidden',
      position: 'relative',
    },
    weeklyGoalsGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
    },
    weeklyGoalsContent: {
      position: 'relative',
      zIndex: 1,
    },
    goalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    goalProgress: {
      flex: 1,
      marginLeft: spacing.md,
    },
    goalText: {
      ...typography.body,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.borderLight,
      borderRadius: spacing.radius.sm,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: spacing.radius.sm,
    },
    achievementBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success + '15',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: spacing.radius.lg,
      marginTop: spacing.md,
      alignSelf: 'center',
    },
    achievementText: {
      ...typography.captionBold,
      color: colors.success,
      marginLeft: spacing.sm,
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour ! 🌅";
    if (hour < 18) return "Bon après-midi ! ☀️";
    return "Bonsoir ! 🌙";
  };

  const getBackgroundImage = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=top"; // Sunrise
    } else if (hour < 18) {
      return "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop&crop=center"; // Sky
    } else {
      return "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&crop=center"; // Night sky
    }
  };

  const getHeaderGradient = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return colors.sunriseGradient;
    } else if (hour < 18) {
      return colors.primaryGradient;
    } else {
      return colors.twilightGradient;
    }
  };
  
  const weeklyGoals = [
    { icon: BookOpen, text: "Lire 5 chapitres", progress: 0.6, color: colors.primary },
    { icon: Heart, text: "Méditer 3 fois", progress: 0.33, color: colors.peace },
    { icon: Sparkles, text: "Écrire dans le journal", progress: 0.8, color: colors.hope },
  ];
  
  return (
    <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: getBackgroundImage() }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={getHeaderGradient()}
          style={styles.headerBackground}
        />
        
        {/* Decorative Elements */}
        <View style={styles.decorativeElements}>
          <Star size={20} color={colors.accent} style={[styles.decorativeIcon, { transform: [{ rotate: '15deg' }] }]} />
          <Sun size={24} color={colors.hope} style={[styles.decorativeIcon, { transform: [{ rotate: '-10deg' }] }]} />
          <Moon size={18} color={colors.peace} style={[styles.decorativeIcon, { transform: [{ rotate: '20deg' }] }]} />
        </View>
        
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.title}>BibleChat IA</Text>
          <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
        </View>
      </View>

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
          <LinearGradient
            colors={colors.cardGradient}
            style={styles.statsCardGradient}
          />
          <View style={styles.statsCardContent}>
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
          <LinearGradient
            colors={colors.peacefulGradient}
            style={styles.weeklyGoalsGradient}
          />
          <View style={styles.weeklyGoalsContent}>
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
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.actionCardGradient}
            />
            <View style={styles.actionCardContent}>
              <MessageCircle size={28} color={colors.text} />
              <Text style={styles.actionTitle}>Chat IA</Text>
              <Text style={styles.actionSubtitle}>Pose tes questions</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/bible')}
          >
            <LinearGradient
              colors={colors.secondaryGradient}
              style={styles.actionCardGradient}
            />
            <View style={styles.actionCardContent}>
              <BookOpen size={28} color={colors.text} />
              <Text style={styles.actionTitle}>Bible</Text>
              <Text style={styles.actionSubtitle}>Explore les Écritures</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spiritual Journey */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ton parcours spirituel</Text>
        <View style={styles.journeyGrid}>
          <TouchableOpacity 
            style={styles.journeyCard}
            onPress={() => router.push('/(tabs)/meditation')}
          >
            <LinearGradient
              colors={[colors.peace + '40', colors.peace + '20']}
              style={styles.journeyCardGradient}
            />
            <View style={styles.journeyCardContent}>
              <Heart size={26} color={colors.peace} />
              <Text style={styles.journeyTitle}>Méditation</Text>
              <Text style={styles.journeySubtitle}>Trouve la paix</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.journeyCard}
            onPress={() => router.push('/(tabs)/journal')}
          >
            <LinearGradient
              colors={[colors.hope + '40', colors.hope + '20']}
              style={styles.journeyCardGradient}
            />
            <View style={styles.journeyCardContent}>
              <Sparkles size={26} color={colors.hope} />
              <Text style={styles.journeyTitle}>Journal</Text>
              <Text style={styles.journeySubtitle}>Écris tes pensées</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.journeyCard}
            onPress={() => router.push('/(tabs)/reading-plan')}
          >
            <LinearGradient
              colors={[colors.wisdom + '40', colors.wisdom + '20']}
              style={styles.journeyCardGradient}
            />
            <View style={styles.journeyCardContent}>
              <Target size={26} color={colors.wisdom} />
              <Text style={styles.journeyTitle}>Plan de lecture</Text>
              <Text style={styles.journeySubtitle}>Progresse chaque jour</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.journeyCard}
            onPress={() => router.push('/calendar')}
          >
            <LinearGradient
              colors={[colors.gratitude + '40', colors.gratitude + '20']}
              style={styles.journeyCardGradient}
            />
            <View style={styles.journeyCardContent}>
              <Calendar size={26} color={colors.gratitude} />
              <Text style={styles.journeyTitle}>Calendrier</Text>
              <Text style={styles.journeySubtitle}>Vois ton progrès</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
}