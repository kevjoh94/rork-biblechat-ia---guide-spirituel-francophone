import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SpiritualCalendar } from '@/components/SpiritualCalendar';
import { useTheme } from '@/components/ThemeProvider';

export default function CalendarScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
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
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
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