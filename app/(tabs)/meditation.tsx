import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { MeditationSession } from '@/components/MeditationSession';
import { colors } from '@/constants/colors';

export default function MeditationScreen() {
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const handleSessionComplete = () => {
    setSessionCompleted(true);
    // Could show a completion modal or navigate somewhere
    setTimeout(() => setSessionCompleted(false), 2000);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Méditation',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <MeditationSession onComplete={handleSessionComplete} />
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