import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, MessageCircle, BookOpen, Heart, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action: string) => {
    setIsExpanded(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    switch (action) {
      case 'chat':
        router.push('/(tabs)/chat');
        break;
      case 'bible':
        router.push('/(tabs)/bible');
        break;
      case 'favorites':
        // Navigate to favorites
        break;
      case 'search':
        // Open search modal
        break;
    }
  };

  const actionButtons = [
    { id: 'chat', icon: MessageCircle, label: 'Chat IA', color: colors.primary },
    { id: 'bible', icon: BookOpen, label: 'Bible', color: colors.secondary },
    { id: 'favorites', icon: Heart, label: 'Favoris', color: colors.gratitude },
    { id: 'search', icon: Search, label: 'Recherche', color: colors.accent },
  ];

  return (
    <View style={styles.container}>
      {/* Action Buttons */}
      {actionButtons.map((button, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(60 * (index + 1))],
        });

        const opacity = animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0, 1],
        });

        const scale = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        });

        return (
          <Animated.View
            key={button.id}
            style={[
              styles.actionButton,
              {
                transform: [{ translateY }, { scale }],
                opacity,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleAction(button.id)}
              style={styles.actionButtonTouchable}
            >
              <View style={[styles.actionButtonContent, { backgroundColor: button.color }]}>
                <button.icon size={20} color={colors.white} />
              </View>
              <Text style={styles.actionButtonLabel}>{button.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Main FAB */}
      <TouchableOpacity onPress={toggleExpanded} style={styles.mainButton}>
        <LinearGradient
          colors={colors.primaryGradient}
          style={styles.mainButtonGradient}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            }}
          >
            <Plus size={24} color={colors.white} />
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Backdrop */}
      {isExpanded && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={toggleExpanded}
          activeOpacity={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: spacing.lg,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'transparent',
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  actionButtonTouchable: {
    alignItems: 'center',
  },
  actionButtonContent: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.xs,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});