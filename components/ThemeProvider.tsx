import React, { createContext, useContext, ReactNode } from 'react';
import { useSpiritualStore } from '@/store/spiritual-store';
import { colors as lightColors } from '@/constants/colors';

// Dark theme colors
const darkColors = {
  ...lightColors,
  primary: "#8B7EBE",
  background: "#1A1A1A",
  card: "#2D2D2D",
  cardSecondary: "#3A3A3A",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textLight: "#808080",
  border: "#404040",
  borderLight: "#505050",
  surface: "#2D2D2D",
  shadow: "#000000",
  overlay: "rgba(0, 0, 0, 0.7)",
};

interface ThemeContextType {
  colors: typeof lightColors;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isDarkMode = useSpiritualStore((state) => state.isDarkMode);
  const toggleDarkMode = useSpiritualStore((state) => state.toggleDarkMode);

  const colors = isDarkMode ? darkColors : lightColors;

  const value: ThemeContextType = {
    colors,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};