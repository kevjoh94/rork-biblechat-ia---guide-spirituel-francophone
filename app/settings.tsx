import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import {
  Moon,
  Sun,
  Bell,
  Volume2,
  Smartphone,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
} from 'lucide-react-native';

import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useSpiritualStore } from '@/store/spiritual-store';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingLeft}>
      <View style={styles.iconContainer}>
        {React.cloneElement(icon as React.ReactElement, {
          color: colors.primary,
          size: 20,
        })}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.settingRight}>
      {rightElement}
      {showChevron && onPress && (
        <ChevronRight color={colors.textSecondary} size={16} />
      )}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { colors } = useTheme();
  const isDarkMode = useSpiritualStore((state) => state.isDarkMode);
  const notifications = useSpiritualStore((state) => state.notifications);
  const toggleDarkMode = useSpiritualStore((state) => state.toggleDarkMode);
  const updateNotificationSettings = useSpiritualStore(
    (state) => state.updateNotificationSettings
  );

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    updateNotificationSettings({ [key]: !notifications[key] });
  };

  const showAbout = () => {
    Alert.alert(
      'À propos',
      'Bible Chat - Votre compagnon spirituel\nVersion 1.0.0\n\nDéveloppé avec amour pour enrichir votre parcours spirituel.',
      [{ text: 'OK' }]
    );
  };

  const showHelp = () => {
    Alert.alert(
      'Aide',
      'Besoin d\'aide ?\n\n• Explorez les différentes sections\n• Utilisez le chat IA pour vos questions\n• Consultez votre journal spirituel\n• Rejoignez la communauté',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Paramètres',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
          },
          headerTintColor: colors.primary,
          headerBackTitle: 'Retour',
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Apparence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={isDarkMode ? <Moon /> : <Sun />}
              title="Mode sombre"
              subtitle={isDarkMode ? 'Activé' : 'Désactivé'}
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: colors.borderLight, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<Bell />}
              title="Notifications push"
              subtitle="Recevoir des rappels spirituels"
              rightElement={
                <Switch
                  value={notifications.push}
                  onValueChange={() => handleNotificationToggle('push')}
                  trackColor={{ false: colors.borderLight, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
            />
            <SettingItem
              icon={<Volume2 />}
              title="Sons"
              subtitle="Sons de notification"
              rightElement={
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: colors.borderLight, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
            />
            <SettingItem
              icon={<Smartphone />}
              title="Vibrations"
              subtitle="Vibrations pour les notifications"
              rightElement={
                <Switch
                  value={vibrationEnabled}
                  onValueChange={setVibrationEnabled}
                  trackColor={{ false: colors.borderLight, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
            />
          </View>
        </View>

        {/* Confidentialité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<Shield />}
              title="Données personnelles"
              subtitle="Gérer vos informations"
              onPress={() => {
                Alert.alert(
                  'Données personnelles',
                  'Vos données sont stockées localement sur votre appareil et ne sont pas partagées avec des tiers.',
                  [{ text: 'OK' }]
                );
              }}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<HelpCircle />}
              title="Aide"
              subtitle="Guide d'utilisation"
              onPress={showHelp}
            />
            <SettingItem
              icon={<Info />}
              title="À propos"
              subtitle="Informations sur l'application"
              onPress={showAbout}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Que votre parcours spirituel soit béni 🙏
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
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
  sectionContent: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    textAlign: 'center',
  },
});