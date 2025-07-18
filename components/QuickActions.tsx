import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MessageCircle, 
  BookOpen, 
  Heart, 
  Calendar, 
  Target, 
  Sparkles,
  PenTool,
  Headphones
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  colors: readonly [string, string];
  route: string;
}

export default function QuickActions() {
  const router = useRouter();

  const quickActions: QuickAction[] = [
    {
      id: 'chat',
      title: 'Chat IA',
      subtitle: 'Pose tes questions',
      icon: MessageCircle,
      colors: [colors.primary, colors.primaryLight] as [string, string],
      route: '/(tabs)/chat'
    },
    {
      id: 'bible',
      title: 'Lire la Bible',
      subtitle: 'Explore les Écritures',
      icon: BookOpen,
      colors: [colors.secondary, colors.secondary] as [string, string],
      route: '/(tabs)/bible'
    },
    {
      id: 'meditation',
      title: 'Méditation',
      subtitle: 'Moment de paix',
      icon: Headphones,
      colors: [colors.gratitude, colors.gratitude] as [string, string],
      route: '/(tabs)/meditation'
    },
    {
      id: 'journal',
      title: 'Journal',
      subtitle: 'Écris tes pensées',
      icon: PenTool,
      colors: [colors.accent, colors.accent] as [string, string],
      route: '/(tabs)/journal'
    },
    {
      id: 'plan',
      title: 'Plan quotidien',
      subtitle: 'Organise ta journée',
      icon: Target,
      colors: [colors.strength, colors.strength] as [string, string],
      route: '/daily-plan'
    },
    {
      id: 'calendar',
      title: 'Calendrier',
      subtitle: 'Vois ton progrès',
      icon: Calendar,
      colors: [colors.info, colors.info] as [string, string],
      route: '/calendar'
    }
  ];

  const handleActionPress = (route: string) => {
    router.push(route as any);
  };

  const renderAction = (action: QuickAction) => {
    const IconComponent = action.icon;
    
    return (
      <TouchableOpacity
        key={action.id}
        style={styles.actionCard}
        onPress={() => handleActionPress(action.route)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={action.colors}
          style={styles.actionGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.actionContent}>
            <View style={styles.iconContainer}>
              <IconComponent size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {quickActions.map(renderAction)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  scrollView: {
    paddingLeft: spacing.lg,
  },
  scrollContent: {
    paddingRight: spacing.lg,
  },
  actionCard: {
    width: 160,
    height: 100,
    marginRight: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionGradient: {
    flex: 1,
    padding: spacing.md,
  },
  actionContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: 'white',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: typography.lineHeights.sm,
  },
});