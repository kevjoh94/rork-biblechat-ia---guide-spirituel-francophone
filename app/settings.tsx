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
  colors: any;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
  colors,
}) => {
  const itemStyles = StyleSheet.create({
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
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
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
      backgroundColor: colors.primaryLight,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      marginBottom: 2,
      color: colors.text,
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
  });

  return (
    <TouchableOpacity
      style={itemStyles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={itemStyles.settingLeft}>
        <View style={itemStyles.iconContainer}>
          {React.cloneElement(icon as React.ReactElement, {
            size: 20,
            color: colors.primary,
          } as any)}
        </View>
        <View style={itemStyles.settingContent}>
          <Text style={itemStyles.settingTitle}>{title}</Text>
          {subtitle && <Text style={itemStyles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={itemStyles.settingRight}>
        {rightElement}
        {showChevron && onPress && (
          <ChevronRight size={16} color={colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
};

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Paramètres',
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

          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === 'ios' ? 8 : 16,
          },
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
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
              colors={colors}
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
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
              colors={colors}
            />
            <SettingItem
              icon={<Volume2 />}
              title="Sons"
              subtitle="Sons de notification"
              rightElement={
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
              colors={colors}
            />
            <SettingItem
              icon={<Smartphone />}
              title="Vibrations"
              subtitle="Vibrations pour les notifications"
              rightElement={
                <Switch
                  value={vibrationEnabled}
                  onValueChange={setVibrationEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
              showChevron={false}
              colors={colors}
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
              colors={colors}
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
              colors={colors}
            />
            <SettingItem
              icon={<Info />}
              title="À propos"
              subtitle="Informations sur l'application"
              onPress={showAbout}
              colors={colors}
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

