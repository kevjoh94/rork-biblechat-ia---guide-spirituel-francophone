import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SpiritualJournal } from '@/components/SpiritualJournal';
import { colors } from '@/constants/colors';

export default function JournalScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Journal Spirituel',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <SpiritualJournal />
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