/**
 * Pantalla de login del usuario.
 *
 * 📌 Funcionalidades:
 * - Autenticación con Google (OAuth)
 * - Soporte para otros métodos de login en el futuro (email, Apple, etc.)
 *
 * 🔧 Actualmente muestra un placeholder mientras se completa la integración.
 */

// src/features/auth/screens/LoginScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DelatteButton from "../../../../shared/components/ui/DelatteButton";
import { useOAuth } from '../../../../shared/hooks/useOAuth';

const LoginScreen = () => {
  const { startAuthentication } = useOAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <DelatteButton title="Continuar con Google" onPress={startAuthentication} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default LoginScreen;
