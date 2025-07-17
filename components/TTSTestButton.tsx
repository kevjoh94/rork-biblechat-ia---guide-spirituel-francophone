import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { simpleTTS } from '@/utils/simple-tts';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface TTSTestButtonProps {
  text?: string;
  style?: any;
}

export default function TTSTestButton({ 
  text = "Ceci est un test de la synthèse vocale gratuite.", 
  style 
}: TTSTestButtonProps) {
  const [isTesting, setIsTesting] = useState(false);

  const testTTS = async () => {
    if (isTesting) return;

    setIsTesting(true);
    try {
      if (!simpleTTS.isAvailable()) {
        Alert.alert('Non disponible', 'La synthèse vocale n\'est pas disponible.');
        return;
      }

      await simpleTTS.speak({
        text,
        language: 'fr-FR',
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0
      });

      Alert.alert('Succès', 'Le test TTS a fonctionné !');
    } catch (error) {
      console.error('Test TTS error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      Alert.alert('Erreur TTS', `Test échoué: ${errorMessage}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isTesting && styles.buttonDisabled, style]}
      onPress={testTTS}
      disabled={isTesting}
    >
      <Volume2 size={16} color={isTesting ? colors.textLight : colors.white} />
      <Text style={[styles.buttonText, isTesting && styles.buttonTextDisabled]}>
        {isTesting ? 'Test en cours...' : 'Tester TTS'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.cardSecondary,
  },
  buttonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.white,
  },
  buttonTextDisabled: {
    color: colors.textLight,
  },
});