import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

export default function TabIndicator() {
  const { colors } = useTheme();
  const pathname = usePathname();

  const getCurrentTabIndex = () => {
    if (pathname === '/' || pathname === '/(tabs)') return 0;
    if (pathname.includes('/bible')) return 1;
    if (pathname.includes('/chat')) return 2;
    if (pathname.includes('/more')) return 3;
    return 0;
  };

  const tabNames = ['Accueil', 'Bible', 'Chat IA', 'Plus'];
  const currentIndex = getCurrentTabIndex();

  const isMainTab = pathname === '/' || pathname === '/(tabs)' || 
                   pathname === '/(tabs)/bible' || pathname === '/(tabs)/chat' || 
                   pathname === '/(tabs)/more';

  if (!isMainTab) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.indicatorContainer}>
        {tabNames.map((name, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? colors.primary : colors.border,
              }
            ]}
          />
        ))}
      </View>
      <Text style={[styles.tabName, { color: colors.text }]}>
        {tabNames[currentIndex]}
      </Text>
      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        Glissez pour naviguer
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  tabName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});