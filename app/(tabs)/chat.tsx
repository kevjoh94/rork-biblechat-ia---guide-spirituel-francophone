import { Send } from "lucide-react-native";
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
    
    return `${randomResponse.greeting}\n\n📖 "${randomResponse.verse}" (${randomResponse.reference})\n\n${randomResponse.explanation}\n\n${randomResponse.prayer}`;
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

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Assistant Spirituel</Text>
        <Text style={styles.subtitle}>Pose tes questions en toute confiance</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>L'assistant réfléchit...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Pose ta question spirituelle..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Send size={20} color={colors.white} />
        </TouchableOpacity>
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
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
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
  loadingContainer: {
    padding: spacing.md,
    alignItems: "center",
  },
  loadingText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    maxHeight: 100,
    fontSize: typography.fontSizes.md,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
});