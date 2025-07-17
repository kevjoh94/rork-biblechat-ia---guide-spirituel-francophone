import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function ThemeToggle({ showLabel = true, size = 'medium' }: ThemeToggleProps) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  
  const getSizes = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, iconSize: 16 };
      case 'large':
        return { width: 56, height: 56, iconSize: 24 };
      default:
        return { width: 44, height: 44, iconSize: 20 };
    }
  };
  
  const sizes = getSizes();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.container}>
      <LinearGradient
        colors={isDarkMode ? ['#4A5568', '#2D3748'] : ['#EDF2F7', '#E2E8F0']}
        style={[
          styles.toggleContainer,
          {
            width: sizes.width,
            height: sizes.height,
            borderRadius: sizes.height / 2,
          }
        ]}
      >
        <View
          style={[
            styles.toggleButton,
            {
              width: sizes.height - 4,
              height: sizes.height - 4,
              borderRadius: (sizes.height - 4) / 2,
              transform: [{ translateX: isDarkMode ? sizes.width - sizes.height : 0 }],
              backgroundColor: colors.white,
            }
          ]}
        >
          {isDarkMode ? (
            <Moon size={sizes.iconSize} color={colors.primary} />
          ) : (
            <Sun size={sizes.iconSize} color={colors.accent} />
          )}
        </View>
      </LinearGradient>
      
      {showLabel && (
        <Text style={[styles.label, { color: colors.text }]}>
          {isDarkMode ? 'Mode sombre' : 'Mode clair'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  toggleContainer: {
    justifyContent: 'center',
    padding: 2,
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});