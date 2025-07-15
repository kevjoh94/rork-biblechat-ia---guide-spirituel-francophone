import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="content/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="bible/[bookId]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="bible/[bookId]/[chapter]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}