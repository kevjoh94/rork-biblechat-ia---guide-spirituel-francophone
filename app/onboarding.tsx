import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/Button";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useSpiritualStore } from "@/store/spiritual-store";
import { UserProfile } from "@/types/spiritual";

const questions = [
  {
    id: 1,
    question: "Comment te sens-tu aujourd'hui ?",
    options: ["Reconfort", "Motivation", "Gratitude", "Guérison", "Paix"],
  },
  {
    id: 2,
    question: "Quelle est ta plus grande préoccupation du moment ?",
    options: ["La solitude", "Le pardon", "La peur", "Le manque de confiance", "Les relations"],
  },
  {
    id: 3,
    question: "Souhaites-tu recevoir un verset du jour chaque matin ?",
    options: ["Oui", "Non"],
  },
  {
    id: 4,
    question: "Préfères-tu un ton ?",
    options: ["Très doux et réconfortant", "Positif et motivant", "Neutre et simple"],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setUserProfile = useSpiritualStore((state) => state.setUserProfile);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete onboarding
      const profile: UserProfile = {
        mood: newAnswers[0],
        concern: newAnswers[1],
        dailyVerse: newAnswers[2] === "Oui",
        tone: newAnswers[3],
      };
      setUserProfile(profile);
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BibleChat IA</Text>
        <Text style={styles.subtitle}>Personnalisons ton expérience spirituelle</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} sur {questions.length}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Passer"
          onPress={handleSkip}
          variant="outline"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: spacing.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionText: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    flex: 1,
  },
  footer: {
    marginTop: spacing.lg,
  },
});