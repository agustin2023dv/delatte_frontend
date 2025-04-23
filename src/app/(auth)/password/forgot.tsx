// src/app/(auth)/password/forgot-password.tsx

/**
 * 📧 Pantalla `ForgotPasswordScreen`
 *
 * Permite al usuario ingresar su correo para recibir un enlace de restablecimiento de contraseña.
 *
 * 🔐 Usa el hook `useForgotPassword` para llamar al backend (POST /users/password-reset-requests)
 * 🔁 Muestra estados de carga, éxito y error
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useForgotPassword } from '@features/auth/hooks/useForgotPassword';
import DelatteButton from '@shared/components/ui/DelatteButton';
import { router } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const {
    sendPasswordResetEmail,
    loading,
    successMessage,
    errorMessage,
  } = useForgotPassword();

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      Alert.alert('Correo inválido', 'Por favor ingresá un correo válido.');
      return;
    }

    await sendPasswordResetEmail(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.subtitle}>
        Ingresá tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <DelatteButton
        title={loading ? 'Enviando...' : 'Enviar correo'}
        onPress={handleSubmit}
        disabled={loading}
      />

      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <DelatteButton
        title="← Volver al login"
        onPress={() => router.back()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ForgotPasswordScreen;
