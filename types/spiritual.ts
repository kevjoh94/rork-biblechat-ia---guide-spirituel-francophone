export interface BiblicalContent {
  id: string;
  title: string;
  verse: string;
  reference: string;
  explanation: string;
  category: SpiritualCategory;
  isFavorite: boolean;
}

export type SpiritualCategory = 
  | "reconfort" 
  | "paix" 
  | "pardon" 
  | "esperance" 
  | "gratitude" 
  | "force" 
  | "amour";

export interface SpiritualCategoryInfo {
  id: SpiritualCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  mood: string;
  concern: string;
  dailyVerse: boolean;
  tone: string;
  preferences: {
    language: string;
    notifications: boolean;
    darkMode: boolean;
  };
  createdAt: Date;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  chapters: string[]; // chapter IDs
  createdAt: Date;
  progress: {
    chapterId: string;
    completedAt: Date;
  }[];
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: 'grateful' | 'peaceful' | 'hopeful' | 'struggling' | 'joyful';
  tags: string[];
  verse?: string;
  aiInsight?: string;
  createdAt: Date;
}

export interface MeditationSession {
  id: string;
  type: 'breathing' | 'scripture' | 'prayer' | 'gratitude';
  duration: number; // in minutes
  title: string;
  description?: string;
  completedAt: Date;
}

export interface NotificationSettings {
  dailyVerse: boolean;
  readingReminder: boolean;
  prayerReminder: boolean;
  meditationReminder: boolean;
  daily: boolean;
  time: string; // HH:MM format
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  category: 'reading' | 'prayer' | 'meditation' | 'journal' | 'streak';
}