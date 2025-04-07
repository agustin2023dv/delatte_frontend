/**
 * Componente de botón reutilizable para acciones primarias.
 *
 * ✅ Estilizado dinámicamente según el tema actual (`lightTheme` o `darkTheme`)
 * usando el `ThemeProvider` de React Navigation.
 *
 * 📌 Props:
 * - `title`: texto visible del botón
 * - `onPress`: función callback al presionar el botón
 * - `variant`: tipo de botón (por ahora solo `'primary'`, pero es escalable)
 *
 * 🎨 Hereda:
 * - Colores (`colors.primary`, `colors.text`)
 * - Tipografía (`fonts.medium`)
 * - Tamaños (`fontSizes.md`, `spacing`, `borderRadius`)
 *
 * 💡 Ejemplo de uso:
 * ```tsx
 * <DelatteButton title="Ingresar" onPress={() => console.log('Login')} />
 * ```
 */

// src/shared/components/ui/DelatteButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../app/theme/theme';

type Props = {
  title: string;
  onPress: () => void;
};

const DelatteButton = ({ title, onPress }: Props) => {
  const theme = useTheme() as CustomTheme;
  // Validación básica del tema
  if (!theme || !theme.fontSizes || !theme.spacing || !theme.borderRadius) {
    console.error('⚠️ El tema no está configurado correctamente:', theme);
    return null; // Evita renderizar el botón si el tema no está listo
  }
  const {
    colors = { primary: '#D72638', text: '#222222' },
    fonts = {
      medium: { fontFamily: 'System', fontWeight: '500' },
    },
    fontSizes = { sm: 12, md: 16, lg: 20 },
    spacing = { sm: 8, md: 16, lg: 24 },
    borderRadius = { sm: 4, md: 8, lg: 12 },
  } = theme;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
          paddingVertical: spacing.md || 16, // Valor predeterminado si falta
          paddingHorizontal: spacing.lg || 24, // Valor predeterminado si falta
          borderRadius: borderRadius.md || 8, // Valor predeterminado si falta
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.medium.fontFamily,
          fontWeight: fonts.medium.fontWeight as any,
          fontSize: fontSizes.md || 16, 
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DelatteButton;
