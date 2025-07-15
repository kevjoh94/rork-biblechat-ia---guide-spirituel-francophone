import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SpiritualCalendar } from '@/components/SpiritualCalendar';
import { useTheme } from '@/components/ThemeProvider';

export default function CalendarScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
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
                marginLeft: Platform.OS === 'ios' ? 0 : 16,
                padding: 8,
                borderRadius: 20,
              }}
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color={colors.text} />
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