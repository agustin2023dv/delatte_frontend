// src/app/index.tsx

/**
 * ✅ Pantalla `LandingScreen`
 *
 * Pantalla principal de bienvenida para la app (ruta `/`).
 * Permite iniciar sesión con Google mediante OAuth.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DelatteButton from '@shared/components/ui/DelatteButton';
import { useOAuth } from '@shared/hooks/useOAuth';

const LandingScreen = () => {
  const { startAuthentication } = useOAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Delatte 🍽️</Text>
      <DelatteButton title="Ingresar con Google" onPress={startAuthentication} />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
