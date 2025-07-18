import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';

export function BackButton() {
  const router = useRouter();
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        padding: 8,
        marginLeft: Platform.OS === 'ios' ? 4 : 8,
        borderRadius: 20,
        backgroundColor: colors.card + '80',
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ArrowLeft color={colors.primary} size={24} />
    </TouchableOpacity>
  );
}