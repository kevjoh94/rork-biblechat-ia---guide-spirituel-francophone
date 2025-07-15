import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { CommunityFeatures } from '@/components/CommunityFeatures';
import { useTheme } from '@/components/ThemeProvider';

export default function CommunityScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Communauté',
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
        <CommunityFeatures />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});