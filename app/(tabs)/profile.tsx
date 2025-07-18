import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions } from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, User, Crown, Flame, BookOpen, Heart, Calendar, Trophy, Star, TrendingUp, Award, Settings } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/components/ThemeProvider";
import { useSpiritualStore } from "@/store/spiritual-store";
import { AchievementSystem } from "@/components/AchievementSystem";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'activity'>('stats');
  
  const stats = useSpiritualStore((state) => state.stats);
  const userProfile = useSpiritualStore((state) => state.userProfile);
  
  const styles = createStyles(colors);
  
  const getExperienceProgress = () => {
    const currentLevelExp = (stats?.level || 1 - 1) * 100;
    const nextLevelExp = (stats?.level || 1) * 100;
    const progress = ((stats?.experience || 0) - currentLevelExp) / (nextLevelExp - currentLevelExp);
    return Math.max(0, Math.min(1, progress));
  };
  
  const getLevelTitle = (level: number) => {
    if (level >= 20) return "Maître Spirituel";
    if (level >= 15) return "Sage des Écritures";
    if (level >= 10) return "Disciple Avancé";
    if (level >= 5) return "Chercheur de Vérité";
    return "Nouveau Croyant";
  };
  
  const quickStats = [
    {
      icon: BookOpen,
      label: "Lectures",
      value: stats?.totalReadings || 0,
      color: colors.primary,
    },
    {
      icon: Flame,
      label: "Série actuelle",
      value: stats?.currentStreak || 0,
      color: colors.warning,
    },
    {
      icon: Heart,
      label: "Méditations",
      value: stats?.totalMeditations || 0,
      color: colors.peace,
    },
    {
      icon: Calendar,
      label: "Journal",
      value: stats?.totalJournalEntries || 0,
      color: colors.hope,
    },
  ];
  
  const recentActivity = [
    {
      icon: BookOpen,
      title: "Lecture complétée",
      subtitle: "Psaume 23",
      time: "Il y a 2h",
      color: colors.primary,
    },
    {
      icon: Heart,
      title: "Méditation terminée",
      subtitle: "Paix intérieure - 10 min",
      time: "Hier",
      color: colors.peace,
    },
    {
      icon: Award,
      title: "Succès débloqué",
      subtitle: "Persévérant (7 jours)",
      time: "Il y a 3 jours",
      color: colors.success,
    },
  ];
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Mon Profil',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 16 }}>
              <Settings size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[colors.primary, colors.primary + 'CC']}
          style={styles.headerGradient}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[colors.white + '40', colors.white + '20']}
                style={styles.avatar}
              >
                <User size={32} color={colors.white} />
              </LinearGradient>
              <View style={styles.levelBadge}>
                <Crown size={12} color={colors.accent} />
                <Text style={styles.levelText}>{stats?.level || 1}</Text>
              </View>
            </View>
            
            <Text style={styles.userName}>
              {userProfile?.name || "Utilisateur"}
            </Text>
            <Text style={styles.userTitle}>
              {getLevelTitle(stats?.level || 1)}
            </Text>
            
            {/* Experience Bar */}
            <View style={styles.experienceContainer}>
              <View style={styles.experienceBar}>
                <View 
                  style={[
                    styles.experienceFill,
                    { width: `${getExperienceProgress() * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.experienceText}>
                {stats?.experience || 0} XP
              </Text>
            </View>
          </View>
        </LinearGradient>
        
        {/* Quick Stats */}
        <View style={styles.quickStatsContainer}>
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <IconComponent size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {[
            { id: 'stats', label: 'Statistiques', icon: TrendingUp },
            { id: 'achievements', label: 'Succès', icon: Trophy },
            { id: 'activity', label: 'Activité', icon: Calendar },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  isActive && styles.tabButtonActive
                ]}
                onPress={() => setActiveTab(tab.id as any)}
              >
                <IconComponent 
                  size={16} 
                  color={isActive ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabText,
                  isActive && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'stats' && (
            <View>
              <View style={styles.detailedStatsCard}>
                <Text style={styles.sectionTitle}>Statistiques détaillées</Text>
                
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Série la plus longue</Text>
                  <Text style={styles.statRowValue}>{stats?.longestStreak || 0} jours</Text>
                </View>
                
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Dernière lecture</Text>
                  <Text style={styles.statRowValue}>
                    {stats?.lastReadDate ? new Date(stats.lastReadDate).toLocaleDateString('fr-FR') : 'Jamais'}
                  </Text>
                </View>
                
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Expérience totale</Text>
                  <Text style={styles.statRowValue}>{stats?.experience || 0} XP</Text>
                </View>
                
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Temps de méditation</Text>
                  <Text style={styles.statRowValue}>{(stats?.totalMeditations || 0) * 10} min</Text>
                </View>
              </View>
            </View>
          )}
          
          {activeTab === 'achievements' && (
            <View>
              <Text style={styles.sectionTitle}>Vos succès</Text>
              <AchievementSystem />
            </View>
          )}
          
          {activeTab === 'activity' && (
            <View>
              <Text style={styles.sectionTitle}>Activité récente</Text>
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <View key={index} style={styles.activityItem}>
                    <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                      <IconComponent size={16} color={activity.color} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                    </View>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </>
  );
}

}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white + '40',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  levelText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginLeft: 2,
  },
  userName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userTitle: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.lg,
  },
  experienceContainer: {
    width: '100%',
    alignItems: 'center',
  },
  experienceBar: {
    width: '80%',
    height: 8,
    backgroundColor: colors.white + '30',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  experienceFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  experienceText: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    opacity: 0.9,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginHorizontal: spacing.xs,
  },
  tabButtonActive: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontWeight: typography.fontWeights.medium,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabContent: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  detailedStatsCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: 16,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statRowLabel: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
  },
  statRowValue: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  activityTime: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});