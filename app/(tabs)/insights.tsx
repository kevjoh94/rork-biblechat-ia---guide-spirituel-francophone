import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SpiritualInsights } from '@/components/SpiritualInsights';
import { colors } from '@/constants/colors';

export default function InsightsScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Insights Spirituels',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <SpiritualInsights />
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