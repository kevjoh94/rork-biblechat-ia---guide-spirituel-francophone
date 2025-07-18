import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MessageCircle, Send } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant spirituel IA. Comment puis-je vous aider dans votre parcours de foi aujourd\'hui ?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Merci pour votre question. Je suis là pour vous accompagner dans votre réflexion spirituelle.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      color: colors.text,
      marginLeft: spacing.sm,
    },
    messagesContainer: {
      flex: 1,
      padding: spacing.lg,
    },
    messageContainer: {
      marginBottom: spacing.md,
      padding: spacing.md,
      borderRadius: 16,
      maxWidth: '80%',
    },
    userMessage: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-end',
    },
    aiMessage: {
      backgroundColor: colors.card,
      alignSelf: 'flex-start',
    },
    messageText: {
      fontSize: typography.fontSizes.md,
      lineHeight: typography.lineHeights.md,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'flex-end',
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      fontSize: typography.fontSizes.md,
      color: colors.text,
      backgroundColor: colors.card,
      maxHeight: 100,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <MessageCircle size={24} color={colors.primary} />
        <Text style={styles.title}>Chat IA Spirituel</Text>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              { color: message.isUser ? colors.white : colors.text }
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Posez votre question spirituelle..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: colors.primary }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Send size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

