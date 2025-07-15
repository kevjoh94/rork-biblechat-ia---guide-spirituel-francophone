import { LinearGradient } from "expo-linear-gradient";
import { Calendar, CheckCircle, Circle, Target, Trophy } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface ReadingPlanDay {
  day: number;
  date: Date;
  readings: {
    book: string;
    chapter: number;
    title: string;
  }[];
  completed: boolean;
}

interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // en jours
  theme: string;
  color: string;
  progress: number; // pourcentage
  days: ReadingPlanDay[];
}

interface ReadingPlanProps {
  plans: ReadingPlan[];
  activePlan?: ReadingPlan;
  onSelectPlan: (plan: ReadingPlan) => void;
  onMarkDayComplete: (planId: string, day: number) => void;
}

export const ReadingPlanComponent: React.FC<ReadingPlanProps> = ({
  plans,
  activePlan,
  onSelectPlan,
  onMarkDayComplete
}) => {
  const [selectedTab, setSelectedTab] = useState<'plans' | 'progress'>('plans');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStreakDays = (plan: ReadingPlan) => {
    let streak = 0;
    const sortedDays = [...plan.days].sort((a, b) => a.day - b.day);
    
    for (let i = sortedDays.length - 1; i >= 0; i--) {
      if (sortedDays[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const PlanCard = ({ plan }: { plan: ReadingPlan }) => (
    <TouchableOpacity
      style={styles.planCard}
      onPress={() => onSelectPlan(plan)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.white, colors.cardSecondary]}
        style={styles.planGradient}
      >
        <View style={styles.planHeader}>
          <View style={[styles.planIcon, { backgroundColor: plan.color }]}>
            <Target size={20} color={colors.white} />
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planTheme}>{plan.theme}</Text>
          </View>
          <View style={styles.planDuration}>
            <Text style={styles.durationText}>{plan.duration}j</Text>
          </View>
        </View>
        
        <Text style={styles.planDescription} numberOfLines={2}>
          {plan.description}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${plan.progress}%`, backgroundColor: plan.color }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(plan.progress)}%</Text>
        </View>
        
        {activePlan?.id === plan.id && (
          <View style={styles.activeIndicator}>
            <Text style={styles.activeText}>Plan actif</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const ProgressView = () => {
    if (!activePlan) {
      return (
        <View style={styles.noActivePlan}>
          <Calendar size={48} color={colors.textLight} />
          <Text style={styles.noActivePlanText}>
            Sélectionnez un plan de lecture pour commencer
          </Text>
        </View>
      );
    }

    const upcomingDays = activePlan.days
      .filter(day => !day.completed)
      .slice(0, 7);
    
    const completedDays = activePlan.days.filter(day => day.completed).length;
    const streak = getStreakDays(activePlan);

    return (
      <ScrollView style={styles.progressContent}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedDays}</Text>
            <Text style={styles.statLabel}>Jours complétés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Série actuelle</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{activePlan.duration - completedDays}</Text>
            <Text style={styles.statLabel}>Jours restants</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prochaines lectures</Text>
        </View>

        {upcomingDays.map((day) => (
          <View key={day.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <View style={styles.dayNumber}>
                <Text style={styles.dayNumberText}>J{day.day}</Text>
              </View>
              <View style={styles.dayInfo}>
                <Text style={styles.dayDate}>{formatDate(day.date)}</Text>
                <Text style={styles.readingCount}>
                  {day.readings.length} lecture{day.readings.length > 1 ? 's' : ''}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onMarkDayComplete(activePlan.id, day.day)}
                style={styles.completeButton}
              >
                {day.completed ? (
                  <CheckCircle size={24} color={colors.success} />
                ) : (
                  <Circle size={24} color={colors.textLight} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.readingsList}>
              {day.readings.map((reading, index) => (
                <View key={index} style={styles.readingItem}>
                  <Text style={styles.readingText}>
                    {reading.book} {reading.chapter} - {reading.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {completedDays === activePlan.duration && (
          <View style={styles.completionCard}>
            <LinearGradient
              colors={[colors.success + "20", colors.success + "10"]}
              style={styles.completionGradient}
            >
              <Trophy size={32} color={colors.success} />
              <Text style={styles.completionTitle}>Félicitations !</Text>
              <Text style={styles.completionText}>
                Vous avez terminé le plan "{activePlan.title}"
              </Text>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plans de lecture</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'plans' && styles.activeTab]}
            onPress={() => setSelectedTab('plans')}
          >
            <Text style={[
              styles.tabText, 
              selectedTab === 'plans' && styles.activeTabText
            ]}>
              Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'progress' && styles.activeTab]}
            onPress={() => setSelectedTab('progress')}
          >
            <Text style={[
              styles.tabText, 
              selectedTab === 'progress' && styles.activeTabText
            ]}>
              Progrès
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedTab === 'plans' ? (
        <ScrollView style={styles.plansContainer} showsVerticalScrollIndicator={false}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ScrollView>
      ) : (
        <ProgressView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  plansContainer: {
    flex: 1,
    padding: spacing.md,
  },
  planCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  planGradient: {
    borderRadius: 16,
    padding: spacing.md,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  planTheme: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  planDuration: {
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  durationText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "500",
    color: colors.text,
  },
  planDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeights.md,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "500",
    color: colors.text,
  },
  activeIndicator: {
    alignSelf: "flex-start",
    backgroundColor: colors.success + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  activeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.success,
    fontWeight: "500",
  },
  progressContent: {
    flex: 1,
    padding: spacing.md,
  },
  noActivePlan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  noActivePlanText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  dayCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  dayNumberText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600",
    color: colors.primary,
  },
  dayInfo: {
    flex: 1,
  },
  dayDate: {
    fontSize: typography.fontSizes.md,
    fontWeight: "500",
    color: colors.text,
  },
  readingCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  completeButton: {
    padding: spacing.xs,
  },
  readingsList: {
    paddingLeft: spacing.xl,
  },
  readingItem: {
    marginBottom: spacing.xs,
  },
  readingText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  completionCard: {
    marginTop: spacing.lg,
    borderRadius: 16,
    overflow: "hidden",
  },
  completionGradient: {
    padding: spacing.xl,
    alignItems: "center",
  },
  completionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.success,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  completionText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
});