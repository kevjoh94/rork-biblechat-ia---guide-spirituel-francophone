import React, { createContext, useContext } from 'react';
import { colors } from '@/constants/colors';

interface ThemeContextType {
  colors: typeof colors;
}

const ThemeContext = createContext<ThemeContextType>({
  colors,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
}