import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { MeditationSession } from '@/components/MeditationSession';
import { useTheme } from '@/components/ThemeProvider';

export default function MeditationScreen() {
  const { colors } = useTheme();
  const router = useRouter();
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <MeditationSession onComplete={handleSessionComplete} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});