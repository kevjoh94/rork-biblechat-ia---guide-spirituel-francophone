import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";

import { useTheme } from "@/components/ThemeProvider";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { animations } from "@/utils/animations";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    if (!disabled && !loading) {
      animations.spring(scaleAnim, 0.95).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      animations.spring(scaleAnim, 1).start();
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      animations.bounce(scaleAnim).start();
      onPress();
    }
  };
  
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.container,
          variant === "primary" && styles.primaryContainer,
          variant === "secondary" && styles.secondaryContainer,
          variant === "outline" && styles.outlineContainer,
          size === "small" && styles.smallContainer,
          size === "large" && styles.largeContainer,
          fullWidth && styles.fullWidth,
          disabled && styles.disabledContainer,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              variant === "primary" && styles.primaryText,
              variant === "secondary" && styles.secondaryText,
              variant === "outline" && styles.outlineText,
              size === "small" && styles.smallText,
              size === "large" && styles.largeText,
              disabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  outlineContainer: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  smallContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  largeContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  fullWidth: {
    width: "100%",
  },
  disabledContainer: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: typography.fontSizes.sm,
  },
  largeText: {
    fontSize: typography.fontSizes.lg,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});