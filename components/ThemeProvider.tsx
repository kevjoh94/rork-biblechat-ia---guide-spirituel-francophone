import React, { createContext, useContext, ReactNode } from 'react';
import { useSpiritualStore } from '@/store/spiritual-store';
import { colors as lightColors } from '@/constants/colors';

// Dark theme colors - Élégant et moderne
const darkColors = {
  ...lightColors,
  // Couleurs principales adaptées au mode sombre
  primary: "#7B9BD2", // Bleu plus doux pour le sombre
  primaryLight: "#2A3441",
  secondary: "#A8956B", // Brun plus chaud
  accent: "#D4B96E", // Or plus lumineux
  
  // Arrière-plans sombres sophistiqués
  background: "#0F1419", // Noir bleuté très sombre
  card: "#1A1F26", // Gris bleuté sombre
  cardSecondary: "#242B34", // Gris plus clair
  surface: "#1E252D", // Surface intermédiaire
  
  // Textes optimisés pour le contraste
  text: "#F8F9FA", // Blanc cassé doux
  textSecondary: "#B8C2CC", // Gris clair
  textLight: "#8B95A1", // Gris moyen
  textMuted: "#5A6670", // Gris sombre
  
  // Bordures subtiles
  border: "#2A3441", // Bordure sombre
  borderLight: "#1E252D", // Bordure très sombre
  borderSubtle: "#242B34", // Bordure subtile
  
  // Couleurs spirituelles adaptées
  peace: "#5A8BC4", // Bleu plus sombre
  hope: "#C4956B", // Pêche plus sombre
  love: "#B8888A", // Rose plus sombre
  strength: "#7A6B98", // Violet plus sombre
  gratitude: "#6B9B5A", // Vert plus sombre
  comfort: "#D4B83F", // Jaune plus sombre
  prayer: "#8A74BA", // Lavande plus sombre
  wisdom: "#7A6B5B", // Brun plus sombre
  faith: "#7A9BC6", // Bleu foi plus sombre
  
  // Ombres et overlays
  shadow: "#000000",
  overlay: "rgba(15, 20, 25, 0.8)",
  
  // Gradients adaptés
  primaryGradient: ["#4A5D7A", "#5A8BC4"] as readonly [string, string],
  secondaryGradient: ["#7A6B5B", "#A8956B"] as readonly [string, string],
  peacefulGradient: ["#5A8BC4", "#7A9BC6"] as readonly [string, string],
  hopeGradient: ["#C4956B", "#D4A67B"] as readonly [string, string],
  cardGradient: ["#1A1F26", "#1E252D"] as readonly [string, string],
  sunriseGradient: ["#D4B96E", "#E4C97E"] as readonly [string, string],
  twilightGradient: ["#2A3441", "#4A5D7A"] as readonly [string, string],
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