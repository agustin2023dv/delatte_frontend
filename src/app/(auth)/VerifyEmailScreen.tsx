// src/app/(auth)/VerifyEmail.tsx

/**
 * ✅ Pantalla `VerifyEmailScreen`
 *
 * Se muestra después de hacer clic en el link de verificación enviado por email.
 * Captura los parámetros `status` y `message` desde la URL o navegación interna.
 *
 * - Si `status === 'success'`: muestra mensaje de éxito.
 * - Si `status === 'error'`: muestra mensaje de error.
 *
 * Esta pantalla puede ser accedida desde un link o internamente.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import DelatteButton from '@shared/components/ui/DelatteButton';

const VerifyEmailScreen = () => {
  const { status = 'error', message = 'No se pudo verificar tu correo.' } = useLocalSearchParams();
  const isSuccess = status === 'success';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isSuccess ? styles.success : styles.error]}>
        {isSuccess ? '¡Correo verificado!' : 'Error de verificación'}
      </Text>
      <Text style={styles.message}>{decodeURIComponent(String(message))}</Text>

      <DelatteButton
        title="Ir al inicio de sesión"
        onPress={() => router.push('/login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'crimson',
  },
});

export default VerifyEmailScreen;
