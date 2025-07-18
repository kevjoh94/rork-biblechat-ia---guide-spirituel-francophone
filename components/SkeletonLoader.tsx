import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { animations, interpolations } from '@/utils/animations';

const { width: screenWidth } = Dimensions.get('window');

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const { colors } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = animations.shimmer(shimmerAnim);
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerWidth = typeof width === 'number' ? width : screenWidth * 0.8;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.borderLight,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            width: shimmerWidth,
            ...interpolations.shimmerTranslate(shimmerAnim, shimmerWidth),
          },
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            colors.white + '40',
            colors.white + '80',
            colors.white + '40',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { height }]}
        />
      </Animated.View>
    </View>
  );
};

// Composants de skeleton prédéfinis
export const SkeletonCard: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <SkeletonLoader width="100%" height={120} borderRadius={12} />
      <View style={styles.cardContent}>
        <SkeletonLoader width="80%" height={16} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="60%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="40%" height={12} />
      </View>
    </View>
  );
};

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <View>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          width={index === lines - 1 ? '70%' : '100%'}
          height={14}
          style={{ marginBottom: 8 }}
        />
      ))}
    </View>
  );
};

export const SkeletonAvatar: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <SkeletonLoader
      width={size}
      height={size}
      borderRadius={size / 2}
    />
  );
};

export const SkeletonButton: React.FC = () => {
  return (
    <SkeletonLoader
      width="100%"
      height={48}
      borderRadius={24}
    />
  );
};

export const SkeletonList: React.FC<{ items?: number }> = ({ items = 5 }) => {
  return (
    <View>
      {Array.from({ length: items }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          <SkeletonAvatar size={32} />
          <View style={styles.listContent}>
            <SkeletonLoader width="80%" height={16} style={{ marginBottom: 6 }} />
            <SkeletonLoader width="60%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
};

// Skeleton pour la page d'accueil
export const SkeletonHome: React.FC = () => {
  return (
    <View style={styles.homeContainer}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <SkeletonLoader width="60%" height={24} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="80%" height={16} />
      </View>

      {/* Daily verse skeleton */}
      <View style={styles.dailyVerse}>
        <SkeletonLoader width="100%" height={180} borderRadius={20} />
      </View>

      {/* Stats skeleton */}
      <View style={styles.stats}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.statItem}>
            <SkeletonLoader width={40} height={40} borderRadius={20} style={{ marginBottom: 8 }} />
            <SkeletonLoader width="80%" height={16} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="60%" height={12} />
          </View>
        ))}
      </View>

      {/* Actions grid skeleton */}
      <View style={styles.actionsGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.actionCard}>
            <SkeletonLoader width={40} height={40} borderRadius={20} style={{ marginBottom: 8 }} />
            <SkeletonLoader width="80%" height={14} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="60%" height={12} />
          </View>
        ))}
      </View>
    </View>
  );
};

// Skeleton pour le chat
export const SkeletonChat: React.FC = () => {
  return (
    <View style={styles.chatContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            index % 2 === 0 ? styles.userMessage : styles.aiMessage,
          ]}
        >
          {index % 2 !== 0 && <SkeletonAvatar size={32} />}
          <View style={styles.messageBubble}>
            <SkeletonText lines={Math.floor(Math.random() * 3) + 1} />
          </View>
          {index % 2 === 0 && <SkeletonAvatar size={32} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    marginTop: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  homeContainer: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dailyVerse: {
    marginBottom: spacing.xl,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  chatContainer: {
    padding: spacing.lg,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    flex: 1,
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    maxWidth: '80%',
  },
});