import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.message, isUser ? styles.userMessage : styles.aiMessage]}>
          {message}
        </Text>
      </View>
      <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
        {formatTime(timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  aiContainer: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  bubble: {
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  message: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
  },
  userMessage: {
    color: colors.white,
  },
  aiMessage: {
    color: colors.text,
  },
  timestamp: {
    fontSize: typography.fontSizes.xs,
  },
  userTimestamp: {
    color: colors.textSecondary,
  },
  aiTimestamp: {
    color: colors.textSecondary,
  },
});