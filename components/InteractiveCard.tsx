import React, { useState } from 'react';
import { TouchableOpacity, Animated, Platform } from 'react-native';

interface InteractiveCardProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  activeOpacity?: number;
}

export function InteractiveCard({ 
  children, 
  onPress, 
  style, 
  activeOpacity = 0.8 
}: InteractiveCardProps) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (Platform.OS !== 'web') {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS !== 'web') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={activeOpacity}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}