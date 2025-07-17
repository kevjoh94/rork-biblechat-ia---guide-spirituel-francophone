import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Check, Volume2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { openaiTTS } from '@/utils/openai-tts';

export type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

interface VoiceOption {
  id: OpenAIVoice;
  name: string;
  description: string;
  gender: 'Masculin' | 'Féminin' | 'Neutre';
}

const voiceOptions: VoiceOption[] = [
  { id: 'alloy', name: 'Alloy', description: 'Voix équilibrée et claire', gender: 'Neutre' },
  { id: 'echo', name: 'Echo', description: 'Voix masculine profonde', gender: 'Masculin' },
  { id: 'fable', name: 'Fable', description: 'Voix féminine douce', gender: 'Féminin' },
  { id: 'onyx', name: 'Onyx', description: 'Voix masculine grave', gender: 'Masculin' },
  { id: 'nova', name: 'Nova', description: 'Voix féminine énergique', gender: 'Féminin' },
  { id: 'shimmer', name: 'Shimmer', description: 'Voix féminine chaleureuse', gender: 'Féminin' },
];

interface OpenAIVoiceSelectorProps {
  selectedVoice: OpenAIVoice;
  onVoiceChange: (voice: OpenAIVoice) => void;
  visible: boolean;
  onClose: () => void;
}

export default function OpenAIVoiceSelector({
  selectedVoice,
  onVoiceChange,
  visible,
  onClose,
}: OpenAIVoiceSelectorProps) {
  const [testingVoice, setTestingVoice] = useState<OpenAIVoice | null>(null);

  const testVoice = async (voice: OpenAIVoice) => {
    try {
      setTestingVoice(voice);
      await openaiTTS.speak('Bonjour, ceci est un test de la voix ' + voiceOptions.find(v => v.id === voice)?.name, {
        voice,
        model: 'tts-1',
        speed: 1.0
      });
    } catch (error) {
      console.error('Error testing voice:', error);
    } finally {
      setTestingVoice(null);
    }
  };

  const selectVoice = (voice: OpenAIVoice) => {
    onVoiceChange(voice);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choisir une voix</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Sélectionnez la voix OpenAI pour la lecture des textes bibliques
          </Text>

          {voiceOptions.map((voice) => (
            <TouchableOpacity
              key={voice.id}
              style={[
                styles.voiceOption,
                selectedVoice === voice.id && styles.selectedVoiceOption
              ]}
              onPress={() => selectVoice(voice.id)}
            >
              <View style={styles.voiceInfo}>
                <View style={styles.voiceHeader}>
                  <Text style={[
                    styles.voiceName,
                    selectedVoice === voice.id && styles.selectedText
                  ]}>
                    {voice.name}
                  </Text>
                  <Text style={[
                    styles.voiceGender,
                    selectedVoice === voice.id && styles.selectedText
                  ]}>
                    {voice.gender}
                  </Text>
                </View>
                <Text style={[
                  styles.voiceDescription,
                  selectedVoice === voice.id && styles.selectedText
                ]}>
                  {voice.description}
                </Text>
              </View>

              <View style={styles.voiceActions}>
                <TouchableOpacity
                  onPress={() => testVoice(voice.id)}
                  style={[
                    styles.testButton,
                    testingVoice === voice.id && styles.testingButton
                  ]}
                  disabled={testingVoice !== null}
                >
                  <Volume2 
                    size={16} 
                    color={testingVoice === voice.id ? colors.white : colors.primary} 
                  />
                </TouchableOpacity>

                {selectedVoice === voice.id && (
                  <View style={styles.checkIcon}>
                    <Check size={20} color={colors.white} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700' as const,
    color: colors.text,
  },
  closeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  closeButtonText: {
    fontSize: typography.fontSizes.md,
    color: colors.primary,
    fontWeight: '600' as const,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    marginVertical: spacing.lg,
    textAlign: 'center',
    lineHeight: typography.lineHeights.md,
  },
  voiceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedVoiceOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  voiceInfo: {
    flex: 1,
  },
  voiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  voiceName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.text,
  },
  voiceGender: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    fontWeight: '500' as const,
  },
  voiceDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
  },
  selectedText: {
    color: colors.primary,
  },
  voiceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  testButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testingButton: {
    backgroundColor: colors.primary,
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});