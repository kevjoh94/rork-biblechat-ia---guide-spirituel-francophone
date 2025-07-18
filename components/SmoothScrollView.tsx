import React, { useRef, useEffect } from 'react';
import { ScrollView, Platform, Animated } from 'react-native';

interface SmoothScrollViewProps {
  children: React.ReactNode;
  style?: any;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  refreshControl?: React.ReactElement;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
}

export function SmoothScrollView({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  refreshControl,
  onScroll,
  scrollEventThrottle = 16,
  ...props
}: SmoothScrollViewProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [fadeAnim] = React.useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const scrollViewProps = Platform.select({
    ios: {
      bounces: true,
      alwaysBounceVertical: true,
      decelerationRate: 'normal' as const,
    },
    android: {
      overScrollMode: 'auto' as const,
      nestedScrollEnabled: true,
    },
    web: {
      scrollEnabled: true,
    },
    default: {},
  });

  return (
    <Animated.View style={[{ flex: 1, opacity: fadeAnim }]}>
      <ScrollView
        ref={scrollViewRef}
        style={style}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        refreshControl={refreshControl}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
        {...props}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
}