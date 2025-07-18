import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, User, Star, Sun, Moon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface HomeHeaderProps {
  backgroundImage: string;
  gradient: readonly [string, string];
  greeting: string;
}

export function HomeHeader({ backgroundImage, gradient, greeting }: HomeHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      paddingTop: insets.top + spacing.md,
      paddingBottom: spacing.section,
      position: 'relative',
      overflow: 'hidden',
      minHeight: 200,
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    headerContent: {
      paddingHorizontal: spacing.screen,
      position: 'relative',
      zIndex: 1,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    leftActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card + '80',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
    },
    titleSection: {
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    decorativeElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: spacing.screen,
    },
    decorativeIcon: {
      opacity: 0.1,
    },
    greeting: {
      ...typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
      letterSpacing: 0.2,
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    title: {
      ...typography.display,
      color: colors.text,
      marginBottom: spacing.sm,
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '700',
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      ...typography.body,
      color: colors.textLight,
      textAlign: 'center',
      fontStyle: 'italic',
      letterSpacing: 0.3,
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });

  return (
    <View style={styles.header}>
      <LinearGradient
        colors={gradient}
        style={styles.headerBackground}
      />
      
      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <Star size={20} color={colors.accent} style={[styles.decorativeIcon, { transform: [{ rotate: '15deg' }] }]} />
        <Sun size={24} color={colors.hope} style={[styles.decorativeIcon, { transform: [{ rotate: '-10deg' }] }]} />
        <Moon size={18} color={colors.peace} style={[styles.decorativeIcon, { transform: [{ rotate: '20deg' }] }]} />
      </View>
      
      <View style={styles.headerContent}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <View style={styles.leftActions}>
            {/* Empty for balance */}
          </View>
          
          <View style={styles.rightActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/notifications')}
            >
              <Bell size={20} color={colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <User size={20} color={colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/settings')}
            >
              <Settings size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.title}>BibleChat IA</Text>
          <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
        </View>
      </View>
    </View>
  );
}