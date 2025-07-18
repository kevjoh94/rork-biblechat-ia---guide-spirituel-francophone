import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Platform, ImageBackground, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle, BookOpen, Heart, Calendar, Target, Sparkles, User, Crown, TrendingUp, Award, Flame, Sun, Moon, Star, RefreshCw } from "lucide-react-native";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { useTheme } from "@/components/ThemeProvider";
import { DailyVerseCard } from "@/components/DailyVerseCard";
import { SkeletonHome } from "@/components/SkeletonLoader";
import { HomeHeader } from "@/components/HomeHeader";
import { SmoothScrollView } from "@/components/SmoothScrollView";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { animations, interpolations } from "@/utils/animations";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(1)); // Start visible
  const [slideAnim] = useState(new Animated.Value(0)); // Start in position
  const [isLoading, setIsLoading] = useState(false); // Start ready
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Get data from store
  const dailyVerse = useSpiritualStore((state) => state.dailyVerse);
  const stats = useSpiritualStore((state) => state.stats);
  const initializeDailyVerse = useSpiritualStore((state) => state.initializeDailyVerse);
  const getDailyVerse = useSpiritualStore((state) => state.getDailyVerse);

  useEffect(() => {
    const loadData = async () => {
      initializeDailyVerse();
      
      // Simple entrance animation without blocking
      if (Platform.OS !== 'web') {
        Animated.parallel([
          animations.fadeIn(fadeAnim, 400),
          animations.slideInUp(slideAnim, 300)
        ]).start();
      }
    };
    
    loadData();
  }, [initializeDailyVerse]);

  const onRefresh = async () => {
    setRefreshing(true);
    initializeDailyVerse();
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const currentVerse = dailyVerse || getDailyVerse();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 500,
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
      transform: [{ scale: 1 }],
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
      height: spacing.huge + 20,
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
      return "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop&crop=top"; // Beautiful sunrise
    } else if (hour < 18) {
      return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center"; // Peaceful sky
    } else {
      return "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&crop=center"; // Starry night
    }
  };

  const getHeaderGradient = (): string[] => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return [...colors.sunriseGradient];
    } else if (hour < 18) {
      return [...colors.primaryGradient];
    } else {
      return [...colors.twilightGradient];
    }
  };
  
  const weeklyGoals = [
    { icon: BookOpen, text: "Lire 5 chapitres", progress: 0.6, color: colors.primary },
    { icon: Heart, text: "Méditer 3 fois", progress: 0.33, color: colors.peace },
    { icon: Sparkles, text: "Écrire dans le journal", progress: 0.8, color: colors.hope },
  ];
  
  if (isLoading) {
    return <SkeletonHome />;
  }

  return (
    <View style={styles.container}>
      <SmoothScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
      {/* Background Image */}
      <ParallaxBackground
        source={{ uri: getBackgroundImage() }}
        style={styles.backgroundImage}
      />
      
      {/* Header */}
      <HomeHeader 
        backgroundImage={getBackgroundImage()}
        gradient={getHeaderGradient()}
        greeting={getGreeting()}
      />

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
          <InteractiveCard 
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
          </InteractiveCard>
          
          <InteractiveCard 
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
          </InteractiveCard>
        </View>
      </View>

      {/* Spiritual Journey */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ton parcours spirituel</Text>
        <View style={styles.journeyGrid}>
          <InteractiveCard 
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
          </InteractiveCard>
          
          <InteractiveCard 
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
          </InteractiveCard>
          
          <InteractiveCard 
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
          </InteractiveCard>
          
          <InteractiveCard 
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
          </InteractiveCard>
        </View>
      </View>

      <View style={styles.bottomPadding} />
      </SmoothScrollView>
    </View>
  );
}