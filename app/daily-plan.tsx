import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { DailyPlan } from '@/components/DailyPlan';
import { useTheme } from '@/components/ThemeProvider';

export default function DailyPlanScreen() {
  const { colors } = useTheme();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Plan Quotidien',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShown: false,
        }} 
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <DailyPlan />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});