import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star, Target, BookOpen, Heart, Zap } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface AchievementBadgeProps {
  achievementId: string;
  isUnlocked: boolean;
  size?: 'small' | 'medium' | 'large';
}

const achievements = {
  'first-reading': {
    title: 'Premier Pas',
    description: 'Première lecture complétée',
    icon: BookOpen,
    color: '#10B981',
  },
  'week-streak': {
    title: 'Fidèle',
    description: '7 jours consécutifs de lecture',
    icon: Target,
    color: '#3B82F6',
  },
  'month-streak': {
    title: 'Persévérant',
    description: '30 jours consécutifs de lecture',
    icon: Trophy,
    color: '#F59E0B',
  },
  'first-journal': {
    title: 'Introspection',
    description: 'Première entrée de journal',
    icon: Heart,
    color: '#EC4899',
  },
  'meditation-master': {
    title: 'Maître Zen',
    description: '10 sessions de méditation',
    icon: Star,
    color: '#8B5CF6',
  },
  'level-up': {
    title: 'Évolution',
    description: 'Niveau 5 atteint',
    icon: Zap,
    color: '#EF4444',
  },
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievementId,
  isUnlocked,
  size = 'medium',
}) => {
  const achievement = achievements[achievementId as keyof typeof achievements];
  
  if (!achievement) return null;

  const Icon = achievement.icon;
  const sizeConfig = {
    small: { container: 60, icon: 20, fontSize: typography.fontSizes.xs },
    medium: { container: 80, icon: 24, fontSize: typography.fontSizes.sm },
    large: { container: 100, icon: 32, fontSize: typography.fontSizes.md },
  };

  const config = sizeConfig[size];

  return (
    <View style={[styles.container, { width: config.container, height: config.container }]}>
      <LinearGradient
        colors={isUnlocked ? [achievement.color, achievement.color + 'CC'] as readonly [string, string] : [colors.border, colors.borderLight] as readonly [string, string]}
        style={[styles.gradient, { borderRadius: config.container / 2 }]}
      >
        <Icon 
          size={config.icon} 
          color={isUnlocked ? colors.white : colors.textLight} 
        />
      </LinearGradient>
      {size !== 'small' && (
        <Text style={[
          styles.title, 
          { fontSize: config.fontSize },
          !isUnlocked && { color: colors.textLight }
        ]}>
          {achievement.title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: spacing.xs,
  },
  gradient: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});