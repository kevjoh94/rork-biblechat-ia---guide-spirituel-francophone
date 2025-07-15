import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calendar, 
  Flame, 
  CheckCircle, 
  Play, 
  ChevronDown,
  ChevronUp,
  Clock,
  Book,
  Heart
} from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useSpiritualStore } from '@/store/spiritual-store';

interface DailyTask {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  completed: boolean;
  type: 'journal' | 'verse' | 'devotional' | 'prayer';
  image?: string;
  tags?: string[];
}

export const DailyPlan: React.FC = () => {
  const { colors } = useTheme();
  const { dailyProgress } = useSpiritualStore();
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  const today = new Date();
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayProgress = dailyProgress[todayKey] || { completed: false, streak: false };

  const dailyTasks: DailyTask[] = [
    {
      id: 'journal',
      title: 'JOURNAL SPIRITUEL',
      subtitle: 'Réflexion quotidienne',
      duration: '5 MIN',
      completed: todayProgress.journalCompleted || false,
      type: 'journal',
    },
    {
      id: 'verse',
      title: 'VOTRE VERSET',
      subtitle: 'Matthieu 3:14-17',
      duration: '3 MIN',
      completed: todayProgress.verseCompleted || false,
      type: 'verse',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      tags: ['RÉCONFORT', 'DÉLIVRANCE', 'PROTECTION'],
    },
    {
      id: 'devotional',
      title: 'DÉVOTION PERSONNALISÉE',
      subtitle: 'Méditation guidée',
      duration: '3 MIN',
      completed: todayProgress.devotionalCompleted || false,
      type: 'devotional',
    },
    {
      id: 'prayer',
      title: 'PRIÈRE DU JOUR',
      subtitle: 'Moment de recueillement',
      duration: '2 MIN',
      completed: todayProgress.prayerCompleted || false,
      type: 'prayer',
    },
  ];

  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedTasks / dailyTasks.length) * 100);

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'journal': return <Book size={16} color={colors.white} />;
      case 'verse': return <Heart size={16} color={colors.white} />;
      case 'devotional': return <Play size={16} color={colors.white} />;
      case 'prayer': return <Heart size={16} color={colors.white} />;
      default: return <CheckCircle size={16} color={colors.white} />;
    }
  };

  const renderTask = (task: DailyTask) => {
    const isExpanded = expandedTasks.includes(task.id);
    
    return (
      <View key={task.id} style={[styles.taskContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => toggleTaskExpansion(task.id)}
          style={styles.taskHeader}
          activeOpacity={0.7}
        >
          <View style={styles.taskInfo}>
            <View style={styles.taskTitleRow}>
              {task.completed ? (
                <LinearGradient
                  colors={[colors.success, '#66BB6A']}
                  style={styles.taskIcon}
                >
                  <CheckCircle size={16} color={colors.white} />
                </LinearGradient>
              ) : (
                <View style={[styles.taskIcon, { backgroundColor: colors.textLight }]}>
                  {getTaskIcon(task.type)}
                </View>
              )}
              <Text style={[
                styles.taskTitle, 
                { color: task.completed ? colors.success : colors.text }
              ]}>
                {task.title}
              </Text>
              {task.completed && (
                <Text style={[styles.doneLabel, { color: colors.success }]}>
                  FAIT
                </Text>
              )}
            </View>
            <Text style={[styles.taskSubtitle, { color: colors.textSecondary }]}>
              {task.subtitle}
            </Text>
            <View style={styles.taskMeta}>
              <View style={styles.durationBadge}>
                <Clock size={12} color={colors.textSecondary} />
                <Text style={[styles.duration, { color: colors.textSecondary }]}>
                  {task.duration}
                </Text>
              </View>
            </View>
          </View>
          
          {isExpanded ? (
            <ChevronUp size={20} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>

        {isExpanded && task.image && (
          <View style={styles.expandedContent}>
            <Image source={{ uri: task.image }} style={styles.taskImage} />
            {task.tags && (
              <View style={styles.tagsContainer}>
                {task.tags.map((tag, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.tagText, { color: colors.text }]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
              <Play size={16} color={colors.white} />
              <Text style={[styles.actionButtonText, { color: colors.white }]}>
                Commencer
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View>
              <Text style={styles.planTitle}>Plan Quotidien</Text>
              <Text style={styles.planSubtitle}>Pour Comprendre la Création</Text>
            </View>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Calendar size={20} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.streakBadge}>
              <Flame size={16} color={colors.accent} />
              <Text style={styles.streakNumber}>2</Text>
            </View>
          </View>
        </View>

        {/* Week Calendar */}
        <View style={styles.weekCalendar}>
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - today.getDay() + i + 1); // Start from Monday
            const isToday = date.toDateString() === today.toDateString();
            const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const dayProgress = dailyProgress[dayKey];
            
            return (
              <TouchableOpacity key={i} style={styles.dayButton}>
                <Text style={styles.dayLabel}>
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                </Text>
                <View style={[
                  styles.dayCircle,
                  isToday && styles.todayCircle,
                  dayProgress?.completed && styles.completedDayCircle,
                ]}>
                  {dayProgress?.streak && (
                    <Flame size={12} color={colors.accent} style={styles.dayStreakIcon} />
                  )}
                  <Text style={[
                    styles.dayNumber,
                    isToday && styles.todayNumber,
                    dayProgress?.completed && styles.completedDayNumber,
                  ]}>
                    {date.getDate()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {/* Progress Section */}
      <View style={[styles.progressSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.progressTitle, { color: colors.text }]}>
          Progrès aujourd'hui
        </Text>
        <Text style={[styles.progressPercentage, { color: colors.accent }]}>
          {progressPercentage}%
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: colors.accent,
                width: `${progressPercentage}%`
              }
            ]} 
          />
        </View>
      </View>

      {/* Daily Tasks */}
      <View style={styles.tasksSection}>
        {dailyTasks.map(renderTask)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  planTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  planSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  streakNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  weekCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  todayCircle: {
    backgroundColor: 'rgba(212, 175, 55, 0.8)',
  },
  completedDayCircle: {
    backgroundColor: 'rgba(212, 175, 55, 1)',
  },
  dayStreakIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  dayNumber: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  todayNumber: {
    color: '#fff',
    fontWeight: '600',
  },
  completedDayNumber: {
    color: '#fff',
    fontWeight: '600',
  },
  progressSection: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
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
  tasksSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  taskContainer: {
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  taskIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    flex: 1,
  },
  doneLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  taskSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 36,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 36,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 12,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  taskImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});