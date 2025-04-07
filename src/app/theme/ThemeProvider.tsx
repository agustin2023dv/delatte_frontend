/**
 * Proveedor de tema global para la app (modo claro/oscuro).
 * 
 * Permite alternar entre temas dinámicamente y expone el estado
 * mediante un contexto (`ThemeContext`) para toda la UI.
 * 
 * Internamente usa `@react-navigation/native` para aplicar los estilos
 * en componentes de navegación (headers, tabs, etc.).
 */

// src/app/theme/ThemeProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme, CustomTheme } from './theme'; // Importa los temas claros y oscuros


// 🔗 Estructura del contexto de tema
type ThemeContextType = {
  isDark: boolean; // Indica si el modo oscuro está activo
  theme: CustomTheme; // Tema actual (claro u oscuro)
  toggleTheme: () => void; // Función para alternar entre modos
};

// 📦 Contexto global de tema (modo claro/oscuro)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Componente que provee el tema global a toda la app.
 * Envuelve a `NavigationThemeProvider` para aplicar colores en la navegación.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false); // Estado inicial: modo claro (`lightTheme`)

  // Función para alternar entre modos claro y oscuro
  const toggleTheme = () => setIsDark((prev) => !prev);

  // Selecciona el tema basado en el estado `isDark`
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {/* Envuelve los componentes hijos con el tema seleccionado */}
   
        {children}
    
    </ThemeContext.Provider>
  );
};

/**
 * Hook para acceder al contexto de tema desde cualquier componente.
 * Devuelve: `isDark`, `theme`, `toggleTheme`.
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de un ThemeProvider');
  }
  return context;
};