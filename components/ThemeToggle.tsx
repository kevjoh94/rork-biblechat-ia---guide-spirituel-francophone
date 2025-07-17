import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Sun, Palette } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface ThemeToggleProps {
  showLabel?: boolean;
  variant?: 'switch' | 'button' | 'card';
}

export default function ThemeToggle({ 
  showLabel = true, 
  variant = 'card' 
}: ThemeToggleProps) {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  if (variant === 'switch') {
    return (
      <View style={styles.switchContainer}>
        {showLabel && (
          <View style={styles.labelContainer}>
            <Sun size={20} color={isDarkMode ? colors.textSecondary : colors.primary} />
            <Text style={[styles.label, { color: colors.text }]}>Mode sombre</Text>
          </View>
        )}
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={isDarkMode ? colors.primary : colors.textSecondary}
          ios_backgroundColor={colors.border}
        />
      </View>
    );
  }

  if (variant === 'button') {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDarkMode ? [colors.primary, colors.secondary] : [colors.secondary, colors.primary]}
          style={styles.buttonGradient}
        >
          {isDarkMode ? (
            <Moon size={20} color="white" />
          ) : (
            <Sun size={20} color="white" />
          )}
        </LinearGradient>
        {showLabel && (
          <Text style={[styles.buttonLabel, { color: colors.text }]}>
            {isDarkMode ? 'Mode sombre' : 'Mode clair'}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  // Default card variant
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Palette size={24} color={colors.primary} />
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Thème</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
              {isDarkMode ? 'Mode sombre activé' : 'Mode clair activé'}
            </Text>
          </View>
        </View>
        
        <View style={styles.themePreview}>
          <View style={[styles.previewItem, { backgroundColor: isDarkMode ? colors.background : colors.card }]}>
            {isDarkMode ? (
              <Moon size={16} color={colors.primary} />
            ) : (
              <Sun size={16} color={colors.primary} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    marginLeft: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    marginLeft: spacing.sm,
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: typography.fontSizes.sm,
  },
  themePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});