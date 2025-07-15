import { Tabs } from "expo-router";
import { Home, MessageCircle, User, Book, Heart, BookOpen, Calendar, Sparkles, Users } from "lucide-react-native";
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
        name="meditation"
        options={{
          title: "Méditation",
          tabBarIcon: ({ color }) => <Heart color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="reading-plan"
        options={{
          title: "Plans",
          tabBarIcon: ({ color }) => <Calendar color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => <Sparkles color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Communauté",
          tabBarIcon: ({ color }) => <Users color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}