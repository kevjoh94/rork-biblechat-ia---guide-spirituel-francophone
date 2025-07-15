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
  mood: string;
  concern: string;
  dailyVerse: boolean;
  tone: string;
}