import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  Circle,
  Target,
  Clock,
  Star
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';
import { ReadingPlan as ReadingPlanType } from '@/types/spiritual';
import { bibleBooks } from '@/mocks/bible-books';

const predefinedPlans = [
  {
    title: 'Évangiles en 30 jours',
    description: 'Découvrez la vie de Jésus à travers les quatre évangiles',
    duration: 30,
    chapters: ['matthieu-1', 'matthieu-2', 'matthieu-3', 'marc-1', 'marc-2', 'luc-1', 'luc-2', 'jean-1'],
    category: 'Nouveau Testament',
  },
  {
    title: 'Psaumes de louange',
    description: 'Un mois de méditation sur les plus beaux psaumes',
    duration: 31,
    chapters: ['psaumes-1', 'psaumes-23', 'psaumes-91', 'psaumes-103', 'psaumes-139'],
    category: 'Ancien Testament',
  },
  {
    title: 'Sagesse biblique',
    description: 'Proverbes et Ecclésiaste pour grandir en sagesse',
    duration: 21,
    chapters: ['proverbes-1', 'proverbes-2', 'proverbes-3', 'ecclesiaste-1', 'ecclesiaste-3'],
    category: 'Sagesse',
  },
  {
    title: 'Lettres de Paul',
    description: 'Les enseignements essentiels de l\'apôtre Paul',
    duration: 28,
    chapters: ['romains-1', 'romains-8', '1-corinthiens-13', 'ephesiens-1', 'philippiens-4'],
    category: 'Épîtres',
  },
];

export const ReadingPlan: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof predefinedPlans[0] | null>(null);

  const readingPlans = useSpiritualStore((state) => state.readingPlans);
  const currentReadingPlan = useSpiritualStore((state) => state.currentReadingPlan);
  const createReadingPlan = useSpiritualStore((state) => state.createReadingPlan);
  const setCurrentReadingPlan = useSpiritualStore((state) => state.setCurrentReadingPlan);
  const updateReadingPlanProgress = useSpiritualStore((state) => state.updateReadingPlanProgress);

  const createPlan = (planData: typeof predefinedPlans[0]) => {
    createReadingPlan({
      title: planData.title,
      description: planData.description,
      duration: planData.duration,
      chapters: planData.chapters,
    });
    setIsModalVisible(false);
  };

  const markChapterComplete = (planId: string, chapterId: string) => {
    updateReadingPlanProgress(planId, chapterId);
  };

  const getProgressPercentage = (plan: ReadingPlanType) => {
    return Math.round((plan.progress.length / plan.chapters.length) * 100);
  };

  const getDaysRemaining = (plan: ReadingPlanType) => {
    const createdDate = new Date(plan.createdAt);
    const endDate = new Date(createdDate.getTime() + plan.duration * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const PlanCard = ({ plan }: { plan: ReadingPlanType }) => {
    const progress = getProgressPercentage(plan);
    const daysRemaining = getDaysRemaining(plan);
    const isActive = currentReadingPlan?.id === plan.id;

    return (
      <View style={styles.planCard}>
        <LinearGradient
          colors={isActive ? colors.primaryGradient : [colors.white, colors.cardSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.planGradient}
        >
          <View style={styles.planHeader}>
            <View style={styles.planInfo}>
              <Text style={[styles.planTitle, isActive && { color: colors.white }]}>
                {plan.title}
              </Text>
              <Text style={[styles.planDescription, isActive && { color: colors.white + 'CC' }]}>
                {plan.description}
              </Text>
            </View>
            <View style={styles.planStats}>
              <View style={[styles.statItem, isActive && { backgroundColor: colors.white + '20' }]}>
                <Calendar size={16} color={isActive ? colors.white : colors.primary} />
                <Text style={[styles.statText, isActive && { color: colors.white }]}>
                  {daysRemaining}j
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={[styles.progressText, isActive && { color: colors.white }]}>
                Progression: {progress}%
              </Text>
              <Text style={[styles.progressDetail, isActive && { color: colors.white + 'CC' }]}>
                {plan.progress.length}/{plan.chapters.length} chapitres
              </Text>
            </View>
            <View style={[styles.progressBar, isActive && { backgroundColor: colors.white + '30' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progress}%`,
                    backgroundColor: isActive ? colors.white : colors.primary
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.planActions}>
            {!isActive && (
              <TouchableOpacity
                style={styles.activateButton}
                onPress={() => setCurrentReadingPlan(plan.id)}
              >
                <Text style={styles.activateButtonText}>Activer</Text>
              </TouchableOpacity>
            )}
            {isActive && (
              <View style={styles.activeIndicator}>
                <Star size={16} color={colors.white} />
                <Text style={[styles.activeText, { color: colors.white }]}>Plan actif</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  };

  const CurrentPlanProgress = () => {
    if (!currentReadingPlan) return null;

    const completedChapters = currentReadingPlan.progress.map(p => p.chapterId);

    return (
      <View style={styles.currentPlanContainer}>
        <Text style={styles.currentPlanTitle}>Plan en cours</Text>
        <Text style={styles.currentPlanName}>{currentReadingPlan.title}</Text>
        
        <ScrollView style={styles.chaptersList} showsVerticalScrollIndicator={false}>
          {currentReadingPlan.chapters.map((chapterId, index) => {
            const isCompleted = completedChapters.includes(chapterId);
            
            return (
              <TouchableOpacity
                key={chapterId}
                style={styles.chapterItem}
                onPress={() => {
                  if (!isCompleted) {
                    Alert.alert(
                      'Marquer comme lu',
                      `Avez-vous terminé la lecture de ce chapitre ?`,
                      [
                        { text: 'Annuler', style: 'cancel' },
                        { 
                          text: 'Oui', 
                          onPress: () => markChapterComplete(currentReadingPlan.id, chapterId)
                        },
                      ]
                    );
                  }
                }}
              >
                <View style={styles.chapterIcon}>
                  {isCompleted ? (
                    <CheckCircle size={20} color={colors.success} />
                  ) : (
                    <Circle size={20} color={colors.textLight} />
                  )}
                </View>
                <View style={styles.chapterInfo}>
                  <Text style={[
                    styles.chapterTitle,
                    isCompleted && { color: colors.textLight, textDecorationLine: 'line-through' }
                  ]}>
                    Jour {index + 1}
                  </Text>
                  <Text style={[
                    styles.chapterReference,
                    isCompleted && { color: colors.textLight }
                  ]}>
                    {chapterId.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plans de Lecture</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentReadingPlan && <CurrentPlanProgress />}
        
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Mes Plans</Text>
          {readingPlans.length > 0 ? (
            readingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Target size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>Aucun plan de lecture</Text>
              <Text style={styles.emptySubtitle}>
                Créez votre premier plan pour structurer votre lecture biblique
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButton}>Annuler</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouveau Plan</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>Plans recommandés</Text>
            {predefinedPlans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                style={styles.predefinedPlan}
                onPress={() => createPlan(plan)}
              >
                <LinearGradient
                  colors={[colors.white, colors.cardSecondary]}
                  style={styles.predefinedPlanGradient}
                >
                  <View style={styles.predefinedPlanHeader}>
                    <Text style={styles.predefinedPlanTitle}>{plan.title}</Text>
                    <View style={styles.predefinedPlanMeta}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text style={styles.predefinedPlanDuration}>{plan.duration} jours</Text>
                    </View>
                  </View>
                  <Text style={styles.predefinedPlanDescription}>{plan.description}</Text>
                  <View style={styles.predefinedPlanFooter}>
                    <Text style={styles.predefinedPlanCategory}>{plan.category}</Text>
                    <Text style={styles.predefinedPlanChapters}>
                      {plan.chapters.length} chapitres
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    borderRadius: 20,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  currentPlanContainer: {
    margin: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  currentPlanTitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  currentPlanName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  chaptersList: {
    maxHeight: 200,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  chapterIcon: {
    marginRight: spacing.md,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.text,
  },
  chapterReference: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  plansSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  planDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
  },
  planStats: {
    alignItems: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
    color: colors.text,
  },
  progressDetail: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.cardSecondary,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  planActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  activateButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  activateButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    fontWeight: '500',
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cancelButton: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 60,
  },
  modalContent: {
    flex: 1,
    padding: spacing.md,
  },
  modalSubtitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  predefinedPlan: {
    marginBottom: spacing.md,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  predefinedPlanGradient: {
    borderRadius: 16,
    padding: spacing.md,
  },
  predefinedPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  predefinedPlanTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  predefinedPlanMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predefinedPlanDuration: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  predefinedPlanDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
    marginBottom: spacing.md,
  },
  predefinedPlanFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predefinedPlanCategory: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: '500',
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  predefinedPlanChapters: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
  },
});