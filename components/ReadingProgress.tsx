import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Target, Calendar, Award } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface ReadingProgressProps {
  bookId?: string;
  chapter?: number;
  onProgressUpdate?: (progress: any) => void;
}

export default function ReadingProgress({ 
  bookId, 
  chapter, 
  onProgressUpdate 
}: ReadingProgressProps) {
  const [todayProgress, setTodayProgress] = useState({
    chaptersRead: 0,
    versesRead: 0,
    timeSpent: 0, // in minutes
    streak: 0
  });
  const [weeklyGoal, setWeeklyGoal] = useState(7); // chapters per week
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (bookId && chapter) {
      markChapterRead(bookId, chapter);
    }
  }, [bookId, chapter]);

  const loadProgress = async () => {
    try {
      const today = new Date().toDateString();
      const savedProgress = await AsyncStorage.getItem(`reading_progress_${today}`);
      const weeklyData = await AsyncStorage.getItem('weekly_reading_progress');
      const goalData = await AsyncStorage.getItem('weekly_reading_goal');
      
      if (savedProgress) {
        setTodayProgress(JSON.parse(savedProgress));
      }
      
      if (weeklyData) {
        setWeeklyProgress(JSON.parse(weeklyData));
      }
      
      if (goalData) {
        setWeeklyGoal(JSON.parse(goalData));
      }
    } catch (error) {
      console.warn('Error loading reading progress:', error);
    }
  };

  const markChapterRead = async (bookId: string, chapter: number) => {
    try {
      const today = new Date().toDateString();
      const newProgress = {
        ...todayProgress,
        chaptersRead: todayProgress.chaptersRead + 1,
        versesRead: todayProgress.versesRead + 25, // Average verses per chapter
        timeSpent: todayProgress.timeSpent + 5 // Average 5 minutes per chapter
      };

      setTodayProgress(newProgress);
      await AsyncStorage.setItem(`reading_progress_${today}`, JSON.stringify(newProgress));

      // Update weekly progress
      const newWeeklyProgress = weeklyProgress + 1;
      setWeeklyProgress(newWeeklyProgress);
      await AsyncStorage.setItem('weekly_reading_progress', JSON.stringify(newWeeklyProgress));

      // Notify parent component
      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
    } catch (error) {
      console.warn('Error updating reading progress:', error);
    }
  };

  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progrès de lecture</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <BookOpen size={20} color={colors.primary} />
          <Text style={styles.statNumber}>{todayProgress.chaptersRead}</Text>
          <Text style={styles.statLabel}>Chapitres</Text>
        </View>
        
        <View style={styles.statItem}>
          <Target size={20} color={colors.secondary} />
          <Text style={styles.statNumber}>{todayProgress.versesRead}</Text>
          <Text style={styles.statLabel}>Versets</Text>
        </View>
        
        <View style={styles.statItem}>
          <Calendar size={20} color={colors.accent} />
          <Text style={styles.statNumber}>{todayProgress.timeSpent}min</Text>
          <Text style={styles.statLabel}>Temps</Text>
        </View>
        
        <View style={styles.statItem}>
          <Award size={20} color={colors.warning} />
          <Text style={styles.statNumber}>{todayProgress.streak}</Text>
          <Text style={styles.statLabel}>Série</Text>
        </View>
      </View>

      <View style={styles.goalContainer}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Objectif hebdomadaire</Text>
          <Text style={styles.goalProgress}>{weeklyProgress}/{weeklyGoal}</Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  goalContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
  },
  goalProgress: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    minWidth: 35,
    textAlign: 'right',
  },
});