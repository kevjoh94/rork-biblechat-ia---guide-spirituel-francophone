import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSpiritualStore } from '@/store/spiritual-store';
import { lightColors, darkColors } from '@/constants/colors';

type ColorScheme = typeof lightColors;

interface ThemeContextType {
  colors: ColorScheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  
  // Use direct selectors to avoid recreation
  const isDarkMode = useSpiritualStore((state) => state.isDarkMode);
  const toggleDarkMode = useSpiritualStore((state) => state.toggleDarkMode);

  // Initialize theme based on system preference if not set
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const currentMode = useSpiritualStore.getState().isDarkMode;
        if (currentMode === undefined && systemColorScheme) {
          // Only set if not already configured by user
          if (systemColorScheme === 'dark') {
            toggleDarkMode();
          }
        }
      } catch (error) {
        console.warn('Error initializing theme:', error);
      }
    };
    initializeTheme();
  }, [systemColorScheme]);

  const colors = useMemo(() => {
    return isDarkMode ? darkColors : lightColors;
  }, [isDarkMode]);

  const value: ThemeContextType = useMemo(() => ({
    colors,
    isDarkMode,
    toggleTheme: toggleDarkMode,
  }), [colors, isDarkMode, toggleDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};