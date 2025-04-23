// src/shared/components/ui/DelatteButton.tsx

/**
 * Componente de botón reutilizable para acciones primarias.
 *
 * ✅ Estilizado dinámicamente según el tema actual (`lightTheme` o `darkTheme`)
 * usando el `ThemeProvider` de React Navigation.
 *
 * 📌 Props:
 * - `title`: texto visible del botón
 * - `onPress`: función callback al presionar el botón
 * - `disabled`: desactiva el botón (opcional)
 * - `variant`: tipo de botón (por ahora solo `'primary'`, pero es escalable)
 *
 * 🎨 Hereda:
 * - Colores (`colors.primary`, `colors.text`)
 * - Tipografía (`fonts.medium`)
 * - Tamaños (`fontSizes.md`, `spacing`, `borderRadius`)
 *
 * 💡 Ejemplo de uso:
 * ```tsx
 * <DelatteButton title="Ingresar" onPress={...} disabled={loading} />
 * ```
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from 'src/theme/ThemeProvider';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const DelatteButton = ({ title, onPress, disabled = false }: Props) => {
  const { theme } = useThemeContext();

  const {
    colors,
    fonts,
    fontSizes,
    spacing,
    borderRadius,
  } = theme;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#cccccc' : colors.primary,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: borderRadius.md,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.medium.fontFamily,
          fontWeight: fonts.medium.fontWeight as any,
          fontSize: fontSizes.md,
          opacity: disabled ? 0.6 : 1,
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