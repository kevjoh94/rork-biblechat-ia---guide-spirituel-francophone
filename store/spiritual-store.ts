import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { biblicalContent } from "@/mocks/biblical-content";
import { dailyVerses } from "@/mocks/daily-verses";
import { BiblicalContent, ChatMessage, UserProfile, ReadingPlan, JournalEntry, MeditationSession, NotificationSettings } from "@/types/spiritual";

interface SpiritualState {
  // Existing state
  content: BiblicalContent[];
  favorites: string[];
  chatHistory: ChatMessage[];
  userProfile: UserProfile | null;
  dailyVerse: typeof dailyVerses[0] | null;
  stats: {
    totalReadings: number;
    totalPrayers: number;
    currentStreak: number;
    longestStreak: number;
    lastReadDate: string | null;
    totalMeditations: number;
    totalJournalEntries: number;
    level: number;
    experience: number;
  };
  
  // New state
  isDarkMode: boolean;
  readingPlans: ReadingPlan[];
  currentReadingPlan: ReadingPlan | null;
  journalEntries: JournalEntry[];
  meditationSessions: MeditationSession[];
  notifications: NotificationSettings;
  achievements: string[];
  
  // Existing actions
  toggleFavorite: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  setUserProfile: (profile: UserProfile) => void;
  getContentByCategory: (category: string) => BiblicalContent[];
  getFavorites: () => BiblicalContent[];
  getDailyVerse: () => typeof dailyVerses[0];
  initializeDailyVerse: () => void;
  markAsRead: (id: string) => void;
  
  // New actions
  toggleDarkMode: () => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  addMeditationSession: (session: Omit<MeditationSession, 'id' | 'completedAt'>) => void;
  createReadingPlan: (plan: Omit<ReadingPlan, 'id' | 'createdAt' | 'progress'>) => void;
  updateReadingPlanProgress: (planId: string, chapterId: string) => void;
  setCurrentReadingPlan: (planId: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  addAchievement: (achievementId: string) => void;
  addExperience: (points: number) => void;
}

export const useSpiritualStore = create<SpiritualState>()(
  persist(
    (set, get) => ({
      content: biblicalContent,
      favorites: biblicalContent.filter(c => c.isFavorite).map(c => c.id),
      chatHistory: [],
      userProfile: null,
      dailyVerse: null,
      stats: {
        totalReadings: 0,
        totalPrayers: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastReadDate: null,
        totalMeditations: 0,
        totalJournalEntries: 0,
        level: 1,
        experience: 0,
      },
      
      // New state initialization
      isDarkMode: false,
      readingPlans: [],
      currentReadingPlan: null,
      journalEntries: [],
      meditationSessions: [],
      notifications: {
        push: true,
        dailyVerse: true,
        readingReminder: true,
        prayerReminder: true,
        meditationReminder: false,
        time: '08:00',
      },
      achievements: [],
      toggleFavorite: (id: string) => {
        set((state) => {
          const updatedContent = state.content.map((item) => {
            if (item.id === id) {
              return { ...item, isFavorite: !item.isFavorite };
            }
            return item;
          });

          const updatedFavorites = updatedContent
            .filter((c) => c.isFavorite)
            .map((c) => c.id);

          return {
            content: updatedContent,
            favorites: updatedFavorites,
          };
        });
      },
      addChatMessage: (message: ChatMessage) => {
        set((state) => ({
          chatHistory: [...state.chatHistory, message],
        }));
      },
      clearChatHistory: () => {
        set({ chatHistory: [] });
      },
      setUserProfile: (profile: UserProfile) => {
        set({ userProfile: profile });
      },
      getContentByCategory: (category: string) => {
        return get().content.filter((c) => c.category === category);
      },
      getFavorites: () => {
        const { content, favorites } = get();
        return content.filter((c) => favorites.includes(c.id));
      },
      getDailyVerse: () => {
        const today = new Date().toDateString();
        const { dailyVerse } = get();
        
        if (!dailyVerse || dailyVerse.reference !== today) {
          const dayIndex = new Date().getDay();
          const selectedVerse = dailyVerses[dayIndex % dailyVerses.length];
          return selectedVerse;
        }
        
        return dailyVerse;
      },
      
      initializeDailyVerse: () => {
        const today = new Date().toDateString();
        const { dailyVerse } = get();
        
        if (!dailyVerse || dailyVerse.reference !== today) {
          const dayIndex = new Date().getDay();
          const selectedVerse = dailyVerses[dayIndex % dailyVerses.length];
          set({ dailyVerse: selectedVerse });
        }
      },
      markAsRead: (id: string) => {
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const { lastReadDate } = state.stats;
          
          let { currentStreak, longestStreak } = state.stats;
          
          if (!lastReadDate) {
            currentStreak = 1;
          } else {
            const lastDate = new Date(lastReadDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0]) {
              currentStreak += 1;
            } else if (lastDate.toISOString().split("T")[0] !== today) {
              currentStreak = 1;
            }
          }
          
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
          
          // Add experience points
          const newExperience = state.stats.experience + 10;
          const newLevel = Math.floor(newExperience / 100) + 1;
          
          return {
            stats: {
              ...state.stats,
              totalReadings: state.stats.totalReadings + 1,
              currentStreak,
              longestStreak,
              lastReadDate: today,
              experience: newExperience,
              level: newLevel,
            },
          };
        });
      },
      
      // New actions implementation
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },
      
      addJournalEntry: (entry) => {
        set((state) => {
          const newEntry: JournalEntry = {
            ...entry,
            id: Date.now().toString(),
            createdAt: new Date(),
          };
          
          return {
            journalEntries: [newEntry, ...state.journalEntries],
            stats: {
              ...state.stats,
              totalJournalEntries: state.stats.totalJournalEntries + 1,
              experience: state.stats.experience + 5,
            },
          };
        });
      },
      
      updateJournalEntry: (id, updates) => {
        set((state) => ({
          journalEntries: state.journalEntries.map(entry =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        }));
      },
      
      deleteJournalEntry: (id) => {
        set((state) => ({
          journalEntries: state.journalEntries.filter(entry => entry.id !== id),
        }));
      },
      
      addMeditationSession: (session) => {
        set((state) => {
          const newSession: MeditationSession = {
            ...session,
            id: Date.now().toString(),
            completedAt: new Date(),
          };
          
          return {
            meditationSessions: [newSession, ...state.meditationSessions],
            stats: {
              ...state.stats,
              totalMeditations: state.stats.totalMeditations + 1,
              experience: state.stats.experience + 15,
            },
          };
        });
      },
      
      createReadingPlan: (plan) => {
        set((state) => {
          const newPlan: ReadingPlan = {
            ...plan,
            id: Date.now().toString(),
            createdAt: new Date(),
            progress: [],
          };
          
          return {
            readingPlans: [...state.readingPlans, newPlan],
          };
        });
      },
      
      updateReadingPlanProgress: (planId, chapterId) => {
        set((state) => ({
          readingPlans: state.readingPlans.map(plan =>
            plan.id === planId
              ? {
                  ...plan,
                  progress: [...plan.progress, {
                    chapterId,
                    completedAt: new Date(),
                  }],
                }
              : plan
          ),
        }));
      },
      
      setCurrentReadingPlan: (planId) => {
        set((state) => ({
          currentReadingPlan: state.readingPlans.find(plan => plan.id === planId) || null,
        }));
      },
      
      updateNotificationSettings: (settings) => {
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        }));
      },
      
      addAchievement: (achievementId) => {
        set((state) => {
          if (!state.achievements.includes(achievementId)) {
            return {
              achievements: [...state.achievements, achievementId],
              stats: {
                ...state.stats,
                experience: state.stats.experience + 25,
              },
            };
          }
          return state;
        });
      },
      
      addExperience: (points) => {
        set((state) => {
          const newExperience = state.stats.experience + points;
          const newLevel = Math.floor(newExperience / 100) + 1;
          
          return {
            stats: {
              ...state.stats,
              experience: newExperience,
              level: newLevel,
            },
          };
        });
      },
    }),
    {
      name: "spiritual-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);