import { Tabs, useRouter } from "expo-router";
import { Home, MessageCircle, User, Book, MoreHorizontal, ArrowLeft } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/components/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const BackButton = () => (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        padding: 8,
        marginLeft: Platform.OS === 'ios' ? 4 : 8,
        marginTop: Platform.OS === 'ios' ? insets.top > 44 ? 4 : 2 : 0,
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ArrowLeft color={colors.primary} size={24} />
    </TouchableOpacity>
  );
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginTop: 6,
          color: colors.text,
        },
        tabBarShowLabel: true,
        tabBarItemStyle: {
          paddingVertical: 6,
          flex: 1,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.text,
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: "Bible",
          tabBarIcon: ({ color }) => <Book color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat IA",
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Plus",
          tabBarIcon: ({ color }) => <MoreHorizontal color={color} size={22} />,
        }}
      />
      
      {/* Hidden tabs - accessible via navigation but not shown in tab bar */}
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          headerShown: true,
          title: "Profil",
          headerLeft: () => <BackButton />,
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          href: null,
          headerShown: true,
          title: "Méditation",
          headerLeft: () => <BackButton />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          href: null,
          headerShown: true,
          title: "Journal Spirituel",
          headerLeft: () => <BackButton />,
        }}
      />
      <Tabs.Screen
        name="reading-plan"
        options={{
          href: null,
          headerShown: true,
          title: "Plan de Lecture",
          headerLeft: () => <BackButton />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          href: null,
          headerShown: true,
          title: "Insights",
          headerLeft: () => <BackButton />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          href: null,
          headerShown: true,
          title: "Communauté",
          headerLeft: () => <BackButton />,
        }}
      />
    </Tabs>
  );
}