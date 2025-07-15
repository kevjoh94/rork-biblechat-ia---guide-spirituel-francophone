import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Settings, Volume2, X } from "lucide-react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface VoiceSettingsProps {
  visible: boolean;
  onClose: () => void;
  onSettingsChange: (settings: VoiceSettings) => void;
  currentSettings: VoiceSettings;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voiceType: 'male' | 'female' | 'auto';
}

export const VoiceSettingsModal: React.FC<VoiceSettingsProps> = ({
  visible,
  onClose,
  onSettingsChange,
  currentSettings
}) => {
  const [settings, setSettings] = useState<VoiceSettings>(currentSettings);

  const updateSetting = (key: keyof VoiceSettings, value: number | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const RateSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>Vitesse: {Math.round(value * 100)}%</Text>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderButtons}>
          <TouchableOpacity 
            style={styles.sliderButton}
            onPress={() => onChange(Math.max(0.5, value - 0.1))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sliderButton}
            onPress={() => onChange(Math.min(1.5, value + 0.1))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const PitchSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>Tonalité: {Math.round(value * 100)}%</Text>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderButtons}>
          <TouchableOpacity 
            style={styles.sliderButton}
            onPress={() => onChange(Math.max(0.5, value - 0.1))}
          >
            <Text style={styles.sliderButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sliderButton}
            onPress={() => onChange(Math.min(2.0, value + 0.1))}
          >
            <Text style={styles.sliderButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.headerIcon}>
              <Volume2 size={20} color={colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Paramètres vocaux</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsContainer}>
            <RateSlider 
              value={settings.rate} 
              onChange={(value) => updateSetting('rate', value)} 
            />
            
            <PitchSlider 
              value={settings.pitch} 
              onChange={(value) => updateSetting('pitch', value)} 
            />

            <View style={styles.voiceTypeContainer}>
              <Text style={styles.sectionTitle}>Type de voix préféré</Text>
              <View style={styles.voiceTypeButtons}>
                {[
                  { key: 'auto', label: 'Automatique' },
                  { key: 'female', label: 'Féminine' },
                  { key: 'male', label: 'Masculine' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.voiceTypeButton,
                      settings.voiceType === option.key && styles.voiceTypeButtonActive
                    ]}
                    onPress={() => updateSetting('voiceType', option.key)}
                  >
                    <Text style={[
                      styles.voiceTypeButtonText,
                      settings.voiceType === option.key && styles.voiceTypeButtonTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.presetContainer}>
              <Text style={styles.sectionTitle}>Préréglages</Text>
              <View style={styles.presetButtons}>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => {
                    const preset = { rate: 0.8, pitch: 1.1, volume: 0.9, voiceType: 'female' as const };
                    setSettings(preset);
                    onSettingsChange(preset);
                  }}
                >
                  <Text style={styles.presetButtonText}>Doux & Chaleureux</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => {
                    const preset = { rate: 0.75, pitch: 1.0, volume: 0.9, voiceType: 'auto' as const };
                    setSettings(preset);
                    onSettingsChange(preset);
                  }}
                >
                  <Text style={styles.presetButtonText}>Lecture Biblique</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => {
                    const preset = { rate: 0.9, pitch: 1.0, volume: 0.9, voiceType: 'auto' as const };
                    setSettings(preset);
                    onSettingsChange(preset);
                  }}
                >
                  <Text style={styles.presetButtonText}>Standard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: spacing.xl,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  modalTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsContainer: {
    padding: spacing.lg,
  },
  sliderContainer: {
    marginBottom: spacing.lg,
  },
  sliderLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: "500",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sliderTrack: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: spacing.sm,
  },
  sliderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderButtonText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.white,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  voiceTypeContainer: {
    marginBottom: spacing.lg,
  },
  voiceTypeButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  voiceTypeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.cardSecondary,
    alignItems: "center",
  },
  voiceTypeButtonActive: {
    backgroundColor: colors.primary,
  },
  voiceTypeButtonText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  voiceTypeButtonTextActive: {
    color: colors.white,
  },
  presetContainer: {
    marginTop: spacing.md,
  },
  presetButtons: {
    gap: spacing.sm,
  },
  presetButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.primary + "10",
    borderWidth: 1,
    borderColor: colors.primary + "30",
    alignItems: "center",
  },
  presetButtonText: {
    fontSize: typography.fontSizes.md,
    color: colors.primary,
    fontWeight: "500",
  },
});