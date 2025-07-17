import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Home, ArrowLeft, Menu, X } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function QuickNavigation() {
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const isMainTab = pathname === '/' || pathname === '/(tabs)' || 
                   pathname === '/(tabs)/bible' || pathname === '/(tabs)/chat' || 
                   pathname === '/(tabs)/more';

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    setIsMenuOpen(!isMenuOpen);
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const navigateToHome = () => {
    router.push('/(tabs)');
    setIsMenuOpen(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const goBack = () => {
    router.back();
  };

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const overlayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (isMainTab) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <Animated.View
          style={[
            styles.overlay,
            { opacity: overlayOpacity }
          ]}
          pointerEvents={isMenuOpen ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={styles.overlayTouch}
            onPress={toggleMenu}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Quick Menu */}
      <Animated.View
        style={[
          styles.quickMenu,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            top: insets.top,
            transform: [{ translateY: menuTranslateY }],
          }
        ]}
      >
        <View style={styles.menuContent}>
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: colors.primary + '20' }]}
            onPress={navigateToHome}
          >
            <Home color={colors.primary} size={20} />
            <Text style={[styles.menuButtonText, { color: colors.primary }]}>
              Accueil
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuButton}
            onPress={goBack}
          >
            <ArrowLeft color={colors.text} size={20} />
            <Text style={[styles.menuButtonText, { color: colors.text }]}>
              Retour
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Toggle Button */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            backgroundColor: colors.primary,
            top: insets.top + 10,
          }
        ]}
        onPress={toggleMenu}
      >
        {isMenuOpen ? (
          <X color="white" size={20} />
        ) : (
          <Menu color="white" size={20} />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 998,
  },
  overlayTouch: {
    flex: 1,
  },
  quickMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  menuContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  menuButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});