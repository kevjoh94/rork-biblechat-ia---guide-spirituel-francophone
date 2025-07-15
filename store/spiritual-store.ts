import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { biblicalContent } from "@/mocks/biblical-content";
import { dailyVerses } from "@/mocks/daily-verses";
import { BiblicalContent, ChatMessage, UserProfile } from "@/types/spiritual";

interface SpiritualState {
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
  };
  toggleFavorite: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  setUserProfile: (profile: UserProfile) => void;
  getContentByCategory: (category: string) => BiblicalContent[];
  getFavorites: () => BiblicalContent[];
  getDailyVerse: () => typeof dailyVerses[0];
  markAsRead: (id: string) => void;
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
      },
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
          set({ dailyVerse: selectedVerse });
          return selectedVerse;
        }
        
        return dailyVerse;
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
          
          return {
            stats: {
              totalReadings: state.stats.totalReadings + 1,
              totalPrayers: state.stats.totalPrayers,
              currentStreak,
              longestStreak,
              lastReadDate: today,
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