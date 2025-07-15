import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SpiritualCalendar } from '@/components/SpiritualCalendar';
import { useTheme } from '@/components/ThemeProvider';

export default function CalendarScreen() {
  const { colors } = useTheme();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Calendrier Spirituel',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
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