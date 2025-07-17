import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationManager from "@/components/NotificationManager";
import NotificationBanner from "@/components/NotificationBanner";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SwipeNavigation from "@/components/SwipeNavigation";
import QuickNavigation from "@/components/QuickNavigation";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({ visible: false, type: 'info', title: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationManager />
      <SwipeNavigation>
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
        <QuickNavigation />
      </SwipeNavigation>
      
      <NotificationBanner
        visible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
      
      <LoadingOverlay visible={loading} />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RootLayoutNav />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}