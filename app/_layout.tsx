import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/colors";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackButton } from "@/components/BackButton";

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
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="content/[id]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="bible/[bookId]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="bible/[bookId]/[chapter]" options={{ headerShown: false, presentation: "card" }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, presentation: "modal" }} />
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: true, 
            presentation: "card",
            title: "Paramètres",
            headerLeft: () => <BackButton />,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
          }} 
        />
        <Stack.Screen 
          name="notifications" 
          options={{ 
            headerShown: true, 
            presentation: "card",
            title: "Notifications",
            headerLeft: () => <BackButton />,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
          }} 
        />
        <Stack.Screen 
          name="daily-plan" 
          options={{ 
            headerShown: true, 
            presentation: "card",
            title: "Plan du jour",
            headerLeft: () => <BackButton />,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
          }} 
        />
        <Stack.Screen 
          name="calendar" 
          options={{ 
            headerShown: true, 
            presentation: "card",
            title: "Calendrier spirituel",
            headerLeft: () => <BackButton />,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
          }} 
        />
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