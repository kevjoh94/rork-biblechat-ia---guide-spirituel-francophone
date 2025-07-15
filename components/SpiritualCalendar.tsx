import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle,
  Circle,
  Star,
  Heart,
  BookOpen,
  Target,
  ArrowLeft,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useSpiritualStore } from '@/store/spiritual-store';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 40) / 7;

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasActivity: boolean;
  activities: {
    reading: boolean;
    prayer: boolean;
    meditation: boolean;
    journal: boolean;
  };
}

export const SpiritualCalendar: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const dailyProgress = useSpiritualStore((state) => state.dailyProgress);
  const stats = useSpiritualStore((state) => state.stats);
  
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateKey = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
      const progress = dailyProgress[dateKey];
      
      days.push({
        date: current.getDate(),
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === today.toDateString(),
        hasActivity: !!progress,
        activities: {
          reading: progress?.verseCompleted || false,
          prayer: progress?.prayerCompleted || false,
          meditation: progress?.devotionalCompleted || false,
          journal: progress?.journalCompleted || false,
        },
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };
  
  const getDayActivityCount = (activities: CalendarDay['activities']) => {
    return Object.values(activities).filter(Boolean).length;
  };
  
  const renderDay = (day: CalendarDay, index: number) => {
    const activityCount = getDayActivityCount(day.activities);
    const isSelected = selectedDate?.getDate() === day.date;
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dayCell,
          {
            backgroundColor: day.isToday ? colors.primary + '20' : 'transparent',
            borderColor: isSelected ? colors.primary : 'transparent',
          },
        ]}
        onPress={() => {
          const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date);
          setSelectedDate(selected);
        }}
      >
        <Text
          style={[
            styles.dayText,
            {
              color: day.isCurrentMonth ? colors.text : colors.textLight,
              fontWeight: day.isToday ? '700' : '400',
            },
          ]}
        >
          {day.date}
        </Text>
        
        {day.hasActivity && (
          <View style={styles.activityIndicators}>
            {day.activities.reading && (
              <View style={[styles.activityDot, { backgroundColor: colors.wisdom }]} />
            )}
            {day.activities.prayer && (
              <View style={[styles.activityDot, { backgroundColor: colors.prayer }]} />
            )}
            {day.activities.meditation && (
              <View style={[styles.activityDot, { backgroundColor: colors.peace }]} />
            )}
            {day.activities.journal && (
              <View style={[styles.activityDot, { backgroundColor: colors.gratitude }]} />
            )}
          </View>
        )}
        
        {activityCount === 4 && (
          <View style={[styles.completeBadge, { backgroundColor: colors.success }]}>
            <CheckCircle size={12} color={colors.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  const renderSelectedDayDetails = () => {
    if (!selectedDate) return null;
    
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const progress = dailyProgress[dateKey];
    
    return (
      <View style={[styles.detailsCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.detailsTitle, { color: colors.text }]}>
          {selectedDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        
        <View style={styles.activitiesList}>
          <View style={styles.activityItem}>
            <BookOpen size={16} color={progress?.verseCompleted ? colors.success : colors.textLight} />
            <Text style={[styles.activityText, { color: colors.text }]}>Lecture quotidienne</Text>
            {progress?.verseCompleted ? (
              <CheckCircle size={16} color={colors.success} />
            ) : (
              <Circle size={16} color={colors.textLight} />
            )}
          </View>
          
          <View style={styles.activityItem}>
            <Heart size={16} color={progress?.prayerCompleted ? colors.success : colors.textLight} />
            <Text style={[styles.activityText, { color: colors.text }]}>Temps de prière</Text>
            {progress?.prayerCompleted ? (
              <CheckCircle size={16} color={colors.success} />
            ) : (
              <Circle size={16} color={colors.textLight} />
            )}
          </View>
          
          <View style={styles.activityItem}>
            <Target size={16} color={progress?.devotionalCompleted ? colors.success : colors.textLight} />
            <Text style={[styles.activityText, { color: colors.text }]}>Méditation</Text>
            {progress?.devotionalCompleted ? (
              <CheckCircle size={16} color={colors.success} />
            ) : (
              <Circle size={16} color={colors.textLight} />
            )}
          </View>
          
          <View style={styles.activityItem}>
            <Star size={16} color={progress?.journalCompleted ? colors.success : colors.textLight} />
            <Text style={[styles.activityText, { color: colors.text }]}>Journal spirituel</Text>
            {progress?.journalCompleted ? (
              <CheckCircle size={16} color={colors.success} />
            ) : (
              <Circle size={16} color={colors.textLight} />
            )}
          </View>
        </View>
      </View>
    );
  };
  
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/');
    }
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Back Button - Visible on mobile */}
      {Platform.OS !== 'web' && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity 
            onPress={handleGoBack}
            style={[styles.backButton, { backgroundColor: colors.card }]}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={colors.text} />
            <Text style={[styles.backButtonText, { color: colors.text }]}>Retour</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Calendar size={24} color={colors.white} />
          <Text style={styles.headerTitle}>Calendrier Spirituel</Text>
          <Text style={styles.headerSubtitle}>Suivez votre parcours quotidien</Text>
        </View>
      </LinearGradient>
      
      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.currentStreak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Série actuelle</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.success }]}>{stats.totalReadings}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Lectures totales</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.warning }]}>{stats.level}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Niveau</Text>
        </View>
      </View>
      
      {/* Calendar Navigation */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <ChevronLeft size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.monthTitle, { color: colors.text }]}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
          <ChevronRight size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Day Names */}
      <View style={styles.dayNamesRow}>
        {dayNames.map((dayName) => (
          <Text key={dayName} style={[styles.dayName, { color: colors.textSecondary }]}>
            {dayName}
          </Text>
        ))}
      </View>
      
      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map(renderDay)}
      </View>
      
      {/* Legend */}
      <View style={[styles.legend, { backgroundColor: colors.card }]}>
        <Text style={[styles.legendTitle, { color: colors.text }]}>Légende</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.wisdom }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Lecture</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.prayer }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Prière</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.peace }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Méditation</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.gratitude }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Journal</Text>
          </View>
        </View>
      </View>
      
      {/* Selected Day Details */}
      {renderSelectedDayDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
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
  headerSubtitle: {
    fontSize: typography.fontSizes.md,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  navButton: {
    padding: spacing.sm,
  },
  monthTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
  },
  dayNamesRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  dayName: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.xs,
    position: 'relative',
  },
  dayText: {
    fontSize: typography.fontSizes.md,
  },
  activityIndicators: {
    position: 'absolute',
    bottom: 4,
    flexDirection: 'row',
    gap: 2,
  },
  activityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  completeBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 8,
    padding: 1,
  },
  legend: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
  },
  legendTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: typography.fontSizes.sm,
  },
  detailsCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
  },
  detailsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  activitiesList: {
    gap: spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  activityText: {
    fontSize: typography.fontSizes.md,
    flex: 1,
  },
  backButtonContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  backButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
  },
});