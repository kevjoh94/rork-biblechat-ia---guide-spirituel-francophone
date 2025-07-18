import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Users, 
  User,
  Settings,
  Bell,
  Download,
  ChevronRight
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, onPress, color }) => {
  return (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color ? color + '15' : colors.primary + '15' }]}>
        {React.cloneElement(icon as React.ReactElement, { color: color, size: 24 } as any)}
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <ChevronRight color={colors.textSecondary} size={20} />
    </TouchableOpacity>
  );
};

export default function MoreScreen() {
  const spiritualFeatures = [
    {
      icon: <User />,
      title: 'Mon Profil',
      subtitle: 'Statistiques et réalisations',
      onPress: () => router.push('/(tabs)/profile'),
      color: colors.primary
    },
    {
      icon: <Heart />,
      title: 'Méditation',
      subtitle: 'Sessions guidées et prières',
      onPress: () => router.push('/(tabs)/meditation'),
      color: colors.secondary
    },
    {
      icon: <BookOpen />,
      title: 'Journal Spirituel',
      subtitle: 'Réflexions et gratitude',
      onPress: () => router.push('/(tabs)/journal'),
      color: colors.accent
    },
    {
      icon: <Calendar />,
      title: 'Plans de Lecture',
      subtitle: 'Programmes structurés',
      onPress: () => router.push('/(tabs)/reading-plan'),
      color: colors.primary
    },
    {
      icon: <Sparkles />,
      title: 'Insights Spirituels',
      subtitle: 'Analyses et découvertes',
      onPress: () => router.push('/(tabs)/insights'),
      color: colors.warning
    },
    {
      icon: <Users />,
      title: 'Communauté',
      subtitle: 'Partage et discussions',
      onPress: () => router.push('/(tabs)/community'),
      color: colors.info
    },
    {
      icon: <Calendar />,
      title: 'Calendrier de Suivi',
      subtitle: 'Suivez votre progression spirituelle',
      onPress: () => router.push('/calendar'),
      color: colors.success
    },
    {
      icon: <Calendar />,
      title: 'Plan Quotidien',
      subtitle: 'Organisez votre journée spirituelle',
      onPress: () => router.push('/daily-plan'),
      color: colors.gratitude
    }
  ];

  const appFeatures = [
    {
      icon: <Settings />,
      title: 'Paramètres',
      subtitle: 'Configuration de l\'app',
      onPress: () => router.push('/settings'),
      color: colors.textSecondary
    },
    {
      icon: <Bell />,
      title: 'Notifications',
      subtitle: 'Rappels et alertes',
      onPress: () => router.push('/notifications'),
      color: colors.error
    },
    {
      icon: <Download />,
      title: 'Contenu Hors-ligne',
      subtitle: 'Téléchargements disponibles',
      onPress: () => {
        // TODO: Navigate to offline content
        console.log('Navigate to offline content');
      },
      color: colors.warning
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Fonctionnalités</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Explorez toutes les possibilités de l'app</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Spiritualité</Text>
          <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
            {spiritualFeatures.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                color={item.color}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Application</Text>
          <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
            {appFeatures.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                color={item.color}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textLight }]}>
            Découvrez de nouvelles façons d'approfondir votre foi
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  menuContainer: {
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: typography.fontSizes.sm,
    lineHeight: typography.lineHeights.sm,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
    lineHeight: typography.lineHeights.sm,
  },
});