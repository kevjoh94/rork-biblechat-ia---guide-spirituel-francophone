import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Chargement...',
  size = 'large',
  color,
}) => {
  const { colors } = useTheme();
  const spinnerColor = color || colors.primary;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    fontSize: typography.fontSizes.md,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});