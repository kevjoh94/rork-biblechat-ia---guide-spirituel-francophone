import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Bell,
  Clock,
  Heart,
  BookOpen,
  MessageCircle,
  Calendar,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react-native';

import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useSpiritualStore } from '@/store/spiritual-store';

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  enabled: boolean;
  onToggle: () => void;
  time?: string;
  colors: any;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  title,
  subtitle,
  enabled,
  onToggle,
  time,
  colors,
}) => {
  const itemStyles = StyleSheet.create({
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    notificationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
      backgroundColor: colors.primaryLight,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      marginBottom: 2,
      color: colors.text,
    },
    notificationSubtitle: {
      fontSize: typography.fontSizes.sm,
      marginBottom: 2,
      color: colors.textSecondary,
    },
    notificationTime: {
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.medium,
      color: colors.primary,
    },
  });

  return (
    <View style={itemStyles.notificationItem}>
      <View style={itemStyles.notificationLeft}>
        <View style={[itemStyles.iconContainer, { opacity: enabled ? 1 : 0.5 }]}>
          {React.cloneElement(icon as React.ReactElement, {
            size: 20,
            color: colors.primary,
          } as any)}
        </View>
        <View style={itemStyles.notificationContent}>
          <Text style={[itemStyles.notificationTitle, { opacity: enabled ? 1 : 0.6 }]}>
            {title}
          </Text>
          <Text style={itemStyles.notificationSubtitle}>{subtitle}</Text>
          {time && enabled && (
            <Text style={itemStyles.notificationTime}>Programmé à {time}</Text>
          )}
        </View>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.borderLight, true: colors.primary }}
        thumbColor={colors.white}
      />
    </View>
  );
};

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const notifications = useSpiritualStore((state) => state.notifications);
  const updateNotificationSettings = useSpiritualStore(
    (state) => state.updateNotificationSettings
  );

  const [dailyVerse, setDailyVerse] = useState(true);
  const [prayerReminder, setPrayerReminder] = useState(true);
  const [readingPlan, setReadingPlan] = useState(false);
  const [meditation, setMeditation] = useState(true);
  const [community, setCommunity] = useState(false);
  const [achievements, setAchievements] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: spacing.lg,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    headerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      backgroundColor: colors.primaryLight,
    },
    headerTitle: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
      textAlign: 'center',
      marginBottom: spacing.xs,
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: typography.fontSizes.md,
      textAlign: 'center',
      lineHeight: typography.lineHeights.md,
      color: colors.textSecondary,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
      color: colors.text,
    },
    sectionContent: {
      marginHorizontal: spacing.lg,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.card,
    },
    masterToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    masterToggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    masterToggleContent: {
      marginLeft: spacing.md,
      flex: 1,
    },
    masterToggleTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: 2,
      color: colors.text,
    },
    masterToggleSubtitle: {
      fontSize: typography.fontSizes.sm,
      color: colors.textSecondary,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    notificationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
      backgroundColor: colors.primaryLight,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      marginBottom: 2,
      color: colors.text,
    },
    notificationSubtitle: {
      fontSize: typography.fontSizes.sm,
      marginBottom: 2,
      color: colors.textSecondary,
    },
    notificationTime: {
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.medium,
      color: colors.primary,
    },
    optionItem: {
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      marginBottom: 2,
      color: colors.text,
    },
    optionSubtitle: {
      fontSize: typography.fontSizes.sm,
      color: colors.textSecondary,
    },
    footer: {
      padding: spacing.xl,
      alignItems: 'center',
    },
    footerText: {
      fontSize: typography.fontSizes.sm,
      textAlign: 'center',
      color: colors.textSecondary,
    },
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    updateNotificationSettings({ [key]: !notifications[key] });
  };

  const scheduleNotification = (type: string) => {
    Alert.alert(
      'Programmer la notification',
      `Quand souhaitez-vous recevoir les notifications ${type} ?`,
      [
        { text: 'Matin (8h00)', onPress: () => console.log('Scheduled for 8:00') },
        { text: 'Midi (12h00)', onPress: () => console.log('Scheduled for 12:00') },
        { text: 'Soir (20h00)', onPress: () => console.log('Scheduled for 20:00') },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: colors.primary,
          headerBackTitle: '',


        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Bell color={colors.primary} size={24} />
          </View>
          <Text style={styles.headerTitle}>Restez connecté spirituellement</Text>
          <Text style={styles.headerSubtitle}>
            Configurez vos rappels pour maintenir une pratique spirituelle régulière
          </Text>
        </View>

        {/* Notifications principales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications push</Text>
          <View style={styles.sectionContent}>
            <View style={styles.masterToggle}>
              <View style={styles.masterToggleLeft}>
                <Bell color={colors.primary} size={20} />
                <View style={styles.masterToggleContent}>
                  <Text style={styles.masterToggleTitle}>Activer les notifications</Text>
                  <Text style={styles.masterToggleSubtitle}>
                    Autoriser toutes les notifications push
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications.push}
                onValueChange={() => handleNotificationToggle('push')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        {/* Types de notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types de rappels</Text>
          <View style={styles.sectionContent}>
            <NotificationItem
              icon={<Star />}
              title="Verset du jour"
              subtitle="Recevez votre inspiration quotidienne"
              enabled={dailyVerse && notifications.push}
              onToggle={() => setDailyVerse(!dailyVerse)}
              time="8:00"
              colors={colors}
            />
            
            <NotificationItem
              icon={<Heart />}
              title="Rappel de prière"
              subtitle="Moments de recueillement"
              enabled={prayerReminder && notifications.push}
              onToggle={() => setPrayerReminder(!prayerReminder)}
              time="12:00, 18:00"
              colors={colors}
            />
            
            <NotificationItem
              icon={<BookOpen />}
              title="Plan de lecture"
              subtitle="Progression dans vos lectures"
              enabled={readingPlan && notifications.push}
              onToggle={() => setReadingPlan(!readingPlan)}
              colors={colors}
            />
            
            <NotificationItem
              icon={<Clock />}
              title="Méditation"
              subtitle="Sessions de méditation guidée"
              enabled={meditation && notifications.push}
              onToggle={() => setMeditation(!meditation)}
              time="20:00"
              colors={colors}
            />
            
            <NotificationItem
              icon={<MessageCircle />}
              title="Communauté"
              subtitle="Nouvelles discussions et partages"
              enabled={community && notifications.push}
              onToggle={() => setCommunity(!community)}
              colors={colors}
            />
            
            <NotificationItem
              icon={<Calendar />}
              title="Réussites"
              subtitle="Célébrez vos accomplissements"
              enabled={achievements && notifications.push}
              onToggle={() => setAchievements(!achievements)}
              colors={colors}
            />
          </View>
        </View>

        {/* Options avancées */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => scheduleNotification('personnalisées')}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Clock color={colors.primary} size={20} />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Horaires personnalisés</Text>
                  <Text style={styles.optionSubtitle}>
                    Définir vos propres créneaux
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => {
                Alert.alert(
                  'Test de notification',
                  'Une notification de test va être envoyée.',
                  [{ text: 'OK' }]
                );
              }}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Volume2 color={colors.primary} size={20} />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Tester les notifications</Text>
                  <Text style={styles.optionSubtitle}>
                    Vérifier le bon fonctionnement
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Les notifications vous aident à maintenir une pratique spirituelle régulière 🔔
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

