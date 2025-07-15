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

export default function ChatScreen() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
  const chatHistory = useSpiritualStore((state) => state.chatHistory);
  const addChatMessage = useSpiritualStore((state) => state.addChatMessage);

  const generateSpiritualResponse = (question: string): string => {
    const responses = [
      {
        greeting: "Cher ami, sache que tu n'es jamais seul dans tes épreuves.",
        verse: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
        reference: "Josué 1:9",
        explanation: "Dieu nous encourage à être forts et courageux car Il est toujours avec nous. Sa présence nous donne la force d'affronter tous les défis de la vie.",
        prayer: "Que Dieu te bénisse et te donne la paix qui surpasse toute intelligence. 🙏"
      },
      {
        greeting: "Mon frère/ma sœur, ton cœur cherche la paix et Dieu l'entend.",
        verse: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
        reference: "Jean 14:27",
        explanation: "Jésus nous offre une paix différente de celle du monde. Cette paix divine peut calmer nos cœurs même dans les tempêtes de la vie.",
        prayer: "Puisse cette paix divine remplir ton cœur aujourd'hui. Amen."
      },
      {
        greeting: "Bien-aimé(e), Dieu connaît tes besoins avant même que tu les exprimes.",
        verse: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
        reference: "Jérémie 29:11",
        explanation: "Dieu a de bons projets pour notre vie. Même dans les moments difficiles, nous pouvons avoir confiance en Son plan parfait pour notre avenir.",
        prayer: "Garde espoir, car de belles choses t'attendent selon Sa volonté."
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return `${randomResponse.greeting}

📖 "${randomResponse.verse}" (${randomResponse.reference})

${randomResponse.explanation}

${randomResponse.prayer}`;
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateSpiritualResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };

      addChatMessage(aiResponse);
      setIsLoading(false);
    }, 1500);
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
            <Text style={styles.title}>Assistant Spirituel</Text>
            <Text style={styles.subtitle}>Pose tes questions en toute confiance</Text>
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
            <Text style={styles.loadingText}>L'assistant réfléchit...</Text>
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
              colors={(!inputText.trim() || isLoading) ? [colors.border, colors.border] : colors.primaryGradient}
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
    fontWeight: typography.fontWeights.bold as any,
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
    fontWeight: typography.fontWeights.semibold as any,
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
    fontWeight: typography.fontWeights.semibold as any,
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