import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, 
  User, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Trophy, 
  Star, 
  Calendar,
  Moon,
  Sun,
  Bell,
  Edit3,
  Crown,
  Target,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';
import { AchievementBadge } from '@/components/AchievementBadge';

export const EnhancedProfile: React.FC = () => {
  const { colors } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userName, setUserName] = useState('Utilisateur Spirituel');
  const [userBio, setUserBio] = useState('Chercheur de vérité');
  
  // Use stable selectors to prevent unnecessary re-renders
  const selector = useCallback((state: any) => ({
    stats: state.stats,
    chatHistory: state.chatHistory,
    achievements: state.achievements,
    isDarkMode: state.isDarkMode,
    notifications: state.notifications,
    favorites: state.favorites,
    journalEntries: state.journalEntries,
    meditationSessions: state.meditationSessions,
    readingPlans: state.readingPlans,
    toggleDarkMode: state.toggleDarkMode,
    updateNotificationSettings: state.updateNotificationSettings,
    clearChatHistory: state.clearChatHistory
  }), []);
  
  const {
    stats,
    chatHistory,
    achievements,
    isDarkMode,
    notifications,
    favorites,
    journalEntries,
    meditationSessions,
    readingPlans,
    toggleDarkMode,
    updateNotificationSettings,
    clearChatHistory
  } = useSpiritualStore(selector);
  
  // Calculate derived values with useMemo to prevent recalculation
  const derivedValues = useMemo(() => {
    const chatHistoryLength = chatHistory.length;
    const favoritesCount = favorites.length;
    const journalEntriesCount = journalEntries.length;
    const meditationSessionsCount = meditationSessions.length;
    const readingPlansCount = readingPlans.length;
    
    // Calculate level based on experience
    const level = Math.floor(stats.experience / 100) + 1;
    const levelProgress = (stats.experience % 100) / 100;
    
    // Calculate total activity using stable values
    const totalActivity = stats.totalReadings + chatHistoryLength + journalEntriesCount + meditationSessionsCount;
    
    return {
      chatHistoryLength,
      favoritesCount,
      journalEntriesCount,
      meditationSessionsCount,
      readingPlansCount,
      level,
      levelProgress,
      totalActivity
    };
  }, [stats, chatHistory.length, favorites.length, journalEntries.length, meditationSessions.length, readingPlans.length]);
  
  const {
    chatHistoryLength,
    favoritesCount,
    journalEntriesCount,
    meditationSessionsCount,
    readingPlansCount,
    level,
    levelProgress,
    totalActivity
  } = derivedValues;
  
  // Create dynamic styles based on theme
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerCard: {
      margin: spacing.md,
      borderRadius: 16,
      padding: spacing.lg,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    userName: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.xs,
      color: colors.white,
    },
    userBio: {
      fontSize: typography.fontSizes.md,
      opacity: 0.9,
      marginBottom: spacing.xs,
      color: colors.white,
    },
    levelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    levelText: {
      fontSize: typography.fontSizes.sm,
      marginLeft: spacing.xs,
      fontWeight: '600',
      color: colors.white,
    },
    editButton: {
      padding: spacing.sm,
    },
    progressContainer: {
      marginTop: spacing.sm,
    },
    progressBar: {
      height: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 3,
      marginBottom: spacing.xs,
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.white,
      borderRadius: 3,
    },
    progressText: {
      fontSize: typography.fontSizes.sm,
      textAlign: 'center',
      color: colors.white,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
    statCard: {
      width: '48%',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: spacing.md,
      alignItems: 'center',
      marginBottom: spacing.sm,
      marginHorizontal: '1%',
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    statValue: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
      marginBottom: spacing.xs,
      color: colors.text,
    },
    statTitle: {
      fontSize: typography.fontSizes.sm,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    section: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.md,
      color: colors.text,
    },
    achievementsContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: spacing.md,
    },
    achievementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    achievementInfo: {
      marginLeft: spacing.sm,
      flex: 1,
    },
    achievementTitle: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.xs,
      color: colors.text,
    },
    achievementDescription: {
      fontSize: typography.fontSizes.sm,
      color: colors.textSecondary,
    },
    emptyText: {
      fontSize: typography.fontSizes.md,
      textAlign: 'center',
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
    activityCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: spacing.md,
    },
    activityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    activityText: {
      fontSize: typography.fontSizes.md,
      marginLeft: spacing.sm,
      color: colors.text,
    },
    settingsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: spacing.md,
      marginBottom: spacing.xl,
      padding: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: 12,
    },
    settingsButtonText: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginLeft: spacing.sm,
      color: colors.primary,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      color: colors.text,
    },
    closeButton: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      color: colors.primary,
    },
    modalContent: {
      flex: 1,
      padding: spacing.md,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingLabel: {
      fontSize: typography.fontSizes.md,
      marginLeft: spacing.sm,
      color: colors.text,
    },
    dangerButton: {
      backgroundColor: colors.error,
      padding: spacing.md,
      borderRadius: 8,
      marginTop: spacing.xl,
    },
    dangerButtonText: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      textAlign: 'center',
      color: colors.white,
    },
    inputGroup: {
      marginBottom: spacing.lg,
    },
    inputLabel: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.sm,
      color: colors.text,
    },
    textInput: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.text,
      borderRadius: 8,
      padding: spacing.md,
      fontSize: typography.fontSizes.md,
      borderWidth: 1,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: spacing.md,
      borderRadius: 8,
      marginTop: spacing.md,
    },
    saveButtonText: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.semibold,
      textAlign: 'center',
      color: colors.white,
    },
  }), [colors]);
  
  const handleClearData = () => {
    Alert.alert(
      'Effacer les données',
      'Êtes-vous sûr de vouloir effacer toutes vos données ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Effacer', 
          style: 'destructive',
          onPress: () => {
            clearChatHistory();
            Alert.alert('Succès', 'Données effacées avec succès');
          }
        }
      ]
    );
  };

  const renderStatCard = (title: string, value: number, icon: React.ComponentType<any>, color: string) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        {React.createElement(icon, { size: 20, color: colors.white })}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderAchievement = (achievementId: string) => (
    <View key={achievementId} style={styles.achievementItem}>
      <AchievementBadge achievementId={achievementId} isUnlocked={true} size="small" />
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>Réalisation débloquée</Text>
        <Text style={styles.achievementDescription}>Continuez vos efforts spirituels</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={40} color={colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userBio}>{userBio}</Text>
            <View style={styles.levelContainer}>
              <Crown size={16} color={colors.white} />
              <Text style={styles.levelText}>Niveau {level}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setShowEditProfile(true)}
          >
            <Edit3 size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Level Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${levelProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.floor(levelProgress * 100)}% vers le niveau {level + 1}
          </Text>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        {renderStatCard('Lectures', stats.totalReadings, BookOpen, colors.secondary)}
        {renderStatCard('Méditations', meditationSessionsCount, Target, colors.peace)}
        {renderStatCard('Journal', journalEntriesCount, Edit3, colors.gratitude)}
        {renderStatCard('Série', stats.currentStreak, Zap, colors.love)}
      </View>

      {/* Recent Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Réalisations récentes</Text>
        <View style={styles.achievementsContainer}>
          {achievements.slice(0, 3).map(renderAchievement)}
          {achievements.length === 0 && (
            <Text style={styles.emptyText}>
              Continuez à utiliser l'app pour débloquer des réalisations !
            </Text>
          )}
        </View>
      </View>

      {/* Activity Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Résumé d'activité</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityRow}>
            <Heart size={16} color={colors.love} />
            <Text style={styles.activityText}>
              {favoritesCount} contenus favoris
            </Text>
          </View>
          <View style={styles.activityRow}>
            <MessageCircle size={16} color={colors.primary} />
            <Text style={styles.activityText}>
              {chatHistoryLength} conversations spirituelles
            </Text>
          </View>
          <View style={styles.activityRow}>
            <Calendar size={16} color={colors.secondary} />
            <Text style={styles.activityText}>
              {readingPlansCount} plans de lecture actifs
            </Text>
          </View>
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => setShowSettings(true)}
      >
        <Settings size={20} color={colors.primary} />
        <Text style={styles.settingsButtonText}>Paramètres</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Paramètres</Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                {isDarkMode ? <Moon size={20} color={colors.text} /> : <Sun size={20} color={colors.text} />}
                <Text style={styles.settingLabel}>Mode sombre</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color={colors.text} />
                <Text style={styles.settingLabel}>Notifications quotidiennes</Text>
              </View>
              <Switch
                value={notifications.daily}
                onValueChange={(value) => updateNotificationSettings({ daily: value })}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
            
            <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
              <Text style={styles.dangerButtonText}>Effacer toutes les données</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Modifier le profil</Text>
            <TouchableOpacity onPress={() => setShowEditProfile(false)}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom</Text>
              <TextInput
                style={styles.textInput}
                value={userName}
                onChangeText={setUserName}
                placeholder="Votre nom"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={userBio}
                onChangeText={setUserBio}
                placeholder="Décrivez-vous en quelques mots"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                setShowEditProfile(false);
                Alert.alert('Succès', 'Profil mis à jour !');
              }}
            >
              <Text style={styles.saveButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

