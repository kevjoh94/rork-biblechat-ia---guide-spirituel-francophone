import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/colors";
import { ThemeProvider } from "@/components/ThemeProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="content/[id]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="bible/[bookId]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="bible/[bookId]/[chapter]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, presentation: "modal" }} />
        <Stack.Screen name="settings" options={{ headerShown: true, presentation: "card" }} />
        <Stack.Screen name="notifications" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="daily-plan" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="calendar" options={{ headerShown: false, presentation: "card" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}