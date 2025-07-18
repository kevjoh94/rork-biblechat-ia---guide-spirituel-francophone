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
    messageWrapper: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      alignItems: 'flex-end',
    },
    messageAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.sm,
    },
    messageContainer: {
      flex: 1,
      padding: spacing.md,
      borderRadius: 16,
      maxWidth: '75%',
      elevation: 1,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    userMessage: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    aiMessage: {
      backgroundColor: colors.card,
      borderBottomLeftRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    userWrapper: {
      justifyContent: 'flex-end',
    },
    aiWrapper: {
      justifyContent: 'flex-start',
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
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.sm,
    },
    loadingText: {
      marginLeft: spacing.sm,
      color: colors.textSecondary,
      fontSize: typography.fontSizes.sm,
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

