import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Target, Calendar, BookOpen } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

export const ProgressTracker: React.FC = () => {
  const { colors } = useTheme();
  const stats = useSpiritualStore((state) => state.stats);
  const achievements = useSpiritualStore((state) => state.achievements);
  
  const levelProgress = (stats.experience % 100) / 100;
  const nextLevelExp = 100 - (stats.experience % 100);
  
  const getStreakMessage = () => {
    if (stats.currentStreak === 0) {
      return "Commencez votre série aujourd'hui !";
    } else if (stats.currentStreak < 3) {
      return "Bon début ! Continuez ainsi.";
    } else if (stats.currentStreak < 7) {
      return "Excellente régularité !";
    } else if (stats.currentStreak < 30) {
      return "Incroyable persévérance !";
    } else {
      return "Vous êtes un exemple de fidélité !";
    }
  };
  
  const getNextAchievement = () => {
    if (stats.totalReadings < 1) return "Première lecture";
    if (stats.totalReadings < 5) return "5 lectures";
    if (stats.totalReadings < 10) return "10 lectures";
    if (stats.currentStreak < 3) return "Série de 3 jours";
    if (stats.currentStreak < 7) return "Série de 7 jours";
    if (stats.currentStreak < 30) return "Série de 30 jours";
    return "Maître spirituel";
  };
  
  return (
    <View style={styles.container}>
      {/* Level Progress */}
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.levelCard}
      >
        <View style={styles.levelHeader}>
          <Trophy size={24} color={colors.white} />
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Niveau {stats.level}</Text>
            <Text style={styles.levelSubtitle}>{nextLevelExp} XP jusqu'au niveau suivant</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${levelProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.floor(levelProgress * 100)}%</Text>
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <BookOpen size={24} color={colors.secondary} />
          <Text style={styles.statNumber}>{stats.totalReadings}</Text>
          <Text style={styles.statLabel}>Lectures</Text>
        </View>
        
        <View style={styles.statCard}>
          <Target size={24} color={colors.peace} />
          <Text style={styles.statNumber}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Série actuelle</Text>
        </View>
        
        <View style={styles.statCard}>
          <Calendar size={24} color={colors.gratitude} />
          <Text style={styles.statNumber}>{stats.longestStreak}</Text>
          <Text style={styles.statLabel}>Meilleure série</Text>
        </View>
        
        <View style={styles.statCard}>
          <Trophy size={24} color={colors.love} />
          <Text style={styles.statNumber}>{achievements.length}</Text>
          <Text style={styles.statLabel}>Réalisations</Text>
        </View>
      </View>

      {/* Streak Message */}
      <View style={styles.messageCard}>
        <Text style={styles.messageTitle}>Motivation du jour</Text>
        <Text style={styles.messageText}>{getStreakMessage()}</Text>
      </View>

      {/* Next Achievement */}
      <View style={styles.nextAchievementCard}>
        <Text style={styles.nextAchievementTitle}>Prochaine réalisation</Text>
        <Text style={styles.nextAchievementText}>{getNextAchievement()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  levelCard: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  levelTitle: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  levelSubtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  progressText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginHorizontal: '1%',
  },
  statNumber: {
    ...typography.h2,
    color: colors.text,
    marginVertical: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  messageTitle: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  messageText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  nextAchievementCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  nextAchievementTitle: {
    ...typography.bodyBold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  nextAchievementText: {
    ...typography.body,
    color: colors.text,
  },
});