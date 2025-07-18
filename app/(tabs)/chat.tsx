import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { MessageCircle, Send, Bot, User } from 'lucide-react-native';
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
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant spirituel IA. Comment puis-je vous aider dans votre parcours de foi aujourd\'hui ? 🙏\n\nJe peux vous aider avec :\n• Questions bibliques\n• Conseils spirituels\n• Prières personnalisées\n• Réflexions sur la foi',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputText.trim();
      setInputText('');
      setIsLoading(true);
      
      try {
        // Call the AI API
        const response = await fetch('https://toolkit.rork.com/text/llm/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'Tu es un assistant spirituel chrétien bienveillant et sage. Réponds avec compassion, sagesse biblique et encouragement. Utilise des références bibliques quand c\'est approprié. Reste respectueux et encourageant.'
              },
              {
                role: 'user',
                content: currentInput
              }
            ]
          })
        });
        
        const data = await response.json();
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.completion || 'Je suis désolé, je n\'ai pas pu traiter votre demande. Pouvez-vous reformuler votre question ?',
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        console.error('Erreur API:', error);
        const errorResponse: Message = {
          id: (Date.now() + 2).toString(),
          text: 'Je rencontre des difficultés techniques. Pouvez-vous réessayer dans un moment ? En attendant, je vous encourage à méditer sur Philippiens 4:13 : "Je puis tout par celui qui me fortifie." 🙏',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      backgroundColor: colors.card,
    },
    title: {
      ...typography.h3,
      color: colors.text,
      marginLeft: spacing.md,
    },
    messagesContainer: {
      flex: 1,
      padding: spacing.screen,
    },
    messageWrapper: {
      flexDirection: 'row',
      marginBottom: spacing.xl,
      alignItems: 'flex-end',
    },
    messageAvatar: {
      width: 36,
      height: 36,
      borderRadius: spacing.radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    messageContainer: {
      flex: 1,
      padding: spacing.lg,
      borderRadius: spacing.radius.lg,
      maxWidth: '80%',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
    userMessage: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: spacing.radius.xs,
    },
    aiMessage: {
      backgroundColor: colors.card,
      borderBottomLeftRadius: spacing.radius.xs,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    userWrapper: {
      justifyContent: 'flex-end',
    },
    aiWrapper: {
      justifyContent: 'flex-start',
    },
    messageText: {
      ...typography.body,
      lineHeight: typography.lineHeights.lg,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: spacing.xl,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      alignItems: 'flex-end',
      backgroundColor: colors.card,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: spacing.radius.xl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      ...typography.body,
      color: colors.text,
      backgroundColor: colors.background,
      maxHeight: 120,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: spacing.radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.md,
    },
    loadingText: {
      marginLeft: spacing.md,
      color: colors.textLight,
      ...typography.caption,
      fontStyle: 'italic',
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

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser ? styles.userWrapper : styles.aiWrapper
            ]}
          >
            {!message.isUser && (
              <View style={[styles.messageAvatar, { backgroundColor: colors.primary + '20' }]}>
                <Bot size={16} color={colors.primary} />
              </View>
            )}
            <View
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
            {message.isUser && (
              <View style={[styles.messageAvatar, { backgroundColor: colors.primary, marginLeft: spacing.sm, marginRight: 0 }]}>
                <User size={16} color={colors.white} />
              </View>
            )}
          </View>
        ))}
        
        {isLoading && (
          <View style={[styles.messageWrapper, styles.aiWrapper]}>
            <View style={[styles.messageAvatar, { backgroundColor: colors.primary + '20' }]}>
              <Bot size={16} color={colors.primary} />
            </View>
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.loadingText}>L'assistant réfléchit...</Text>
              </View>
            </View>
          </View>
        )}
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
          style={[
            styles.sendButton, 
            { 
              backgroundColor: (!inputText.trim() || isLoading) ? colors.textSecondary : colors.primary,
              opacity: (!inputText.trim() || isLoading) ? 0.5 : 1
            }
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Send size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

