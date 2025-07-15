import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { CommunityFeatures } from '@/components/CommunityFeatures';
import { colors } from '@/constants/colors';

export default function CommunityScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Communauté',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.container}>
        <CommunityFeatures />
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