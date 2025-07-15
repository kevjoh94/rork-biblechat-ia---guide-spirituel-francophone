import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CheckCircle,
  Circle,
  Star,
  Heart,
  BookOpen,
  Target,
  Calendar,
  Trophy,
  Zap,
} from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useSpiritualStore } from '@/store/spiritual-store';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  completed: boolean;
  points: number;
  type: 'journal' | 'verse' | 'devotional' | 'prayer';
}

export const DailyPlan: React.FC = () => {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  
  const dailyProgress = useSpiritualStore((state) => state.dailyProgress);
  const markTaskCompleted = useSpiritualStore((state) => state.markTaskCompleted);
  const addExperience = useSpiritualStore((state) => state.addExperience);
  const stats = useSpiritualStore((state) => state.stats);
  
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayProgress = dailyProgress[dateKey];
  
  useEffect(() => {
    const dailyTasks: DailyTask[] = [
      {
        id: '1',
        title: 'Lecture du verset quotidien',
        description: 'Lisez et méditez sur le verset du jour',
        icon: BookOpen,
        color: colors.secondary,
        completed: todayProgress?.verseCompleted || false,
        points: 10,
        type: 'verse',
      },
      {
        id: '2',
        title: 'Temps de prière',
        description: 'Prenez 10 minutes pour prier et vous recueillir',
        icon: Heart,
        color: colors.primary,
        completed: todayProgress?.prayerCompleted || false,
        points: 15,
        type: 'prayer',
      },
      {
        id: '3',
        title: 'Méditation spirituelle',
        description: 'Session de méditation guidée de 5 minutes',
        icon: Target,
        color: colors.peace,
        completed: todayProgress?.devotionalCompleted || false,
        points: 20,
        type: 'devotional',
      },
      {
        id: '4',
        title: 'Journal de gratitude',
        description: 'Écrivez 3 choses pour lesquelles vous êtes reconnaissant',
        icon: Star,
        color: colors.gratitude,
        completed: todayProgress?.journalCompleted || false,
        points: 15,
        type: 'journal',
      },
    ];
    
    setTasks(dailyTasks);
    setCompletedTasks(dailyTasks.filter(task => task.completed).length);
  }, [todayProgress, colors]);
  
  const handleTaskComplete = (taskId: string, taskType: DailyTask['type']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;
    
    // Update local state
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));
    
    // Update store
    markTaskCompleted(taskType);
    addExperience(task.points);
    
    // Update completed count
    setCompletedTasks(prev => prev + 1);
    
    // Show success message
    Alert.alert(
      'Félicitations ! 🎉',
      `Vous avez gagné ${task.points} points d'expérience !`,
      [{ text: 'Continuer' }]
    );
  };
  
  const progressPercentage = (completedTasks / tasks.length) * 100;
  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
  
  const renderTask = (task: DailyTask) => (
    <TouchableOpacity
      key={task.id}
      style={[
        styles.taskCard,
        {
          backgroundColor: colors.card,
          borderColor: task.completed ? task.color : colors.border,
          opacity: task.completed ? 0.8 : 1,
        },
      ]}
      onPress={() => handleTaskComplete(task.id, task.type)}
      disabled={task.completed}
    >
      <View style={styles.taskHeader}>
        <View style={[styles.taskIcon, { backgroundColor: task.color + '20' }]}>
          <task.icon size={24} color={task.color} />
        </View>
        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, { color: colors.text }]}>
            {task.title}
          </Text>
          <Text style={[styles.taskDescription, { color: colors.textSecondary }]}>
            {task.description}
          </Text>
        </View>
        <View style={styles.taskStatus}>
          {task.completed ? (
            <CheckCircle size={24} color={colors.success} />
          ) : (
            <Circle size={24} color={colors.textLight} />
          )}
        </View>
      </View>
      
      <View style={styles.taskFooter}>
        <View style={styles.pointsBadge}>
          <Zap size={12} color={colors.warning} />
          <Text style={[styles.pointsText, { color: colors.warning }]}>
            +{task.points} XP
          </Text>
        </View>
        {task.completed && (
          <Text style={[styles.completedText, { color: colors.success }]}>
            Terminé !
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Calendar size={28} color={colors.white} />
          <Text style={styles.headerTitle}>Plan Quotidien</Text>
          <Text style={styles.headerDate}>
            {today.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </LinearGradient>
      
      {/* Progress Overview */}
      <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>Progrès du jour</Text>
          <Text style={[styles.progressPercentage, { color: colors.primary }]}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
        </View>
        
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Trophy size={16} color={colors.warning} />
            <Text style={[styles.progressStatText, { color: colors.textSecondary }]}>
              {completedTasks}/{tasks.length} tâches
            </Text>
          </View>
          <View style={styles.progressStat}>
            <Zap size={16} color={colors.warning} />
            <Text style={[styles.progressStatText, { color: colors.textSecondary }]}>
              {totalPoints} XP gagnés
            </Text>
          </View>
        </View>
      </View>
      
      {/* Tasks List */}
      <View style={styles.tasksContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tâches quotidiennes</Text>
        {tasks.map(renderTask)}
      </View>
      
      {/* Motivation Message */}
      {completedTasks === tasks.length ? (
        <View style={[styles.completionCard, { backgroundColor: colors.success + '20' }]}>
          <Trophy size={32} color={colors.success} />
          <Text style={[styles.completionTitle, { color: colors.success }]}>
            Journée accomplie !
          </Text>
          <Text style={[styles.completionMessage, { color: colors.text }]}>
            Félicitations ! Vous avez terminé toutes vos tâches spirituelles aujourd'hui.
            Continuez sur cette belle lancée !
          </Text>
        </View>
      ) : (
        <View style={[styles.motivationCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
            « Chaque petit pas compte dans votre parcours spirituel. »
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: '#FFFFFF',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  headerDate: {
    fontSize: typography.fontSizes.md,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  progressCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
  },
  progressPercentage: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
  },
  progressBarContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  progressStatText: {
    fontSize: typography.fontSizes.sm,
  },
  tasksContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
  },
  taskCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  taskIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  taskDescription: {
    fontSize: typography.fontSizes.sm,
    lineHeight: typography.lineHeights.sm,
  },
  taskStatus: {
    marginLeft: spacing.sm,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pointsText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  completedText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  completionCard: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  completionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  completionMessage: {
    fontSize: typography.fontSizes.md,
    textAlign: 'center',
    lineHeight: typography.lineHeights.md,
  },
  motivationCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  motivationText: {
    fontSize: typography.fontSizes.md,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: typography.lineHeights.md,
  },
});