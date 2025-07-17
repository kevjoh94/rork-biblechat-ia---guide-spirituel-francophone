import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  transparent?: boolean;
}

export default function LoadingOverlay({ 
  visible, 
  message = "Chargement...", 
  transparent = false 
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={[styles.overlay, transparent && styles.transparentOverlay]}>
        <View style={styles.container}>
          <LinearGradient
            colors={[colors.white, colors.cardSecondary]}
            style={styles.content}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.message}>{message}</Text>
          </LinearGradient>
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
  },
  transparentOverlay: {
    backgroundColor: colors.black + '40',
  },
  container: {
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  content: {
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
    fontWeight: '500',
  },
});