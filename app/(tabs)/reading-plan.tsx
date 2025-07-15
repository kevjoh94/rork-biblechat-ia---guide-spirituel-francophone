import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ReadingPlan } from '@/components/ReadingPlan';
import { colors } from '@/constants/colors';

export default function ReadingPlanScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Plans de Lecture',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <ReadingPlan />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});