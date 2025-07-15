import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Heart, 
  Smile, 
  Frown, 
  Meh,
  Sun,
  Star,
  BookOpen,
  Sparkles
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';
import { JournalEntry } from '@/types/spiritual';

const moodIcons = {
  grateful: { icon: Heart, color: '#10B981', label: 'Reconnaissant' },
  peaceful: { icon: Sun, color: '#3B82F6', label: 'Paisible' },
  hopeful: { icon: Star, color: '#F59E0B', label: 'Plein d\'espoir' },
  struggling: { icon: Frown, color: '#EF4444', label: 'En difficulté' },
  joyful: { icon: Smile, color: '#EC4899', label: 'Joyeux' },
};

export const SpiritualJournal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodIcons | undefined>();
  const [verse, setVerse] = useState('');
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const journalEntries = useSpiritualStore((state) => state.journalEntries);
  const addJournalEntry = useSpiritualStore((state) => state.addJournalEntry);
  const updateJournalEntry = useSpiritualStore((state) => state.updateJournalEntry);
  const deleteJournalEntry = useSpiritualStore((state) => state.deleteJournalEntry);

  const openModal = (entry?: JournalEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setTitle(entry.title);
      setContent(entry.content);
      setSelectedMood(entry.mood);
      setVerse(entry.verse || '');
    } else {
      setEditingEntry(null);
      setTitle('');
      setContent('');
      setSelectedMood(undefined);
      setVerse('');
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingEntry(null);
    setTitle('');
    setContent('');
    setSelectedMood(undefined);
    setVerse('');
  };

  const generateAIInsight = async (entryContent: string) => {
    if (!entryContent.trim()) return '';

    setIsGeneratingInsight(true);
    try {
      const messages = [
        {
          role: 'system' as const,
          content: `Tu es un conseiller spirituel bienveillant. Analyse cette entrée de journal spirituel et fournis un insight court et encourageant (2-3 phrases max) basé sur la sagesse biblique. Sois empathique et inspirant.`
        },
        {
          role: 'user' as const,
          content: `Voici mon entrée de journal spirituel: "${entryContent}". Peux-tu me donner un insight spirituel encourageant ?`
        }
      ];

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }

      const data = await response.json();
      return data.completion || '';
    } catch (error) {
      console.error('Erreur génération insight:', error);
      return '';
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const saveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et le contenu.');
      return;
    }

    const aiInsight = await generateAIInsight(content);

    const entryData = {
      title: title.trim(),
      content: content.trim(),
      mood: selectedMood,
      tags: [], // Could be enhanced with tag extraction
      verse: verse.trim() || undefined,
      aiInsight: aiInsight || undefined,
    };

    if (editingEntry) {
      updateJournalEntry(editingEntry.id, entryData);
    } else {
      addJournalEntry(entryData);
    }

    closeModal();
  };

  const confirmDelete = (entryId: string) => {
    Alert.alert(
      'Supprimer l\'entrée',
      'Êtes-vous sûr de vouloir supprimer cette entrée de journal ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => deleteJournalEntry(entryId)
        },
      ]
    );
  };

  const JournalEntryCard = ({ entry }: { entry: JournalEntry }) => {
    const moodData = entry.mood ? moodIcons[entry.mood] : null;
    const MoodIcon = moodData?.icon;

    return (
      <View style={styles.entryCard}>
        <LinearGradient
          colors={[colors.white, colors.cardSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.entryGradient}
        >
          <View style={styles.entryHeader}>
            <View style={styles.entryTitleContainer}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDate}>
                {entry.createdAt.toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <View style={styles.entryActions}>
              {moodData && MoodIcon && (
                <View style={[styles.moodIndicator, { backgroundColor: moodData.color + '15' }]}>
                  <MoodIcon size={16} color={moodData.color} />
                </View>
              )}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openModal(entry)}
              >
                <Edit3 size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => confirmDelete(entry.id)}
              >
                <Trash2 size={16} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.entryContent} numberOfLines={3}>
            {entry.content}
          </Text>

          {entry.verse && (
            <View style={styles.verseContainer}>
              <BookOpen size={14} color={colors.primary} />
              <Text style={styles.verseText}>{entry.verse}</Text>
            </View>
          )}

          {entry.aiInsight && (
            <View style={styles.insightContainer}>
              <Sparkles size={14} color={colors.secondary} />
              <Text style={styles.insightText}>{entry.aiInsight}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal Spirituel</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModal()}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesList} showsVerticalScrollIndicator={false}>
        {journalEntries.length > 0 ? (
          journalEntries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <BookOpen size={48} color={colors.textLight} />
            <Text style={styles.emptyTitle}>Commence ton journal spirituel</Text>
            <Text style={styles.emptySubtitle}>
              Écris tes pensées, prières et réflexions quotidiennes
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelButton}>Annuler</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingEntry ? 'Modifier l\'entrée' : 'Nouvelle entrée'}
            </Text>
            <TouchableOpacity onPress={saveEntry} disabled={isGeneratingInsight}>
              <Text style={[styles.saveButton, isGeneratingInsight && styles.saveButtonDisabled]}>
                {isGeneratingInsight ? 'Génération...' : 'Sauvegarder'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titre</Text>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Titre de votre entrée..."
                placeholderTextColor={colors.textLight}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Comment vous sentez-vous ?</Text>
              <View style={styles.moodSelector}>
                {Object.entries(moodIcons).map(([mood, data]) => {
                  const Icon = data.icon;
                  const isSelected = selectedMood === mood;
                  return (
                    <TouchableOpacity
                      key={mood}
                      style={[
                        styles.moodOption,
                        isSelected && { backgroundColor: data.color + '15' }
                      ]}
                      onPress={() => setSelectedMood(mood as keyof typeof moodIcons)}
                    >
                      <Icon 
                        size={20} 
                        color={isSelected ? data.color : colors.textLight} 
                      />
                      <Text style={[
                        styles.moodLabel,
                        isSelected && { color: data.color }
                      ]}>
                        {data.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Verset (optionnel)</Text>
              <TextInput
                style={styles.verseInput}
                value={verse}
                onChangeText={setVerse}
                placeholder="Un verset qui vous inspire..."
                placeholderTextColor={colors.textLight}
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Vos pensées</Text>
              <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Partagez vos réflexions, prières, gratitudes..."
                placeholderTextColor={colors.textLight}
                multiline
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    borderRadius: 20,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  entryTitleContainer: {
    flex: 1,
  },
  entryTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  entryDate: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  entryContent: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.sm,
    marginBottom: spacing.sm,
  },
  verseContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primary + '10',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  verseText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontStyle: 'italic',
    marginLeft: spacing.sm,
    flex: 1,
  },
  insightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.secondary + '10',
    borderRadius: 8,
    padding: spacing.sm,
  },
  insightText: {
    fontSize: typography.fontSizes.sm,
    color: colors.secondary,
    marginLeft: spacing.sm,
    flex: 1,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cancelButton: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
  },
  saveButton: {
    fontSize: typography.fontSizes.md,
    color: colors.primary,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    padding: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  titleInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  moodLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  verseInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 60,
  },
  contentInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 120,
  },
});