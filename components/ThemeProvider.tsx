import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSpiritualStore } from '@/store/spiritual-store';
import { lightColors, darkColors } from '@/constants/colors';

interface ThemeContextType {
  colors: typeof lightColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const isDarkMode = useSpiritualStore((state) => state.isDarkMode);
  const toggleDarkMode = useSpiritualStore((state) => state.toggleDarkMode);

  // Auto-detect system theme on first load
  useEffect(() => {
    if (systemColorScheme === 'dark' && !isDarkMode) {
      toggleDarkMode();
    }
  }, [systemColorScheme]);

  const colors = isDarkMode ? darkColors : lightColors;

  const value: ThemeContextType = {
    colors,
    isDarkMode,
    toggleTheme: toggleDarkMode,
  };

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