import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { X, Volume2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface SpeechSettingsProps {
  visible: boolean;
  onClose: () => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
}

export default function SpeechSettings({
  visible,
  onClose,
  speechRate,
  onSpeechRateChange,
}: SpeechSettingsProps) {
  const rateOptions = [
    { value: 0.5, label: 'Très lent' },
    { value: 0.7, label: 'Lent' },
    { value: 0.9, label: 'Normal' },
    { value: 1.1, label: 'Rapide' },
    { value: 1.3, label: 'Très rapide' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Volume2 size={20} color={colors.primary} />
              <Text style={styles.title}>Paramètres de lecture</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Vitesse de lecture</Text>
            <View style={styles.rateOptions}>
              {rateOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.rateOption,
                    speechRate === option.value && styles.selectedRateOption,
                  ]}
                  onPress={() => onSpeechRateChange(option.value)}
                >
                  <Text
                    style={[
                      styles.rateOptionText,
                      speechRate === option.value && styles.selectedRateOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Cette application utilise le système de synthèse vocale gratuit de votre appareil.
                Aucune clé API n'est requise !
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.black + '80',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  rateOptions: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  rateOption: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.cardSecondary,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRateOption: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  rateOptionText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  selectedRateOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.md,
  },
});