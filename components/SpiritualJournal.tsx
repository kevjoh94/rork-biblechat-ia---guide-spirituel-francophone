import { LinearGradient } from "expo-linear-gradient";
import { BookOpen, Plus, Heart, Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Modal 
} from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  verse?: string;
  reference?: string;
  mood: 'grateful' | 'peaceful' | 'hopeful' | 'struggling' | 'joyful';
}

interface SpiritualJournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void;
}

export const SpiritualJournal: React.FC<SpiritualJournalProps> = ({
  entries,
  onAddEntry
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    verse: '',
    reference: '',
    mood: 'peaceful' as JournalEntry['mood']
  });

  const moodEmojis = {
    grateful: '🙏',
    peaceful: '☮️',
    hopeful: '🌅',
    struggling: '💪',
    joyful: '😊'
  };

  const moodColors = {
    grateful: colors.gratitude,
    peaceful: colors.peace,
    hopeful: colors.hope,
    struggling: colors.strength,
    joyful: colors.comfort
  };

  const handleAddEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      onAddEntry({
        ...newEntry,
        date: new Date()
      });
      setNewEntry({
        title: '',
        content: '',
        verse: '',
        reference: '',
        mood: 'peaceful'
      });
      setShowAddModal(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <BookOpen size={20} color={colors.primary} />
        </View>
        <Text style={styles.title}>Mon Journal Spirituel</Text>
        <TouchableOpacity 
          onPress={() => setShowAddModal(true)}
          style={styles.addButton}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesList} showsVerticalScrollIndicator={false}>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <LinearGradient
                colors={[colors.white, colors.cardSecondary]}
                style={styles.entryGradient}
              >
                <View style={styles.entryHeader}>
                  <View style={styles.entryMood}>
                    <Text style={styles.moodEmoji}>
                      {moodEmojis[entry.mood]}
                    </Text>
                    <View 
                      style={[
                        styles.moodIndicator, 
                        { backgroundColor: moodColors[entry.mood] }
                      ]} 
                    />
                  </View>
                  <View style={styles.entryDate}>
                    <Calendar size={14} color={colors.textLight} />
                    <Text style={styles.dateText}>
                      {formatDate(entry.date)}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryContent} numberOfLines={3}>
                  {entry.content}
                </Text>
                
                {entry.verse && (
                  <View style={styles.verseContainer}>
                    <Text style={styles.entryVerse}>"{entry.verse}"</Text>
                    {entry.reference && (
                      <Text style={styles.entryReference}>— {entry.reference}</Text>
                    )}
                  </View>
                )}
              </LinearGradient>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <BookOpen size={48} color={colors.textLight} />
            <Text style={styles.emptyTitle}>Votre journal vous attend</Text>
            <Text style={styles.emptySubtitle}>
              Commencez à noter vos réflexions spirituelles et moments de grâce
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvelle réflexion</Text>
              <TouchableOpacity 
                onPress={() => setShowAddModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Titre</Text>
                <TextInput
                  style={styles.textInput}
                  value={newEntry.title}
                  onChangeText={(text) => setNewEntry(prev => ({ ...prev, title: text }))}
                  placeholder="Ex: Moment de grâce aujourd'hui"
                  placeholderTextColor={colors.textLight}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Comment vous sentez-vous ?</Text>
                <View style={styles.moodSelector}>
                  {Object.entries(moodEmojis).map(([mood, emoji]) => (
                    <TouchableOpacity
                      key={mood}
                      style={[
                        styles.moodOption,
                        newEntry.mood === mood && styles.moodOptionActive,
                        { borderColor: moodColors[mood as JournalEntry['mood']] }
                      ]}
                      onPress={() => setNewEntry(prev => ({ 
                        ...prev, 
                        mood: mood as JournalEntry['mood'] 
                      }))}
                    >
                      <Text style={styles.moodOptionEmoji}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Vos réflexions</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={newEntry.content}
                  onChangeText={(text) => setNewEntry(prev => ({ ...prev, content: text }))}
                  placeholder="Partagez vos pensées, prières, ou moments de grâce..."
                  placeholderTextColor={colors.textLight}
                  multiline
                  numberOfLines={6}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Verset qui vous inspire (optionnel)</Text>
                <TextInput
                  style={styles.textInput}
                  value={newEntry.verse}
                  onChangeText={(text) => setNewEntry(prev => ({ ...prev, verse: text }))}
                  placeholder="Tapez ou collez un verset..."
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[styles.textInput, { marginTop: spacing.sm }]}
                  value={newEntry.reference}
                  onChangeText={(text) => setNewEntry(prev => ({ ...prev, reference: text }))}
                  placeholder="Référence (ex: Jean 3:16)"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                onPress={handleAddEntry}
                style={styles.saveButton}
              >
                <LinearGradient
                  colors={colors.primaryGradient}
                  style={styles.saveButtonGradient}
                >
                  <Heart size={18} color={colors.white} />
                  <Text style={styles.saveButtonText}>Sauvegarder</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  entriesList: {
    flex: 1,
    padding: spacing.md,
  },
  entryCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  entryGradient: {
    borderRadius: 16,
    padding: spacing.md,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  entryMood: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodEmoji: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  moodIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  entryDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textLight,
    marginLeft: spacing.xs,
  },
  entryTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  entryContent: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.md,
    marginBottom: spacing.sm,
  },
  verseContainer: {
    backgroundColor: colors.primary + "10",
    borderRadius: 8,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  entryVerse: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    fontStyle: "italic",
    marginBottom: spacing.xs,
  },
  entryReference: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textLight,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSecondary,
  },
  modalBody: {
    flex: 1,
    padding: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: "500",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  moodSelector: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  moodOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  moodOptionActive: {
    backgroundColor: colors.cardSecondary,
  },
  moodOptionEmoji: {
    fontSize: 20,
  },
  modalFooter: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    borderRadius: 12,
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600",
    color: colors.white,
    marginLeft: spacing.sm,
  },
});