/**
 * Define los temas visuales de la aplicación: Light y Dark.
 *
 * Cada tema contiene:
 * - Colores globales para navegación y UI
 * - Tipografía base
 * - Espaciado consistente
 * - Tamaños de fuente reutilizables
 * - Bordes redondeados estándar
 */

// src/app/theme/theme.ts

// 🎯 Tipos válidos que React Native acepta como `fontWeight`
type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

// 🎨 Tema extendido para Delatte
export interface CustomTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  fontSizes: ThemeFontSizes;
  borderRadius: ThemeBorderRadius;
}

// 🖋️ Tipografía base del sistema
type ThemeFonts = {
  regular: { fontFamily: string; fontWeight: FontWeight };
  medium: { fontFamily: string; fontWeight: FontWeight };
  bold: { fontFamily: string; fontWeight: FontWeight };
  heavy: { fontFamily: string; fontWeight: FontWeight };
};

// 📏 Espaciado para padding/margin
type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

// 🔠 Tamaños de fuente
type ThemeFontSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

// 🟩 Bordes redondeados
type ThemeBorderRadius = {
  sm: number;
  md: number;
  lg: number;
};

// 🌞 Tema claro
export const lightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: '#D72638',
    background: '#FFFFFF',
    card: '#F9F9F9',
    text: '#222222',
    border: '#E5E5E5',
    notification: '#F78C6B',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

// 🌚 Tema oscuro
export const darkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: '#FF6768',
    background: '#121212',
    card: '#1E1E1E',
    text: '#EAEAEA',
    border: '#333333',
    notification: '#FFB88C',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};
