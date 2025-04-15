/**
 * Proveedor de tema global para la app (modo claro/oscuro).
 *
 * Permite alternar entre temas dinámicamente y expone el estado
 * mediante un contexto (`ThemeContext`) para toda la UI.

 */

// src/app/theme/ThemeProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme, CustomTheme } from './theme';

// 🔗 Estructura del contexto de tema
type ThemeContextType = {
  isDark: boolean;
  theme: CustomTheme;
  toggleTheme: () => void;
};

// 📦 Contexto global
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de un ThemeProvider');
  }
  return context;
};
