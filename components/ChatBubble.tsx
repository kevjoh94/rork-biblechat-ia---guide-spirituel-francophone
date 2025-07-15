import { LinearGradient } from "expo-linear-gradient";
import { Volume2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date | string;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  onSpeak,
  isSpeaking = false 
}) => {
  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Maintenant";
    }
    
    return dateObj.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      {isUser ? (
        <LinearGradient
          colors={[colors.primary, colors.secondary] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bubble, styles.userBubble]}
        >
          <Text style={styles.userMessage}>{message}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.bubble, styles.aiBubble]}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiMessage}>{message}</Text>
            {onSpeak && (
              <TouchableOpacity
                style={[styles.speakButton, isSpeaking && styles.speakButtonActive]}
                onPress={onSpeak}
              >
                <Volume2 size={16} color={isSpeaking ? colors.white : colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
        {formatTime(timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    maxWidth: "85%",
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
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  aiBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  aiHeader: {
    flexDirection: "column",
  },
  userMessage: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    color: colors.white,
  },
  aiMessage: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  speakButton: {
    alignSelf: "flex-end",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  speakButtonActive: {
    backgroundColor: colors.primary,
  },
  timestamp: {
    fontSize: typography.fontSizes.xs,
    marginHorizontal: spacing.sm,
  },
  userTimestamp: {
    color: colors.textLight,
  },
  aiTimestamp: {
    color: colors.textLight,
  },
});