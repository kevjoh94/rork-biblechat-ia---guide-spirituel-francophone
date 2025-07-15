import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SpiritualCalendar } from '@/components/SpiritualCalendar';
import { useTheme } from '@/components/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback: navigate to home tab
      router.replace('/(tabs)/');
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Calendrier Spirituel',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={handleGoBack} 
              style={{ 
                marginLeft: Platform.OS === 'ios' ? -8 : 8,
                marginTop: Platform.OS === 'ios' ? 2 : 0,
                padding: 12,
                borderRadius: 24,
                backgroundColor: colors.card,
                shadowColor: colors.text,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <SpiritualCalendar />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});