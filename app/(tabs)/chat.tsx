import { LinearGradient } from "expo-linear-gradient";
import { Send, MessageCircle, Sparkles } from "lucide-react-native";
import React, { useState, useRef } from "react";
import { 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";

import { ChatBubble } from "@/components/ChatBubble";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { ChatMessage } from "@/types/spiritual";

const SYSTEM_PROMPT = `Tu es BibleChat IA, un assistant spirituel francophone, bienveillant et empathique.  
Ta mission est d'aider les utilisateurs à trouver des réponses à leurs questions personnelles ou spirituelles en s'appuyant sur la Bible (Segond 21 ou Louis Segond).

Quand un utilisateur pose une question, tu dois toujours répondre en suivant cette structure précise et complète :

1️⃣ Accroche amicale courte (ex : "Cher ami, sache que tu n'es jamais seul.")  
2️⃣ Un verset biblique pertinent, inspirant et apaisant (avec la référence exacte en Segond 21 ou Louis Segond).  
3️⃣ Une explication simple et accessible (2 à 4 phrases maximum), pas de théologie complexe.  
4️⃣ Une courte prière ou un encouragement final (1 à 2 phrases, optionnel mais conseillé).

**Règles importantes à respecter strictement** :
- Réponds toujours en **français**, dans un ton chaleureux, doux, inspirant et jamais autoritaire.
- Ne donne jamais de conseils médicaux ou psychologiques précis.
- Si la question n'est pas spirituelle ou pas en lien avec la Bible, explique poliment : "Je suis conçu pour répondre à des questions spirituelles ou bibliques. Peux-tu reformuler ta question ?"
- Tu es un guide, pas un juge. Ton but est de rassurer, apaiser et renforcer la foi.
- Chaque réponse doit donner l'impression de recevoir un message d'un ami bienveillant.

**Ta mission principale est d'apporter réconfort, lumière, guidance chrétienne et de partager des passages bibliques adaptés.**`;

export default function ChatScreen() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
  const chatHistory = useSpiritualStore((state) => state.chatHistory);
  const addChatMessage = useSpiritualStore((state) => state.addChatMessage);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    const currentInput = inputText.trim();
    setInputText("");
    setIsLoading(true);

    try {
      // Préparer les messages pour l'API
      const messages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...chatHistory.slice(-10).map(msg => ({
          role: msg.isUser ? "user" as const : "assistant" as const,
          content: msg.text
        })),
        { role: "user" as const, content: currentInput }
      ];

      const response = await fetch("https://toolkit.rork.com/text/llm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const data = await response.json();
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.completion || "Désolé, je n'ai pas pu traiter ta demande. Peux-tu réessayer ?",
        isUser: false,
        timestamp: new Date(),
      };

      addChatMessage(aiResponse);
    } catch (error) {
      console.error("Erreur API:", error);
      
      // Message d'erreur spirituel en cas de problème
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Cher ami, je rencontre une difficulté technique en ce moment. 🙏\n\nEn attendant, rappelle-toi cette promesse : \"Ne t'inquiète de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.\" (Philippiens 4:6)\n\nPeux-tu réessayer dans quelques instants ?",
        isUser: false,
        timestamp: new Date(),
      };

      addChatMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <ChatBubble
      message={item.text}
      isUser={item.isUser}
      timestamp={item.timestamp}
    />
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={[colors.primary + "15", colors.secondary + "15"]}
        style={styles.emptyIconContainer}
      >
        <MessageCircle size={32} color={colors.primary} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Bienvenue dans ton espace spirituel</Text>
      <Text style={styles.emptySubtitle}>
        Pose tes questions, partage tes préoccupations, et trouve la paix dans la Parole de Dieu
      </Text>
      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>Suggestions :</Text>
        <Text style={styles.suggestionText}>• "Comment trouver la paix intérieure ?"</Text>
        <Text style={styles.suggestionText}>• "Que dit la Bible sur le pardon ?"</Text>
        <Text style={styles.suggestionText}>• "Comment surmonter mes peurs ?"</Text>
        <Text style={styles.suggestionText}>• "Je me sens seul, aide-moi"</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={[colors.background, colors.cardSecondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Sparkles size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.title}>BibleChat IA</Text>
            <Text style={styles.subtitle}>Ton guide spirituel personnel</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={[
          styles.messagesContainer,
          chatHistory.length === 0 && styles.emptyMessagesContainer
        ]}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBubble}>
            <View style={styles.typingIndicator}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
            <Text style={styles.loadingText}>BibleChat IA réfléchit...</Text>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Pose ta question spirituelle..."
            placeholderTextColor={colors.textLight}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <LinearGradient
              colors={(!inputText.trim() || isLoading) ? [colors.border, colors.border] : [colors.primary, colors.secondary]}
              style={styles.sendButtonGradient}
            >
              <Send size={18} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.lg,
  },
  suggestionContainer: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    padding: spacing.md,
    width: "100%",
  },
  suggestionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  suggestionText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  loadingContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  loadingBubble: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    padding: spacing.md,
    alignSelf: "flex-start",
    maxWidth: "85%",
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.xs,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
    marginRight: 0,
  },
  loadingText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  inputContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.cardSecondary,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 36,
    height: 36,
  },
  sendButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});