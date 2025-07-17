import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useRouter, usePathname } from 'expo-router';

interface SwipeNavigationProps {
  children: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');

export default function SwipeNavigation({ children }: SwipeNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabRoutes = [
    '/(tabs)',
    '/(tabs)/bible',
    '/(tabs)/chat',
    '/(tabs)/more'
  ];

  const getCurrentTabIndex = () => {
    if (pathname === '/' || pathname === '/(tabs)') return 0;
    if (pathname.includes('/bible')) return 1;
    if (pathname.includes('/chat')) return 2;
    if (pathname.includes('/more')) return 3;
    return 0;
  };

  const onGestureEvent = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const currentIndex = getCurrentTabIndex();
      const threshold = screenWidth * 0.3;
      
      if (translationX > threshold && currentIndex > 0) {
        // Swipe right - go to previous tab
        switch (currentIndex) {
          case 1:
            router.push('/(tabs)');
            break;
          case 2:
            router.push('/(tabs)/bible');
            break;
          case 3:
            router.push('/(tabs)/chat');
            break;
        }
      } else if (translationX < -threshold && currentIndex < tabRoutes.length - 1) {
        // Swipe left - go to next tab
        switch (currentIndex) {
          case 0:
            router.push('/(tabs)/bible');
            break;
          case 1:
            router.push('/(tabs)/chat');
            break;
          case 2:
            router.push('/(tabs)/more');
            break;
        }
      }
    }
  };

  // Only enable swipe navigation on main tab screens
  const isMainTabScreen = tabRoutes.some(route => 
    pathname === route || pathname === route.replace('/(tabs)', '')
  );

  if (!isMainTabScreen || Platform.OS === 'web') {
    return <>{children}</>;
  }

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </PanGestureHandler>
  );
}