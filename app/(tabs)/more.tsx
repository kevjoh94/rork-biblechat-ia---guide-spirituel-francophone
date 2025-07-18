import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
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
  ChevronRight,
  Moon,
  Sun,
  Share,
  Star,
  HelpCircle,
  Shield,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpiritualStore } from '@/store/spiritual-store';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  badge?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  color, 
  showSwitch, 
  switchValue, 
  onSwitchChange,
  badge 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: colors.border }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color ? color + '20' : colors.primary + '20' }]}>
        {React.cloneElement(icon as React.ReactElement, { color: color || colors.primary, size: 22 } as any)}
      </View>
      <View style={styles.menuContent}>
        <View style={styles.titleRow}>
          <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: colors.warning }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={switchValue ? colors.primary : colors.textSecondary}
        />
      ) : (
        <ChevronRight color={colors.textSecondary} size={20} />
      )}
    </TouchableOpacity>
  );
};

export default function MoreScreen() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const stats = useSpiritualStore((state) => state.stats);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const styles = createStyles(colors);
  const spiritualFeatures = [
    {
      icon: <User />,
      title: 'Mon Profil',
      subtitle: `Niveau ${stats?.level || 1} • ${stats?.totalReadings || 0} lectures`,
      onPress: () => router.push('/(tabs)/profile'),
      color: colors.primary,
      badge: stats?.currentStreak && stats.currentStreak >= 7 ? 'Streak!' : undefined
    },
    {
      icon: <Heart />,
      title: 'Méditation',
      subtitle: 'Sessions guidées et prières',
      onPress: () => router.push('/(tabs)/meditation'),
      color: colors.peace
    },
    {
      icon: <BookOpen />,
      title: 'Journal Spirituel',
      subtitle: 'Réflexions et gratitude quotidienne',
      onPress: () => router.push('/(tabs)/journal'),
      color: colors.hope
    },
    {
      icon: <Calendar />,
      title: 'Plans de Lecture',
      subtitle: 'Programmes structurés pour progresser',
      onPress: () => router.push('/(tabs)/reading-plan'),
      color: colors.wisdom
    },
    {
      icon: <Sparkles />,
      title: 'Insights Spirituels',
      subtitle: 'Analyses et découvertes personnalisées',
      onPress: () => router.push('/(tabs)/insights'),
      color: colors.gratitude
    },
    {
      icon: <Users />,
      title: 'Communauté',
      subtitle: 'Partage et discussions avec d\'autres croyants',
      onPress: () => router.push('/(tabs)/community'),
      color: colors.strength
    }
  ];

  const quickActions = [
    {
      icon: <Calendar />,
      title: 'Calendrier Spirituel',
      subtitle: 'Suivez votre progression quotidienne',
      onPress: () => router.push('/calendar'),
      color: colors.success
    },
    {
      icon: <Zap />,
      title: 'Plan Quotidien',
      subtitle: 'Organisez votre journée spirituelle',
      onPress: () => router.push('/daily-plan'),
      color: colors.warning
    }
  ];
  
  const appFeatures = [
    {
      icon: isDarkMode ? <Sun /> : <Moon />,
      title: 'Thème',
      subtitle: isDarkMode ? 'Mode clair' : 'Mode sombre',
      onPress: () => {},
      color: colors.primary,
      showSwitch: true,
      switchValue: isDarkMode,
      onSwitchChange: toggleDarkMode
    },
    {
      icon: <Bell />,
      title: 'Notifications',
      subtitle: 'Rappels quotidiens et alertes',
      onPress: () => router.push('/notifications'),
      color: colors.warning,
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled
    },
    {
      icon: <Settings />,
      title: 'Paramètres',
      subtitle: 'Configuration et préférences',
      onPress: () => router.push('/settings'),
      color: colors.textSecondary
    },
    {
      icon: <Download />,
      title: 'Contenu Hors-ligne',
      subtitle: 'Téléchargements pour usage sans internet',
      onPress: () => {
        Alert.alert(
          'Contenu Hors-ligne',
          'Cette fonctionnalité sera bientôt disponible pour télécharger la Bible et d\'autres contenus.',
          [{ text: 'OK' }]
        );
      },
      color: colors.info
    }
  ];
  
  const supportFeatures = [
    {
      icon: <Share />,
      title: 'Partager l\'App',
      subtitle: 'Invitez vos proches à découvrir BibleChat IA',
      onPress: () => {
        Alert.alert(
          'Partager',
          'Partagez BibleChat IA avec vos amis et votre famille !',
          [{ text: 'OK' }]
        );
      },
      color: colors.success
    },
    {
      icon: <Star />,
      title: 'Évaluer l\'App',
      subtitle: 'Donnez votre avis sur l\'App Store',
      onPress: () => {
        Alert.alert(
          'Évaluation',
          'Merci de nous soutenir en évaluant l\'application !',
          [{ text: 'OK' }]
        );
      },
      color: colors.warning
    },
    {
      icon: <HelpCircle />,
      title: 'Aide & Support',
      subtitle: 'FAQ et assistance technique',
      onPress: () => {
        Alert.alert(
          'Support',
          'Pour toute question, contactez-nous à support@biblechat-ia.com',
          [{ text: 'OK' }]
        );
      },
      color: colors.info
    },
    {
      icon: <Shield />,
      title: 'Confidentialité',
      subtitle: 'Politique de confidentialité et conditions',
      onPress: () => {
        Alert.alert(
          'Confidentialité',
          'Vos données sont protégées et ne sont jamais partagées avec des tiers.',
          [{ text: 'OK' }]
        );
      },
      color: colors.textSecondary
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary + '15', colors.transparent]}
          style={styles.header}
        >
          <Text style={styles.title}>Plus</Text>
          <Text style={styles.subtitle}>Découvrez toutes les fonctionnalités</Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.menuContainer}>
            {quickActions.map((item, index) => (
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

        {/* Spiritual Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parcours Spirituel</Text>
          <View style={styles.menuContainer}>
            {spiritualFeatures.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                color={item.color}
                badge={item.badge}
              />
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.menuContainer}>
            {appFeatures.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={item.onPress}
                color={item.color}
                showSwitch={item.showSwitch}
                switchValue={item.switchValue}
                onSwitchChange={item.onSwitchChange}
              />
            ))}
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Communauté</Text>
          <View style={styles.menuContainer}>
            {supportFeatures.map((item, index) => (
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
          <Text style={styles.footerText}>
            🙏 Que Dieu vous bénisse dans votre parcours spirituel
          </Text>
          <Text style={[styles.versionText, { color: colors.textLight }]}>
            Version 1.0.0 • BibleChat IA
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  menuContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  badge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: spacing.xs,
  },
  badgeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    fontWeight: typography.fontWeights.bold,
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
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.sm,
  },
  versionText: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
  },
});