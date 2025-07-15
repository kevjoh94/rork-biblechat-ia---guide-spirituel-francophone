import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { EnhancedProfile } from "@/components/EnhancedProfile";
import { useTheme } from "@/components/ThemeProvider";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Mon Profil',
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
        <EnhancedProfile />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});