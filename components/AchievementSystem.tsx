import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Award, Star, Flame, BookOpen, Heart, Calendar, Trophy, Crown, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

const { width, height } = Dimensions.get('window');

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: number;
  currentProgress: number;
  isUnlocked: boolean;
  category: 'reading' | 'streak' | 'meditation' | 'journal' | 'level';
  reward: {
    experience: number;
    title?: string;
  };
}

interface AchievementModalProps {
  achievement: Achievement | null;
  visible: boolean;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, visible, onClose }) => {
  const { colors } = useTheme();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible && achievement) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [visible, achievement]);

  if (!achievement) return null;

  const getIcon = () => {
    switch (achievement.icon) {
      case 'award': return <Award size={48} color={colors.white} />;
      case 'star': return <Star size={48} color={colors.white} />;
      case 'flame': return <Flame size={48} color={colors.white} />;
      case 'book': return <BookOpen size={48} color={colors.white} />;
      case 'heart': return <Heart size={48} color={colors.white} />;
      case 'calendar': return <Calendar size={48} color={colors.white} />;
      case 'trophy': return <Trophy size={48} color={colors.white} />;
      case 'crown': return <Crown size={48} color={colors.white} />;
      case 'zap': return <Zap size={48} color={colors.white} />;
      default: return <Award size={48} color={colors.white} />;
    }
  };

  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                { scale: scaleAnim },
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[achievement.color, achievement.color + 'CC']}
            style={styles.achievementCard}
          >
            <View style={styles.iconContainer}>
              {getIcon()}
            </View>
            
            <Text style={styles.congratsText}>🎉 Félicitations ! 🎉</Text>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            
            <View style={styles.rewardContainer}>
              <Text style={styles.rewardText}>
                +{achievement.reward.experience} XP
              </Text>
              {achievement.reward.title && (
                <Text style={styles.titleReward}>
                  Nouveau titre: {achievement.reward.title}
                </Text>
              )}
            </View>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Continuer</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

interface AchievementProgressProps {
  achievement: Achievement;
  compact?: boolean;
}

export const AchievementProgress: React.FC<AchievementProgressProps> = ({ 
  achievement, 
  compact = false 
}) => {
  const { colors } = useTheme();
  const progress = Math.min(achievement.currentProgress / achievement.requirement, 1);
  
  const getIcon = () => {
    const size = compact ? 16 : 20;
    const color = achievement.isUnlocked ? achievement.color : colors.textSecondary;
    
    switch (achievement.icon) {
      case 'award': return <Award size={size} color={color} />;
      case 'star': return <Star size={size} color={color} />;
      case 'flame': return <Flame size={size} color={color} />;
      case 'book': return <BookOpen size={size} color={color} />;
      case 'heart': return <Heart size={size} color={color} />;
      case 'calendar': return <Calendar size={size} color={color} />;
      case 'trophy': return <Trophy size={size} color={color} />;
      case 'crown': return <Crown size={size} color={color} />;
      case 'zap': return <Zap size={size} color={color} />;
      default: return <Award size={size} color={color} />;
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={[styles.progressCard, compact && styles.progressCardCompact]}>
      <View style={styles.progressHeader}>
        <View style={[
          styles.progressIcon, 
          { backgroundColor: achievement.isUnlocked ? achievement.color + '20' : colors.border }
        ]}>
          {getIcon()}
        </View>
        <View style={styles.progressInfo}>
          <Text style={[
            styles.progressTitle,
            { color: achievement.isUnlocked ? colors.text : colors.textSecondary }
          ]}>
            {achievement.title}
          </Text>
          {!compact && (
            <Text style={styles.progressDescription}>
              {achievement.description}
            </Text>
          )}
        </View>
        {achievement.isUnlocked && (
          <View style={styles.unlockedBadge}>
            <Star size={12} color={colors.warning} fill={colors.warning} />
          </View>
        )}
      </View>
      
      {!achievement.isUnlocked && (
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: achievement.color,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {achievement.currentProgress}/{achievement.requirement}
          </Text>
        </View>
      )}
    </View>
  );
};

export const AchievementSystem: React.FC = () => {
  const { colors } = useTheme();
  const stats = useSpiritualStore((state) => state.stats);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Define achievements
  const achievements: Achievement[] = [
    {
      id: 'first_reading',
      title: 'Premier Pas',
      description: 'Lire votre premier chapitre',
      icon: 'book',
      color: colors.primary,
      requirement: 1,
      currentProgress: stats?.totalReadings || 0,
      isUnlocked: (stats?.totalReadings || 0) >= 1,
      category: 'reading',
      reward: { experience: 50, title: 'Lecteur Débutant' }
    },
    {
      id: 'week_streak',
      title: 'Persévérant',
      description: 'Maintenir une série de 7 jours',
      icon: 'flame',
      color: colors.warning,
      requirement: 7,
      currentProgress: stats?.currentStreak || 0,
      isUnlocked: (stats?.currentStreak || 0) >= 7,
      category: 'streak',
      reward: { experience: 100, title: 'Fidèle Lecteur' }
    },
    {
      id: 'month_streak',
      title: 'Dévoué',
      description: 'Maintenir une série de 30 jours',
      icon: 'crown',
      color: colors.accent,
      requirement: 30,
      currentProgress: stats?.currentStreak || 0,
      isUnlocked: (stats?.currentStreak || 0) >= 30,
      category: 'streak',
      reward: { experience: 300, title: 'Champion de la Foi' }
    },
    {
      id: 'hundred_readings',
      title: 'Érudit',
      description: 'Lire 100 chapitres',
      icon: 'trophy',
      color: colors.success,
      requirement: 100,
      currentProgress: stats?.totalReadings || 0,
      isUnlocked: (stats?.totalReadings || 0) >= 100,
      category: 'reading',
      reward: { experience: 500, title: 'Maître des Écritures' }
    },
    {
      id: 'level_10',
      title: 'Sage',
      description: 'Atteindre le niveau 10',
      icon: 'star',
      color: colors.info,
      requirement: 10,
      currentProgress: stats?.level || 1,
      isUnlocked: (stats?.level || 1) >= 10,
      category: 'level',
      reward: { experience: 200, title: 'Sage Spirituel' }
    }
  ];

  // Check for new achievements
  useEffect(() => {
    const unlockedAchievements = achievements.filter(a => a.isUnlocked);
    // Here you would check against previously unlocked achievements
    // For demo, we'll show the first unlocked achievement
    if (unlockedAchievements.length > 0 && !showModal) {
      // This would be more sophisticated in a real app
      // setNewAchievement(unlockedAchievements[0]);
      // setShowModal(true);
    }
  }, [stats]);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAchievement(null);
  };

  return (
    <>
      <View>
        {achievements.map((achievement) => (
          <AchievementProgress
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </View>
      
      <AchievementModal
        achievement={newAchievement}
        visible={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    maxWidth: 350,
  },
  achievementCard: {
    padding: spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  congratsText: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  achievementTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  rewardContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  rewardText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
  },
  titleReward: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  closeButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
  },
  progressCard: {
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
  progressCardCompact: {
    padding: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: 2,
  },
  progressDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  unlockedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
});