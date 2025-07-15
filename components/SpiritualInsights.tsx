import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, RefreshCw, Heart, Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

interface Insight {
  id: string;
  title: string;
  content: string;
  verse?: string;
  reference?: string;
  category: 'encouragement' | 'reflection' | 'prayer' | 'wisdom';
}

const insightCategories = {
  encouragement: { icon: Heart, color: colors.love, label: 'Encouragement' },
  reflection: { icon: Sparkles, color: colors.peace, label: 'Réflexion' },
  prayer: { icon: Star, color: colors.spiritual, label: 'Prière' },
  wisdom: { icon: RefreshCw, color: colors.strength, label: 'Sagesse' },
};

export const SpiritualInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof insightCategories | 'all'>('all');
  
  const journalEntries = useSpiritualStore((state) => state.journalEntries);
  const stats = useSpiritualStore((state) => state.stats);
  const addExperience = useSpiritualStore((state) => state.addExperience);

  useEffect(() => {
    generatePersonalizedInsights();
  }, [journalEntries, stats]);

  const generatePersonalizedInsights = async () => {
    setIsLoading(true);
    
    try {
      // Analyze user's spiritual journey
      const recentEntries = journalEntries.slice(0, 3);
      const userContext = {
        totalReadings: stats.totalReadings,
        currentStreak: stats.currentStreak,
        level: stats.level,
        recentMoods: recentEntries.map(entry => entry.mood).filter(Boolean),
        recentTopics: recentEntries.map(entry => entry.title).join(', '),
      };

      const messages = [
        {
          role: 'system' as const,
          content: `Tu es un conseiller spirituel IA qui génère des insights personnalisés basés sur le parcours spirituel de l'utilisateur. 
          
          Génère 3-4 insights courts et encourageants (2-3 phrases chacun) dans différentes catégories :
          - encouragement : messages d'espoir et de soutien
          - reflection : questions profondes pour la méditation
          - prayer : suggestions de prière
          - wisdom : enseignements bibliques pratiques
          
          Chaque insight doit inclure un verset biblique pertinent avec sa référence.
          
          IMPORTANT: Réponds UNIQUEMENT avec du JSON valide, sans markdown, sans backticks, sans texte supplémentaire.
          
          Format de réponse JSON :
          {
            "insights": [
              {
                "title": "Titre court",
                "content": "Contenu de l'insight",
                "verse": "Verset biblique",
                "reference": "Référence biblique",
                "category": "encouragement|reflection|prayer|wisdom"
              }
            ]
          }`
        },
        {
          role: 'user' as const,
          content: `Voici mon contexte spirituel : ${JSON.stringify(userContext)}. Génère des insights personnalisés pour m'aider dans mon cheminement.`
        }
      ];

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }

      const data = await response.json();
      
      try {
        // Clean the response by removing markdown code blocks if present
        let cleanedCompletion = data.completion.trim();
        
        // Remove markdown code blocks (```json ... ```)
        if (cleanedCompletion.startsWith('```')) {
          cleanedCompletion = cleanedCompletion.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
        }
        
        // Remove any leading/trailing backticks
        cleanedCompletion = cleanedCompletion.replace(/^`+|`+$/g, '');
        
        const parsedInsights = JSON.parse(cleanedCompletion);
        
        if (parsedInsights.insights && Array.isArray(parsedInsights.insights)) {
          const formattedInsights = parsedInsights.insights.map((insight: any, index: number) => ({
            ...insight,
            id: `insight-${Date.now()}-${index}`,
          }));
          
          setInsights(formattedInsights);
          addExperience(5); // Reward for engaging with insights
        } else {
          throw new Error('Invalid insights format');
        }
      } catch (parseError) {
        console.error('Error parsing insights:', parseError);
        console.error('Raw completion:', data.completion);
        setDefaultInsights();
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      setDefaultInsights();
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultInsights = () => {
    const defaultInsights: Insight[] = [
      {
        id: 'default-1',
        title: 'Persévérance dans la foi',
        content: 'Votre régularité dans la lecture spirituelle témoigne d\'un cœur sincère. Continuez à chercher Dieu chaque jour.',
        verse: 'Cherchez le Seigneur pendant qu\'il se trouve ; invoquez-le, tandis qu\'il est près.',
        reference: 'Ésaïe 55:6',
        category: 'encouragement',
      },
      {
        id: 'default-2',
        title: 'Méditation du cœur',
        content: 'Prenez un moment pour réfléchir : Comment Dieu vous a-t-il guidé cette semaine ?',
        verse: 'Mon cœur médite pendant la nuit, mon esprit fait des recherches.',
        reference: 'Psaume 77:6',
        category: 'reflection',
      },
      {
        id: 'default-3',
        title: 'Prière de gratitude',
        content: 'Aujourd\'hui, offrez une prière de reconnaissance pour les bénédictions reçues.',
        verse: 'Rendez grâces en toutes choses, car c\'est à votre égard la volonté de Dieu en Jésus-Christ.',
        reference: '1 Thessaloniciens 5:18',
        category: 'prayer',
      },
    ];
    
    setInsights(defaultInsights);
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const InsightCard = ({ insight }: { insight: Insight }) => {
    const categoryData = insightCategories[insight.category];
    const Icon = categoryData.icon;

    return (
      <View style={styles.insightCard}>
        <LinearGradient
          colors={[colors.white, colors.cardSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.insightGradient}
        >
          <View style={styles.insightHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: categoryData.color + '15' }]}>
              <Icon size={16} color={categoryData.color} />
            </View>
            <Text style={styles.categoryLabel}>{categoryData.label}</Text>
          </View>
          
          <Text style={styles.insightTitle}>{insight.title}</Text>
          <Text style={styles.insightContent}>{insight.content}</Text>
          
          {insight.verse && (
            <View style={styles.verseContainer}>
              <Text style={styles.verseText}>"{insight.verse}"</Text>
              <Text style={styles.verseReference}>— {insight.reference}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Sparkles size={24} color={colors.primary} />
          <Text style={styles.title}>Insights Spirituels</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={generatePersonalizedInsights}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <RefreshCw size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'all' && styles.categoryButtonActive
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === 'all' && styles.categoryButtonTextActive
          ]}>
            Tous
          </Text>
        </TouchableOpacity>
        
        {Object.entries(insightCategories).map(([key, data]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              selectedCategory === key && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(key as keyof typeof insightCategories)}
          >
            <data.icon size={16} color={selectedCategory === key ? colors.white : data.color} />
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === key && styles.categoryButtonTextActive
            ]}>
              {data.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.insightsList} showsVerticalScrollIndicator={false}>
        {filteredInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
        
        {filteredInsights.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Sparkles size={48} color={colors.textLight} />
            <Text style={styles.emptyTitle}>Aucun insight disponible</Text>
            <Text style={styles.emptySubtitle}>
              Continuez votre parcours spirituel pour recevoir des insights personnalisés
            </Text>
          </View>
        )}
      </ScrollView>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilter: {
    maxHeight: 50,
  },
  categoryFilterContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: colors.white,
  },
  insightsList: {
    flex: 1,
    padding: spacing.md,
  },
  insightCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  insightGradient: {
    borderRadius: 16,
    padding: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  insightTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  insightContent: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
    marginBottom: spacing.md,
  },
  verseContainer: {
    backgroundColor: colors.primary + '10',
    borderRadius: 8,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  verseText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  verseReference: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
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
});