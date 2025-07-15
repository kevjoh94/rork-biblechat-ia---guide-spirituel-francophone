import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SpiritualJournal } from '@/components/SpiritualJournal';
import { useTheme } from '@/components/ThemeProvider';

export default function JournalScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Journal Spirituel',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/(tabs)')} style={{ marginLeft: 16 }}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SpiritualJournal />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});