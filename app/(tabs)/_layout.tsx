import { Tabs } from "expo-router";
import { Home, MessageCircle, User, Book, MoreHorizontal } from "lucide-react-native";
import React from "react";

import { colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontWeight: "600",
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
      
      {/* Hidden tabs - accessible via navigation but not shown in tab bar */}
      <Tabs.Screen
        name="meditation"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reading-plan"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}