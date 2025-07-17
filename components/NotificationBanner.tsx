import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface NotificationBannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
  autoHide?: boolean;
  duration?: number;
}

export default function NotificationBanner({
  type,
  title,
  message,
  visible,
  onClose,
  autoHide = true,
  duration = 4000
}: NotificationBannerProps) {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      if (autoHide) {
        const timer = setTimeout(() => {
          hideNotification();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={20} color={colors.white} />,
          backgroundColor: '#10B981',
          borderColor: '#059669',
        };
      case 'error':
        return {
          icon: <AlertCircle size={20} color={colors.white} />,
          backgroundColor: '#EF4444',
          borderColor: '#DC2626',
        };
      case 'warning':
        return {
          icon: <AlertCircle size={20} color={colors.white} />,
          backgroundColor: '#F59E0B',
          borderColor: '#D97706',
        };
      case 'info':
      default:
        return {
          icon: <Info size={20} color={colors.white} />,
          backgroundColor: colors.primary,
          borderColor: colors.secondary,
        };
    }
  };

  if (!visible) return null;

  const { icon, backgroundColor, borderColor } = getIconAndColors();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={hideNotification} style={styles.closeButton}>
          <X size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: spacing.md,
    right: spacing.md,
    zIndex: 1000,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    opacity: 0.9,
    lineHeight: typography.lineHeights.sm,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
});