import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useSpiritualStore } from '@/store/spiritual-store';

const { width } = Dimensions.get('window');

interface CalendarDay {
  date: number;
  isToday: boolean;
  isCompleted: boolean;
  hasStreak: boolean;
  month: number;
  year: number;
}

export const SpiritualCalendar: React.FC = () => {
  const { colors } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { dailyProgress } = useSpiritualStore();

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days: CalendarDay[] = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({
        date: prevMonthDate.getDate(),
        isToday: false,
        isCompleted: false,
        hasStreak: false,
        month: prevMonthDate.getMonth(),
        year: prevMonthDate.getFullYear(),
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const isToday = 
        currentDay.getDate() === today.getDate() &&
        currentDay.getMonth() === today.getMonth() &&
        currentDay.getFullYear() === today.getFullYear();

      const dateKey = `${year}-${month + 1}-${day}`;
      const dayProgress = dailyProgress[dateKey];
      
      days.push({
        date: day,
        isToday,
        isCompleted: dayProgress?.completed || false,
        hasStreak: dayProgress?.streak || false,
        month,
        year,
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const currentStreak = Object.values(dailyProgress).filter(p => p.streak).length;

  const renderDay = (day: CalendarDay, index: number) => {
    const isCurrentMonth = day.month === currentDate.getMonth();
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dayContainer,
          !isCurrentMonth && styles.otherMonthDay,
        ]}
        activeOpacity={0.7}
      >
        {day.isCompleted ? (
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.completedDay}
          >
            {day.hasStreak && (
              <Flame size={12} color={colors.white} style={styles.streakIcon} />
            )}
            <Text style={[styles.dayText, { color: colors.white }]}>
              {day.date}
            </Text>
          </LinearGradient>
        ) : (
          <View style={[
            styles.dayCircle,
            day.isToday && { backgroundColor: colors.accent },
            { borderColor: colors.border }
          ]}>
            <Text style={[
              styles.dayText,
              { color: day.isToday ? colors.white : isCurrentMonth ? colors.text : colors.textLight }
            ]}>
              {day.date}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.monthTitle, { color: colors.text }]}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
          <ChevronRight size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Streak indicator */}
      <View style={styles.streakContainer}>
        <View style={styles.streakBadge}>
          <Flame size={16} color={colors.accent} />
          <Text style={[styles.streakText, { color: colors.text }]}>
            {currentStreak} jours de suite
          </Text>
        </View>
      </View>

      {/* Day names */}
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName, index) => (
          <Text key={index} style={[styles.dayName, { color: colors.textSecondary }]}>
            {dayName}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {days.map((day, index) => renderDay(day, index))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Aujourd'hui
          </Text>
        </View>
        <View style={styles.legendItem}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.legendDot}
          />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Complété
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]}>
            <Flame size={8} color={colors.white} />
          </View>
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Série
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  streakText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: (width - 72) / 7,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayContainer: {
    width: (width - 72) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  completedDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  streakIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
  },
});