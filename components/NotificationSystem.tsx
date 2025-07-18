import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Bell, X, CheckCircle, AlertCircle, Info, Heart } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const { width } = Dimensions.get('window');

export interface NotificationData {
  id: string;
  type: 'success' | 'warning' | 'info' | 'spiritual';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface NotificationSystemProps {
  notifications: NotificationData[];
  onDismiss: (id: string) => void;
}

const NotificationItem: React.FC<{
  notification: NotificationData;
  onDismiss: (id: string) => void;
  index: number;
}> = ({ notification, onDismiss, index }) => {
  const { colors } = useTheme();
  const [slideAnim] = useState(new Animated.Value(width));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(notification.id);
    });
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} color={colors.success} />;
      case 'warning':
        return <AlertCircle size={20} color={colors.warning} />;
      case 'info':
        return <Info size={20} color={colors.info} />;
      case 'spiritual':
        return <Heart size={20} color={colors.primary} />;
      default:
        return <Bell size={20} color={colors.primary} />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return colors.success + '15';
      case 'warning':
        return colors.warning + '15';
      case 'info':
        return colors.info + '15';
      case 'spiritual':
        return colors.primary + '15';
      default:
        return colors.card;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return colors.success + '40';
      case 'warning':
        return colors.warning + '40';
      case 'info':
        return colors.info + '40';
      case 'spiritual':
        return colors.primary + '40';
      default:
        return colors.border;
    }
  };

  const styles = createStyles(colors);

  return (
    <Animated.View
      style={[
        styles.notificationContainer,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        
        {notification.action && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={notification.action.onPress}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>
              {notification.action.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.dismissButton}
        onPress={handleDismiss}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onDismiss,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (notifications.length === 0) return null;

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
          index={index}
        />
      ))}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: spacing.lg,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconContainer: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  message: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
  },
  actionButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  dismissButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
});

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = (notification: Omit<NotificationData, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: NotificationData = {
      ...notification,
      id,
      duration: notification.duration || 4000,
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    showNotification,
    dismissNotification,
    clearAll,
  };
};